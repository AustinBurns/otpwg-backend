import { newToken } from '../../utils';
import { Controller } from './base.controller';

export class AuthController extends Controller {
  constructor(model) {
    super(model);

    this.login = this.login.bind(this);
    this._findUser = this._findUser.bind(this);
  }

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Check that the user exists
    const user = await this._findUser(req, res);

    // If the user exists, check that the password is correct. If correct,
    // return JWT to the user
    this._authenticate(req, res, user);
  }

  async _findUser(req, res) {
    try {
      const user = await this.model.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
      }

      return user;
    } catch (err) {
      console.error(err);

      return res.status(500).json({ message: 'Server Error' });
    }
  }

  async _authenticate(req, res, user) {
    try {
      if (await user.checkPassword(req.body.password)) {
        return res.status(200).send({ token: newToken(user) });
      }

      return res.status(401).send({ message: 'User Unauthorized' });
    } catch (err) {
      console.error(err);

      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
