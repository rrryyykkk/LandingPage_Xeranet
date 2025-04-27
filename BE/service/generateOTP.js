export const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

export const expiredOTP = () => new Date().getTime() + 5 * 60 * 1000;
