
module.exports = class extends require('/platform/service'){

	constructor(...args){
		super(...args)
		this.name = 'socket1'

		let proto = location.protocol === 'https:'?'wss:':'ws:'
		let sock = this.socket = new WebSocket(proto+'//'+location.host)

		sock.onopen = function(){
		}.bind(this)

		sock.onerror = function(){

		}.bind(this)

		sock.onclose = function(){

		}.bind(this)

		sock.onmessage = function(event){
			this.postMessage({
				data:event.data
			})
		}.bind(this)
	}

	user_postMessage(msg){
		this.socket.send(msg.data)
	}
}
