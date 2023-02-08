import Dotenv from 'dotenv';
import path from 'path';

export const env = process.argv[process.argv.indexOf('--mode') + 1];
export const isProduction = env === 'production';

const dotenv = Dotenv.config({
    path: path.join(__dirname, `../../.env.${env}`),
});

const ENV_VALUES = { ...dotenv.parsed, ...process.env } || {};

export default ENV_VALUES;
