import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import federationPlugin from './federation';
import lintPlugins from './lint';
import { isProduction } from './env';

const cleanPlugin = isProduction
    ? [
          new CleanWebpackPlugin({
              cleanOnceBeforeBuildPatterns: ['**/*', '!@mf-types/**'],
          }),
      ]
    : [];

const webpackPlugins = [
    ...cleanPlugin,
    federationPlugin,
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
        async: false,
    }),
    ...lintPlugins,
];

export default webpackPlugins;
