import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(3006, { cors: true })
export class ChatGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server;
	constructor() {}

	afterInit(server: any): any {
		console.log('Init...................................');
	}

	async handleConnection(client: any) {
		console.log('Connected..............................');
	}

	async handleDisconnect(client: any) {
		console.log('Disconnect.............................');
	}

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: any): void {
		let ret: string = message.data;
		console.log('message: ' + ret);
		this.server.emit('message', { data: ret });
	}
}
