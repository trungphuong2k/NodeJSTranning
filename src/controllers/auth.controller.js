import { User, Role } from '../model/index';
import config from '../config/auth.config';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, u) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles },
                },
                (errorFind, roles) => {
                    if (errorFind) {
                        res.status(500).send({ message: errorFind });
                        return;
                    }

                    user.roles = roles.map((role) => role?._id);
                    user.save((errorsave) => {
                        if (errorsave) {
                            res.status(500).send({ message: errorsave });
                            return;
                        }

                        res.send({
                            message: 'User was registered successfully!',
                        });
                    });
                },
            );
        } else {
            Role.findOne({ name: 'user' }, (error, role) => {
                if (error) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role?._id];
                user.save((errors) => {
                    if (errors) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: 'User was registered successfully!' });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .populate('roles', '-__v')
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                res.status(404).send({ message: 'User Not found.' });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password,
            );

            if (!passwordIsValid) {
                res.status(401).send({ message: 'Invalid Password!' });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            const authorities = [];

            for (let i = 0; i < user.roles.length; i + 1) {
                authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
            }

            req.session.token = token;

            res.status(200).send({
                // eslint-disable-next-line no-underscore-dangle
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
            });
        });
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};
