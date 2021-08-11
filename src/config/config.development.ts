export default {
  port: 7005,
  // typeorm config
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'username',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'database',
    synchronize: false,
    logging: ['error'],
    // logging: true,
  },
};
