import jwt from 'jsonwebtoken';

import config from '../config';

export const newToken = user => {
  return jwt.sign({ id: user._id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) {
        reject(err);
      }

      resolve(payload);
    });
  });
