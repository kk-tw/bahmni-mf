import { container, Configuration as WebpackConfiguration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import FederatedTypesPlugin from '@module-federation/typescript';
import { ModuleFederationPluginOptions } from '@module-federation/typescript/src/types';
import path from 'path';
import { dependencies } from './package.json';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const isProduction =
    process.argv[process.argv.indexOf('--mode') + 1] === 'production';

const { ModuleFederationPlugin } = container;

const federationConfig: ModuleFederationPluginOptions = {
    name: 'bahmni_mf_consultation',
    filename: 'remoteEntry.js',
    remotes: {
        '@bahmni-mf/components': isProduction
            ? 'bahmni_mf_component_library@http://localhost:3000/components/remoteEntry.js'
            : 'bahmni_mf_component_library@http://localhost:8082/remoteEntry.js',
    },
    exposes: {
        './ConsultationApp': './src/bootstrap',
    },
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
        port: 8081,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: {
            index: 'index.html',
        },
        liveReload: false,
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
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public/locales'),
                    to: path.resolve(__dirname, './dist/locales'),
                },
            ],
        }),
        ...lintPlugins,
    ],
};

export default config;
