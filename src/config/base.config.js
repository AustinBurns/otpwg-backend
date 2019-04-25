const env = process.env.NODE_ENV || 'dev';

const baseConfig = {
  env,
  isDev: env === 'dev',
  isTest: env === 'test',
  port: 8080,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '1d',
  },
  apiVersion: 'v1',
};

export default baseConfig;
