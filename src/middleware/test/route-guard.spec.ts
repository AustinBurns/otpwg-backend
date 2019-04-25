import { routeGuard } from '../route-guard';
import * as utils from '../../utils';
import { User } from '../../api/models';

jest.mock('../../utils');
jest.mock('../../api/models');

describe('routeGuard', () => {
  const mockResponse = () => {
    const res = {};

    res['status'] = jest.fn().mockReturnValue(res);
    res['send'] = jest.fn().mockReturnValue(res);

    return res;
  };
  const res = mockResponse();
  const mockRequest = authorization => {
    return {
      headers: { authorization },
      user: null,
    };
  };
  const req = mockRequest(null);
  const next = jest.fn().mockReturnValue(req);

  test('should return 401 with missing authorization header', async () => {
    const result = await routeGuard(req, res, next);

    expect(result.status).toBeCalledWith(401);
    expect(result.status().send).toBeCalledWith({ message: 'Unauthorized' });
  });

  test('should return 401 with missing token in authorization header', async () => {
    const req = mockRequest('Bearer ');
    const result = await routeGuard(req, res, next);

    expect(result.status).toBeCalledWith(401);
    expect(result.status().send).toBeCalledWith({ message: 'Unauthorized' });
  });

  test('should return 401 when user id from token doesnt find a user', async () => {
    const req = mockRequest('Bearer test');

    jest.spyOn(utils, 'verifyToken').mockResolvedValue({ id: 'test' });
    jest.spyOn(User, 'findById').mockReturnValue(null);

    const result = await routeGuard(req, res, next);

    expect(result.status).toBeCalledWith(401);
    expect(result.status().send).toBeCalledWith({ message: 'Unauthorized' });
  });

  test('should return 401 when payload doesnt have `id`', async () => {
    const req = mockRequest('Bearer test');

    jest.spyOn(utils, 'verifyToken').mockResolvedValue(null);

    const result = await routeGuard(req, res, next);

    expect(result.status).toBeCalledWith(401);
    expect(result.status().send).toBeCalledWith({ message: 'Unauthorized' });
  });

  test('should set user on the request and call the next middleware on success', async () => {
    const req = mockRequest('Bearer test');
    const mockUser = { test: 'test' };

    jest.spyOn(utils, 'verifyToken').mockResolvedValue({});
    User.findById = jest.fn().mockReturnValue(mockUser);

    await routeGuard(req, res, next);

    expect(req.user).toBe(mockUser);
    expect(next).toHaveBeenCalled();
  });
});
