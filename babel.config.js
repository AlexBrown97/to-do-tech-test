module.exports = (api) => {
  api.cache.forever();
  // const isProd = api.cache(() => process.env.NODE_ENV === "production");

  return {
    presets: [
      // https://babeljs.io/docs/en/babel-preset-env
      ["@babel/preset-env", { targets: { node: "current" } }],
      // https://babeljs.io/docs/en/babel-preset-react
      ["@babel/preset-react", { runtime: "automatic" }],
      // https://babeljs.io/docs/en/babel-preset-typescript
      "@babel/preset-typescript",
    ],
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    plugins: ["@babel/plugin-transform-runtime"],
  };
};
