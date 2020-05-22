const tokenHandler = require('./tokenHandler');
const dbop = require('./utils/db/operations');


module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('joinGameRoom', (data) => joinGameRoom(socket, data));
        socket.on('move', (data) => move(socket, data));
    });
}

// join al canale della partita
async function joinGameRoom(socket, data) {
    //console.log(data);
    
    const { game_uuid, token } = data;

    let decoded = tokenHandler.validateAndDecodeToken(token);
    if (decoded === null)
        return;
    
    let game = await dbop.getGame(game_uuid);
    if (game !== undefined && !game.hasPlayer(decoded.username))
        return;

    // add client to room
    socket.join(data.game_uuid);
}


// no need to check the auth, if is joined it is authenticated
function move(socket, data) {
    /*
    data = {
        gameuuid,
        chessboard,
        move,
        turn
    }
    */

    // update db state chessboard
    dbop.setGameState(data.game_uuid, data.turn, data.chessboard);

    // invio la mossa agli altri giocatori
    socket.broadcast.emit(data.game_uuid, {
        chessboard: data.chessboard,
        move: data.move
    });
}