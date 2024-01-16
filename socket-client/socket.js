const socket = io('http://localhost:3006');

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
	socket.emit('message', { data: message.value });
};

const handleNewMessage = (message) => {
	messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	return li;
};

const turnOn = () => {
	socket.on('message', ({ data }) => {
		handleNewMessage(data);
	});
};

const turnOff = () => {
	socket.off('message');
};

const disconnect = () => {
	socket.close();
};
