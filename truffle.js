module.exports = {
  build: {
    "index.html": "index.html",
    "create-mountain.html": "create-mountain.html",
    "mountain.html": "mountain.html",
    "deposit.html": "deposit.html",
    "pay-back.html": "pay-back.html",
    "borrow.html": "borrow.html",
    "withdraw.html": "withdraw.html",
    "invite.html": "invite.html",
    "join.html": "join.html",
    "app.js": [
      "javascripts/jquery.min.js",
      "javascripts/common.js",
      "javascripts/index.js",
      "javascripts/mountainDetail.js",
    ],
    "static/css/app.css": [
      "static/css/app.css",
      "static/css/grids.css",
      "static/css/font-awesome.min.css"
    ],
    "static/images/": "static/images/",
    "static/fonts/": "static/fonts/"
  },
  deploy: [
    "MountainFactory",
    "Mountain"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
