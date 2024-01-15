import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
            trim: true,
        },
        coverImage: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            trim: true,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    });


/// t a middleware to encript password
userSchema.pre('save', async function (next) {
    /// if password is untouched, simply exit the function
    if (!this.isModified('password')) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
});


/// Compare the encripted value with user input
userSchema.methods.isPasswordCorrect = async function (pasword) {
    return await bcrypt.compare(pasword, this.password);
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFESH_TOKEN_EXPIRY
        });
}


export const user = mongoose.model("User", userSchema);
