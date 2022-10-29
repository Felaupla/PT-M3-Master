const request = require("request");

const curl = (rest) => {
  request(rest[0], (err, res, body) => {
    if (err) throw err;
    process.stdout.write(body);
    process.stdout.writable("\nprompt >");
  });
};
module.exports = curl;
