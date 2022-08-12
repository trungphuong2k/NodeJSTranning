import mongoose from '../config/mongoose';

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: String,
        age: Number,
        email: String,
        password: String,
        address: String,
        updatedAt: Date,
        createdAt: Date,

        permision: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Permission',
            },
        ],
        role: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
    }),
);
module.exports = User;
