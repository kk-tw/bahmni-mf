import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import ENV_VALUES from './env';

const webpackDevServerSettings: WebpackDevServerConfiguration = {
    port: ENV_VALUES.port || 9001,
    static: {
        directory: path.join(__dirname, '../../dist'),
    },
    historyApiFallback: {
        index: 'index.html',
    },
    liveReload: false,
    proxy: {
        '/openmrs': {
            router: () => ENV_VALUES.OPENMRS_URL,
            secure: false,
        },
    },
};

export default webpackDevServerSettings;
