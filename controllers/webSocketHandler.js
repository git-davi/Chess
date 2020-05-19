
module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('joinGameRoom', (data) => joinGameRoom(socket, data));
        socket.on('move', (data) => move(socket, data));
    });
}

// join al canale della partita
function joinGameRoom(socket, data) {
    console.log(data);
    /*
    data = {
        gameuuid, token
    }
    */

    /*
    data = deve contenere auth token e game_uuid
    se auth token è valido e la partita è di quell'utente allora può joinare 
    */


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

    // invio la mossa agli altri giocatori
    socket.broadcast.emit(data.game_uuid, data.chessboard);
}