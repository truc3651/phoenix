"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

module.exports = {
  name: Env.get("APP_NAME", "AdonisJs"),

  appKey: Env.getOrFail("APP_KEY"),

  http: {
    allowMethodSpoofing: true,
    trustProxy: false,
    subdomainOffset: 2,
    jsonpCallback: "callback",
    etag: false,
  },

  views: {
    /*
    |--------------------------------------------------------------------------
    | Cache Views
    |--------------------------------------------------------------------------
    |
    | Define whether or not to cache the compiled view. Set it to true in
    | production to optimize view loading time.
    |
    */
    cache: Env.get("CACHE_VIEWS", true),
  },

  static: {
    /*
    |--------------------------------------------------------------------------
    | Dot Files
    |--------------------------------------------------------------------------
    |
    | Define how to treat dot files when trying to serve static resources.
    | By default it is set to ignore, which will pretend that dotfiles
    | do not exist.
    |
    | Can be one of the following
    | ignore, deny, allow
    |
    */
    dotfiles: "ignore",

    /*
    |--------------------------------------------------------------------------
    | ETag
    |--------------------------------------------------------------------------
    |
    | Enable or disable etag generation
    |
    */
    etag: true,

    /*
    |--------------------------------------------------------------------------
    | Extensions
    |--------------------------------------------------------------------------
    |
    | Set file extension fallbacks. When set, if a file is not found, the given
    | extensions will be added to the file name and search for. The first
    | that exists will be served. Example: ['html', 'htm'].
    |
    */
    extensions: false,
  },

  locales: {
    /*
    |--------------------------------------------------------------------------
    | Loader
    |--------------------------------------------------------------------------
    |
    | The loader to be used for fetching and updating locales. Below is the
    | list of available options.
    |
    | file, database
    |
    */
    loader: "file",

    /*
    |--------------------------------------------------------------------------
    | Default Locale
    |--------------------------------------------------------------------------
    |
    | Default locale to be used by Antl provider. You can always switch drivers
    | in runtime or use the official Antl middleware to detect the driver
    | based on HTTP headers/query string.
    |
    */
    locale: "en",
  },

  logger: {
    /*
    |--------------------------------------------------------------------------
    | Transport
    |--------------------------------------------------------------------------
    |
    | Transport to be used for logging messages. You can have multiple
    | transports using same driver.
    |
    | Available drivers are: `file` and `console`.
    |
    */
    transport: "console",

    /*
    |--------------------------------------------------------------------------
    | Console Transport
    |--------------------------------------------------------------------------
    |
    | Using `console` driver for logging. This driver writes to `stdout`
    | and `stderr`
    |
    */
    console: {
      driver: "console",
      name: "adonis-app",
      level: "info",
    },

    /*
    |--------------------------------------------------------------------------
    | File Transport
    |--------------------------------------------------------------------------
    |
    | File transport uses file driver and writes log messages for a given
    | file inside `tmp` directory for your app.
    |
    | For a different directory, set an absolute path for the filename.
    |
    */
    file: {
      driver: "file",
      name: "adonis-app",
      filename: "adonis.log",
      level: "info",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Generic Cookie Options
  |--------------------------------------------------------------------------
  |
  | The following cookie options are generic settings used by AdonisJs to create
  | cookies. However, some parts of the application like `sessions` can have
  | seperate settings for cookies inside `config/session.js`.
  |
  */
  cookie: {
    httpOnly: true,
    sameSite: false,
    path: "/",
    maxAge: 7200,
  },
  appUrl: Env.get("APP_URL", "https://phoenixfive.herokuapp.com"),
  forgotPasswordExpireTime: Env.get("FORGOT_PASSWORD_EXPIRE_TIME", 60 * 2),
};
