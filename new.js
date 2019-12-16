#!/usr/bin/env node
const fs = require('fs');

const [, , ...args] = process.argv;

if (args[0] === undefined || !isNaN(args[0].charAt(0))) {
    console.log('\x1b[31m%s\x1b[0m', '  -> Wrong argument');
    process.exit();
}

if (fs.existsSync(`./actions/command_${args[0]}.js`)) {
    console.log('\x1b[31m%s\x1b[0m', '  -> Command already existing');
    process.exit();
}

let lines = fs.readFileSync('index.js').toString().split("\n");

lines.forEach((line, index, array) => {
    if (line === '/* Actions */') {
        array.splice(index + 1, 0, `const ${args[0]} = require('./actions/command_${args[0].toLowerCase()}');`);
    }

    if (line.startsWith('Client.on(\'message')) {
        array.splice(index + 1, 0, `    ${args[0]}.command(PREFIX + '${args[0]}', message);`);
    }
});

fs.writeFileSync('index.js', lines.join("\n"));

let fileContent = `const Command = require('./command');
const Discord = require('discord.js');
    
class ${args[0]} extends Command {
    
    static async action (message, args) {
        message.channel.send('${args[0]}');		
    }
}

module.exports = ${args[0]}
`

fs.writeFileSync(`actions/command_${args[0].toLowerCase()}.js`, fileContent);

console.log('\x1b[36m%s\x1b[0m', '  -> Modified : index.js');
console.log('\x1b[36m%s\x1b[0m', `  -> Added  : actions/command_${args[0]}.js`);
