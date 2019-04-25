import config from './base.config';

const test = {
  ...config,
  secrets: { ...config.secrets, jwt: process.env.JWT_TEST_SECRET },
};

export default test;
