const sendUserResponse = async (user, message, statusCode, res) => {
    // Create token
    const token = await user.generateAuthToken();
    const { _id, full_name, mobile, email } = user;
    res.status(statusCode).json({
      status: 'success',
      message,
      data: { _id, full_name, email, mobile, token},
    });
  };
  
  module.exports = sendUserResponse;
  
