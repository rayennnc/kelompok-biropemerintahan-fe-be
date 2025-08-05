export default ({ env }) => ({
  host: env('HOST', '10.10.11.214'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
