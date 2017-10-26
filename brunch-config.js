const config = {
  paths: {
    watched: ['app/assets', 'app/styles/', 'app/javascripts/'],
  },
  files: {
    javascripts: {
      joinTo: {
        // ⇓ This line is a mystery. Without it pug throws a runtime exception
        // in the browser, even if not explicitly loaded.
        'vendor.js': /^(?!app)/,
        'app.js': /^app\/javascripts/,
      },
    },
    stylesheets: { joinTo: 'main.css' },
  },
  plugins: {
    babel: {
      presets: ['env'],
    },
  },
  server: {
    port: 3318,
  },
};

module.exports = config;
