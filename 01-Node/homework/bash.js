const commands = require("./commands");

// Output un prompt
process.stdout.write("prompt > ");
// // El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", (data) => {
  var [cmd, ...rest] = data.toString().trim().split(" "); // remueve la nueva línea
  console.log(cmd);
  console.log(rest);
  // if (commands.hasOwnProperty(cmd)) commands[cmd]();
  // else commands.dflt(cmd)

  commands.hasOwnProperty(cmd) ? commands[cmd](rest) : commands.dflt(cmd);
});
