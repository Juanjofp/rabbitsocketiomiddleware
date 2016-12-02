// Get actions from server and inject it in the store
import Server from 'rabbitsocketioclient';

var throwAwayErrors = (err) => {console.log('Error Socket.io: ', err);};

function createRabbitSocketIOMiddleware(config = {}) {
    return ({ dispatch, getState }) => {
        // Configure Server to get actions
        // and dispatch to store
        var sendActionToServer = Server({
            protocol: config.protocol || 'ws',
            server: config.host || 'localhost',
            port: config.port || 8001,
            onData: dispatch,
            onError: config.onError || throwAwayErrors
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
