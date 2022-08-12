import { model } from 'mongoose';
import { User, Role } from '../model/index';

const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

export const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (error, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i + 1) {
                    if (roles[i].name === 'admin') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require Admin Role!' });
            },
        );
    });
};

export const isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (error, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i + 1) {
                    if (roles[i].name === 'moderator') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require Moderator Role!' });
            },
        );
    });
};

const authJwt = {
    isAdmin,
    isModerator,
};
module.exports = authJwt;
