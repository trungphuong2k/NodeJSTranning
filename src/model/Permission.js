import mongoose from '../config/mongoose';

const Permission = mongoose.model(
    'Permision',
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
module.exports = Permission;
