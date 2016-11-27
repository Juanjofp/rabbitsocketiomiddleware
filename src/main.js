// Get actions from server and inject it in the store
import Server from 'rabbitsocketioclient';

function createRabbitSocketIOMiddleware(config = {}) {
    return ({ dispatch, getState }) => {
        // Configure Server to get actions
        // and dispatch to store
        var sendActionToServer = Server({
            protocol: config.protocol || 'ws',
            server: config.host || window.location.hostname,
            port: config.port || 8001,
            onData: dispatch,
            onError: (err) => console.error('Socket.io Error:', err)
        });
        return (next) => {
            return (action) => {
                if (typeof action === 'function') {
                    return action(dispatch, getState, sendActionToServer);
                }
                return next(action);
            };
        };
    };
}

export default createRabbitSocketIOMiddleware;
