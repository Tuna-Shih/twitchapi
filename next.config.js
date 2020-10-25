/* eslint-disable arrow-parens */

const withLess = require('@zeit/next-less');
const emptyFunction = require('fbjs/lib/emptyFunction');

// const isProd = process.env.NODE_ENV === 'production';

// $FlowFixMe Fix server side rendering with less
if (typeof require !== 'undefined') require.extensions['.less'] = emptyFunction;

module.exports = withLess({
  // assetPrefix: isProd ? './' : '',
  cssModules: true,
  lessLoaderOptions: {
    modifyVars: {},
    javascriptEnabled: true,
  },
  dir: 'src',
  webpack: config => {
    const rule =
      config.module.rules.find(({ test }) => test && test.test('.less')) ||
      (() => {
        throw new Error('can not find `less` rule');
      })();
    const cssLoader =
      rule.use.find(({ loader }) => /css-loader/.test(loader)) ||
      (() => {
        throw new Error('can not find `css` loader');
      })();
    const lessLoader =
      rule.use.find(({ loader }) => /less-loader/.test(loader)) ||
      (() => {
        throw new Error('can not find `less` loader');
      })();

    config.module.rules = [
      ...config.module.rules.filter(moduleRule => moduleRule !== rule),
      {
        ...rule,
        exclude: /node_modules/,
        use: [
          ...rule.use.filter(
            ruleLoader => ruleLoader !== cssLoader && ruleLoader !== lessLoader,
          ),
          {
            ...cssLoader,
            options: {
              ...cssLoader.options,
              modules: true,
            },
          },
          lessLoader,
        ],
      },
      {
        ...rule,
        include: /node_modules/,
        use: [
          ...rule.use.filter(
            ruleLoader => ruleLoader !== cssLoader && ruleLoader !== lessLoader,
          ),
          {
            ...cssLoader,
            options: {
              ...cssLoader.options,
              modules: false,
            },
          },
          lessLoader,
        ],
      },
    ];

    return config;
  },
});
