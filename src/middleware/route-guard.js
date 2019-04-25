import { User } from '../api/models';
import { verifyToken } from '../utils';

export const routeGuard = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id, '-password', { lean: true });

    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err);

    return res.status(401).send({ message: 'Unauthorized' });
  }
};
