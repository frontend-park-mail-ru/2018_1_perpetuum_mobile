import {bus} from './bus.js'
import {SERVER_EVENTS} from './game/serverEvents.js';


class Ws {
	constructor() {
		if (Ws.__instance) {
			return Ws.__instance;
		}

		const address = `${window.location.protocol.replace('http', 'ws')}//${Ws.host}/ws`;
		this.ws = new WebSocket(address);
		this.ws.onopen = (event) => {
			console.log(`WebSocket on address ${address} opened`);
			console.dir(this.ws);

			this.ws.onmessage = this.handleMessage.bind(this);

			this.ws.onclose = () => {
				console.log(`WebSocket closed`);
			};
		};

		Ws.__instance = this;
	}

	handleMessage(event) {
		const messageText = event.data;

		try {
			const message = JSON.parse(messageText);
            bus.emit("serverMsg", message);
		} catch (err) {
			console.error('smth went wront in handleMessage: ', err);
		}
	}

	send(type, payload) {
		this.ws.send(JSON.stringify({type, payload}));
	}
}

Ws.host = window.location.host;

const ws_singleton = new Ws();

export {ws_singleton as ws};
