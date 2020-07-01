import { Component } from 'react';
import PropTypes from 'prop-types';
import {Chess} from 'chess.js';

//import WithMoveValidation from './WithMoveValidation'

let stringa;

export default class ChessboardComp extends Component {

    constructor(props){
        super(props);
        this.state = {
        fen: this.props.chessboard
        // square styles for active drop squares
       
        }
       /* if(this.props.chessboard == null){
            console.log('waiting timeout')
            setTimeout(this.waitAlert,4000);
        }*/
    }

  //  static propTypes = { children: PropTypes.func };

    componentDidMount() {
       /* if(this.props.chessboard == null){
            console.log('waiting timeout')
            setTimeout(this.waitAlert,4000);
        }*/
        stringa=this.props.position;
        this.game = new Chess(this.props.chessboard);
        console.log('lo stato della chessboard è *******************************');
        console.log(stringa);
        //this.game.load(stringa)
        //fenFunction= () => console.log('it worked');
        //this.game.load(this.props.chessboard);
        //fenFunction=this.game.load;
        this.props.setFenFunction(this.game.load);
        console.log("component mounted!")

    }

    componentDidUpdate() {
        console.log('i am updating!')
        if(this.game.fen() !== this.props.chessboard){
            console.log('i am inside!')
            if(this.props.chessboard != null && this.game.fen() === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'){
                this.game.load(this.props.chessboard);
            }
        }
    }
    
    shouldSelectPiece = () => {
        // do not pick up pieces if the game is over
        // or if it's not that side's turn
        //console.log("sono entrato");
        console.log(this.props.myTurn);
       /* if((this.game.turn() === 'w' && pieceSquare.search(/^b/) !== -1) ||
           (this.game.turn() === 'b' && pieceSquare.search(/^w/) !== -1))
           return false;*/
        if (this.props.myTurn === false) {
            return false;
        }
        else return true;
    };
    // keep clicked square style and remove hint squares

    onMove = ({ to, from }) => {
        // see if the move is legal
       /* console.log('turn as i am dropping');
        console.log(this.game.turn());*/
        let move = this.game.move({
            from: from,
            to: to,
            promotion: 'q' // always promote to a queen for example simplicity
        });
       // console.log(move);

        // illegal move
        if (move === null) return;

        this.setState(() => ({
            fen: this.game.fen(),
           // history: this.game.history({ verbose: true }),
        }));

        let checkmate=false;
        let check=false;
        let draw=false;

        console.log('controllo lo stato della scacchiera')
        console.log(this.game.fen());

        if(this.game.in_checkmate()===true){
            checkmate=true;
            console.log('checkmate!!!!!');
        }

        if(this.game.in_check()===true){
            check=true;
            //this.game.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3')
            console.log('in checkkooooo!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        
        if(this.game.in_draw()===true){
            draw=true;
            console.log('draw game!!!!!');
        }    
        
        if (checkmate)
            this.props.setGameState('You Win');
        if (draw)
            this.props.setGameState('Draw');
        this.props.moveEvent(move, this.game.fen(),checkmate, check, draw);
    };
    

    render() {
        const { fen } = this.state;

        return this.props.children({
            position: fen,
            fen:fen,
            shouldSelectPiece: this.shouldSelectPiece,
            onMove: this.onMove,
        });
    }
}