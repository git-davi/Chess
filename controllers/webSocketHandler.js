const tokenHandler = require('./tokenHandler');
const gamesList = require('./utils/game/GamesList');


module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('joinGameRoom', (data) => joinGameRoom(socket, data));
        socket.on('move', (data) => move(socket, data));
    });
}

// join al canale della partita
function joinGameRoom(socket, data) {
    //console.log(data);
    
    const { gameuuid, token } = data;

    let decoded = tokenHandler.validateAndDecodeToken(token);
    if (decoded === null)
        return;
    
    if (!gamesList.getGame(game_uuid).hasPlayer(decoded.username))
        return;

    // add client to room
    socket.join(data.game_uuid);
}


// no need to check the auth, if is joined it is authenticated
function move(socket, data) {
    /*
    data = {
        gameuuid, chessboard
    }
    */

    // update db state chessboard
    gamesList.setGameState(data.game_uuid, data.chessboard);

    // invio la mossa agli altri giocatori
    socket.broadcast.emit(data.game_uuid, data.chessboard);
}