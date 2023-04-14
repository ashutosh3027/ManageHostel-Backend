const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Building = require("./buildingModal");
const College = require("./collegeModals");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name!']
        },
        email: {
            type: String,
            require: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, 'Please provide a valid email.']
        },
        photo: String,
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student'
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false
        },
        passwordChangedAt: Date,
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on Create and Save!!
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Password are not same!'
            }
        },
        isRoomAlloted: {
            type: Boolean,
            default: false
        },
        RoomNumber: {
            type: String,
            required: [function () { return this.isRoomAlloted; }, 'Please provide room number'],
        },
        roomAllotedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        collegeId: {
            type: mongoose.Schema.ObjectId,
            ref: 'College',
            // required: [true, 'Request must belong to a college']
        },
        buildingId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Building'
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

userSchema.pre('save', async function (next) {
    // only run if password was actually modified
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12); // this is a async function
    // Delet passwordConfrim field
    this.passwordConfirm = undefined;
    next();
})

userSchema.pre('save', function (next) {
    // if(!this.isModified('password')) return next();
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
})
// Virtual populate.
userSchema.virtual('requests', {
    ref: 'Request',
    foreignField: 'user',
    localField: '_id'
});
// this will populate
userSchema.pre(/^find/, function (next) {
    this.populate({ path: 'requests' });
    next();
})
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}


userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return changedTimestamp > JWTTimestamp;
    }
    // false means password is not changed.
    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User', userSchema);
module.exports = User;
