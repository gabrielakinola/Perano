import Otp from "../models/otp.model.js";

const generateOtp = async (userId, otpType) => {
  // Clear existing otps associated with user
  await Otp.deleteMany({ user: userId, otpType });
  // Proceed to generate and store new otp
  const min = 100000;
  const max = 999999;
  const otp = Math.floor(Math.random() * (max - min + 1) + min).toString();
  const currentDate = new Date(Date.now());
  //   Add five minutes to the currentDate's time
  currentDate.setMinutes(currentDate.getMinutes() + 5);
  // Save the new timestamp in an expiresIn variable
  const expiresIn = currentDate.getTime();

  try {
    const newOtp = await Otp.create({
      user: userId,
      otp: otp,
      expiresIn: expiresIn,
      otpType: otpType,
    });

    return otp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { generateOtp };
