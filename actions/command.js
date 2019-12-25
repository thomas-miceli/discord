class Command {
	
	static command (command, message) {
		if (message.content.toLowerCase().startsWith(command.toLowerCase())) {

			let args = message.content.split(' ');
			args.shift()
			
			this.action(message, args);
			
			return true;
		}
		return false;
	}
}

module.exports = Command;
