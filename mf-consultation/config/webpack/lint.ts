import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import ENV_VALUES from './env';

const lintPlugins =
    ENV_VALUES.LINT_ON_COMPILE && ENV_VALUES.LINT_ON_COMPILE === 'true'
        ? [
              new ESLintPlugin({
                  extensions: ['js', 'jsx', 'ts', 'tsx'],
              }),
              new StyleLintPlugin({
                  extensions: ['js', 'jsx', 'ts', 'tsx'],
              }),
          ]
        : [];

export default lintPlugins;
