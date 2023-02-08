const webpackModuleRules = [
    {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
            fullySpecified: false,
        },
    },
    {
        test: /\.(css|s[ac]ss)$/i,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: {
                            'postcss-prefix-selector': {
                                prefix: '.bahmni-scoped',
                                exclude: [':root', 'html', 'body'],
                            },
                        },
                    },
                },
            },
        ],
    },
    {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
        },
    },
]

export default webpackModuleRules;
