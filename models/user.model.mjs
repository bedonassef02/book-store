import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['user', 'admin', 'editor', 'manager'],
        required: true,
        default: 'user',
    },
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    try {
        // Only hash the password if it's new or modified
        if (!this.isModified('password')) {
            return next();
        }

        this.password = await bcrypt.hash(this.password, 10);

        return next();
    } catch (err) {
        return next(err);
    }
});
const User = mongoose.model('User', UserSchema);

export {User};