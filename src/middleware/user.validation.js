import {
    responseWithError, ErrorCodes, RegexEmail, RegexPhoneNumber,
} from '../helpers';

export function validCreateUser(req, res, next) {
    const {
        email, password, displayName, phoneNumber,
    } = req.body;
    if (!email || !password || !displayName || !phoneNumber) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid argument'));
    }
    if (!RegexEmail.test(email)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid email'));
    }
    if (!RegexPhoneNumber.test(phoneNumber)) {
        return res.status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .json(responseWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, 'Invalid phone number'));
    }
    return next();
}
