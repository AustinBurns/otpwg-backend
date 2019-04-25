import dev from './dev.config';
import prod from './prod.config';
import test from './test.config';

const envConfigs = { dev, prod, test };

export default envConfigs[process.env.NODE_ENV || 'dev'];
