// const asynchandler = () => { };

// basic function
// const asynchandler = () => { };

// pass a function as perameter
// const asynchandler = (f) => { };

// call another function within the function
// const asynchandler = (f) => { () => { } };

// simplify the above, aka
// const asynchandler = (f) => () => { };

// make the function async
// const asynchandler = (f) => async () => { };

/*
/// Usefull in case of try catch

const asynchandler = (fn) => async (error, req, res, next) => {
    try {
        await fn(error, req, res, next);
    } catch (e) {
        res.status(e.code || 500).json({
            success: true,
            message: e.message
        });
    }
};
*/

/// Usefull in case of promise

const asynchandler = (requestHandler) =>
    (error, req, res, next) => {
        Promise.resolve(
            requestHandler(error, req, res, next)
        ).catch((e) => next(e));
    };

export { asynchandler };