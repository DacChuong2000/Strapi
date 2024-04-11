module.exports = ({ env }) => ({
  host: env("HOST", "webdemo"),
  port: env.int("PORT", 3000), // Sử dụng cổng 3000 thay vì 1337

  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },

  // Thêm hook send để xử lý phản hồi trước khi nó được gửi đi
  hooks: {
    async send(ctx) {
      // Kiểm tra nếu phản hồi là JSON
      if (ctx.response.is("application/json")) {
        // Loại bỏ trường "meta" từ phản hồi
        delete ctx.response.body.meta;
      }
    },
  },
});
