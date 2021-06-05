"use strict";

const providers = [
  "@adonisjs/framework/providers/AppProvider",
  "@adonisjs/framework/providers/ViewProvider",
  "@adonisjs/lucid/providers/LucidProvider",
  "@adonisjs/bodyparser/providers/BodyParserProvider",
  "@adonisjs/cors/providers/CorsProvider",
  "@adonisjs/shield/providers/ShieldProvider",
  "@adonisjs/session/providers/SessionProvider",
  "@adonisjs/auth/providers/AuthProvider",
  "lucid-mongo/providers/LucidMongoProvider",
  "@adonisjs/validator/providers/ValidatorProvider",
  "@adonisjs/mail/providers/MailProvider",
];

const aceProviders = [
  "@adonisjs/lucid/providers/MigrationsProvider",
  "lucid-mongo/providers/MigrationsProvider",
];

const aliases = {};

const commands = [];

module.exports = { providers, aceProviders, aliases, commands };
