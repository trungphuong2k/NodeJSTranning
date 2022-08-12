import mongoose from '../config/mongoose';

const Role = mongoose.model(
    'Role',
    new mongoose.Schema({
        name: String,
        description: String,
        createdAt: Date,
        updatedAt: Date,
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    }),
);
module.exports = Role;
