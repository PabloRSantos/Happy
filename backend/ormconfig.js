module.exports = {
  type: 'postgres',
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  entities: [process.env.ENTITIES_DB],
  migrations: [process.env.MIGRATIONS_DB],
  cli: {
    migrationsDir: process.env.MIGRATIONS_DIR_DB
  }
}
