const settings = {
  config: {
    ENV: process.env["NODE_ENV"],
    SQL: {
      HOST: process.env["SQL:HOST"],
      PORT: process.env["SQL:PORT"],
      DATABASE: process.env["SQL:DATABASE"],
      USER: process.env["SQL:USER"],
      PASSWORD: process.env["SQL:PASSWORD"],
      CONNECTION_POOL_NAME: process.env["SQL:CONNECTION_POOL_NAME"],
    },
    SENDGRID_API_KEY: process.env["SENDGRID_API_KEY"],
    REDIS: {
      PORT: process.env["REDIS:PORT"],
      HOST: process.env["REDIS:HOST"],
      PASSWORD: process.env["REDIS:PASSWORD"],
    },
    WEBSITE_HOST_URL: "https://www.vidiswift.com",
  },
};

module.exports = settings;
