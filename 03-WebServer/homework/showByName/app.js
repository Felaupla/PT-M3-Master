var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor
http
  .createServer(function (req, res) {
    console.log(`Llegò un request: ${req.url}`);
    fs.readFile(`./images${req.url}.jpg`, function (err, data) {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain" });
        http.request.end("Img not found");
      } else {
        res.writeHead(200, { "content-type": "image/jpeg" });
        res.end(data);
      }
    });
  })
  .listen(1337, "127.0.0.1");
