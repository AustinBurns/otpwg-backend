import config from './base.config';

const dev = {
  ...config,
  secrets: { ...config.secrets, jwt: process.env.JWT_DEV_SECRET },
};

export default dev;
