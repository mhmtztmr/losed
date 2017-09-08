const config = {
  secret: 'ilovescotchyscotch',
  mongoURL: process.env.MONGO_URL || 'mongodb://shipper:shipper123@ds139470.mlab.com:39470/shiptr',
  port: process.env.PORT || 8000,
  jwtSecret: 'a secret phrase!!', // TODO: put a real secret
};

export default config;
