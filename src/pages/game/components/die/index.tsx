import React, { useContext, memo } from 'react';
import { Die } from '../../../../context/interface';
import { DiceActionType } from '../../../../context/DiceContext';
import GameContext, { GameContextType } from '../../../../context/GameContext';

interface Props {
    die: Die
    dispatch: React.Dispatch<DiceActionType>
}

const DieItem = ({die, dispatch}: Props) => {
    const {gameState} = useContext(GameContext) as GameContextType;
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (gameState.tenzies) return;
        dispatch({type:"HOLD_DIE", payload: die.id})
    }
    
    const STYLE = {
        backgroundColor: die.isHeld ? "#a6ff96" : "white"
    }

    return (
        <div style={STYLE} onClick={handleClick} className="DieItem">
            <h2>{die.value}</h2>
        </div>
    )
}

export default memo(DieItem);