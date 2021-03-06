const ErrorResponse = require('../../utils/errorResponse');

const User = require('../../models/User');

register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  sendTokenResponse(user, 200, res);
};

login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorResponse('Please provide an email and password', 400));
  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new ErrorResponse(`Invalid credentials`, 401));
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse(`Invalid credentials`, 401));
  sendTokenResponse(user, 200, res);
};

logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
};

getLoggedInUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

// Get token from model, create cookie and send respose
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') options.secure = true;
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
