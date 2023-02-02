import { container, Configuration as WebpackConfiguration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import FederatedTypesPlugin from '@module-federation/typescript';
import { ModuleFederationPluginOptions } from '@module-federation/typescript/src/types';
import path from 'path';
import { dependencies } from './package.json';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const isProduction =
    process.argv[process.argv.indexOf('--mode') + 1] === 'production';

const federationConfig: ModuleFederationPluginOptions = {
    name: 'bahmni_mf_host',
    filename: 'remoteEntry.js',
    remotes: {
        '@bahmni-mf/consultation': isProduction
            ? 'bahmni_mf_consultation@http://localhost:3000/consultation/remoteEntry.js'
            : 'bahmni_mf_consultation@http://localhost:8081/remoteEntry.js',
    },
    exposes: {},
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies.react,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
        },
    },
};

const { ModuleFederationPlugin } = container;

const federationPlugin = isProduction
    ? new ModuleFederationPlugin({ ...federationConfig })
    : new FederatedTypesPlugin({
          federationConfig,
      });

const lintPlugins = isProduction
    ? []
    : [
          new ESLintPlugin({
              extensions: ['js', 'jsx', 'ts', 'tsx'],
          }),
          new StyleLintPlugin({
              extensions: ['js', 'jsx', 'ts', 'tsx'],
          }),
      ];

const config: Configuration = {
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    output: {
        filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    },

    devServer: {
        port: 8080,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: {
            index: 'index.html',
        },
    },
    devtool: isProduction ? false : 'eval-cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins: [
        federationPlugin,
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        ...lintPlugins,
    ],
};

export default config;
