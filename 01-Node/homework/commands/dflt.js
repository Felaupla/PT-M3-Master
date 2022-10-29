const dflt = (cmd) => {
  process.stdout.write('"${cmd}" not found');
  process.stdout.write("\nprompt > ");
};
module.exports = dflt;
