
// Called WebRTC recieves a message from peer
// Not a great idea but simply dispatches message along
export const recieveMessage = ({ dispatch }, { message, peer_id }) => {
	dispatch(message.type, { message, peer_id });
}

export const sendMessage = ({ state }, { message, peer_id }) => {
	if(peer_id) {
		state.peers[peer_id].data.send(JSON.stringify(message));
	} else {
		for(let peer_id in state.peers) {
			state.peers[peer_id].data.send(JSON.stringify(message));
		}
	}
}


export const updatePosition = ({ commit, dispatch }, point) => {
	dispatch('sendMessage', { message: { type: 'recievePosition', ...point } } );

	commit('setPosition', {point});
}

export const recievePosition = ({ commit }, { message, peer_id }) => {
	commit('setPosition', {point: message, peer_id});
}


export const updateDirection = ({ commit, dispatch }, angle) => {
	dispatch('sendMessage', { message: { type: 'recieveDirection', angle }});
	commit('setDirection', {angle});
}

export const recieveDirection = ({ commit }, { message, peer_id }) => {
	commit('setDirection', {angle: message.angle, peer_id});
}


export const updatePointer = ({ commit, dispatch }, pointer) => {
	dispatch('sendMessage', { message: { type: 'recievePointer', pointer }});
	commit('setPointer', { pointer });
}

export const recievePointer = ({ commit }, {message, peer_id }) => {
	commit('setPointer', { pointer: message.pointer, peer_id });
}