import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
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
    federationPlugin,
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
        async: false,
    }),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, '../../public/locales'),
                to: path.resolve(__dirname, '../../dist/bahmni/i18n'),
            },
        ],
    }),
    ...lintPlugins,
    ...cleanPlugin,
];

export default webpackPlugins;
