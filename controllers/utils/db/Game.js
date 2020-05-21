

class Game {
    constructor(game) {
        this.game_uuid = game.game_uuid;
        this.white = game.white;
        this.black = game.black;
        this.turn = game.turn;
        this.chessboard = game.chessboard;
    }


    hasPlayer(username) {
        return (username == this.white)  || (username == this.black);
    }
}


module.exports = Game;