const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgresql"); 

  const connections = {
    postgresql: { 
      connection: {
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "strapi"),
        username: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        schema: env("DATABASE_SCHEMA", "public"),
        ssl: env.bool("DATABASE_SSL", false) && {
          rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true),
        },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, "..", env("DATABASE_FILENAME", ".tmp/data.db")),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
