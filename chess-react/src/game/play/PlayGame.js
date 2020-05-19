import React from 'react';
//import {WithMoveValidation} from 'chessboardjsx'
import WithMoveValidation from './WithMoveValidation'



export default function PlayGame() {

    // after every move check the request , if 
    // not my game (unauthorized) then redirect to home

    return (
        <div className="container">
          <WithMoveValidation />
        </div>
    );
}
