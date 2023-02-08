import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import webpackDevServerSettings from './config/webpack/server';
import { isProduction } from './config/webpack/env';
import webpackPlugins from './config/webpack/plugins';
import webpackModuleRules from './config/webpack/rules';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: webpackDevServerSettings,
    devtool: isProduction ? false : 'eval-cheap-module-source-map',
    module: {
        rules: webpackModuleRules,
    },

    plugins: webpackPlugins,
};

export default config;
