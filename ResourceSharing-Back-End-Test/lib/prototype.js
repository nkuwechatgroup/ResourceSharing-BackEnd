const error_string = {
    0: 'ok',
    1: 'common error',
    233: 'captcha required',
    234: 'captcha not match',
    400: 'bad request',
    401: 'auth required',
    403: 'access denied',
    404: 'not found',
    422: 'unprocessable entity',
    429: 'too many requests',
    500: 'internal server error',
    501: 'not implemented',
    520: 'database query error'
};

const ends = (res, status, code, message, assign) => {
    const ret = {code: code};
    ret.message = message || (assign ? assign.message : undefined) || error_string[code] || 'unknown error';
    res.status(status).jsonp({...ret, ...assign});
};

const setResponsePrototype = (req, res, next) => {
    res.fatal = (code, error, message) => {
        'use strict';
        ends(res, code, code, message, {error: error});
        return res
    };

    res.fail = (code, error, message) => {
        'use strict';
        ends(res, 200, code, message, {error: error});
        return res
    };

    res.ok = (data, override = {}) => {
        const ret = {data: data};
        ends(res, 200, 0, undefined, {...ret, ...override});
        return res
    };

    res.sessionFail = (code, error, message) => {
        'use strict';
        ends(res, code, code, message, {error: "need login"});
        return res;
    }

    next()
};

module.exports = {
    setResponsePrototype: setResponsePrototype
};
