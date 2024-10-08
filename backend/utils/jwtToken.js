// Create Token and Saving in cookie

const { options } = require("../app");
const sendToken = (user, statusCode, res) =>{
    const token = user.getJWTToken();

    // option for cookie
    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports = sendToken;