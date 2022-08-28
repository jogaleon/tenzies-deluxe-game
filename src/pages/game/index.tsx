import React, { useContext, useEffect, useCallback, memo, useState } from "react";
import { debounce } from "../../context/utils";
import { Link } from "react-router-dom";


import GameContext, { GameContextType } from "../../context/GameContext";
import DiceContext, { DiceContextType } from "../../context/DiceContext";
import TimerContext, { TimerContextType, TIMER_INTERVAL } from "../../context/TimerContext";
import RecordContext, { RecordContextType, MAX_RECORDS } from "../../context/RecordContext";
import { Record } from "../../context/interface";

import Timer from "./components/timer";
import DieItem from "./components/die";
import RecordModal from "./components/record-modal";

import './style.css';
import Rolls from "./components/rolls";
import Confetti from "../../assets/components/confetti";
import SecretModal from "./components/secret-modal";

const Game = () => {
    const {diceState, diceDispatch} = useContext(DiceContext) as DiceContextType;
    const {gameState, gameDispatch} = useContext(GameContext) as GameContextType;
    const {timerState, timerDispatch, runTimerState, runTimerDispatch} = useContext(TimerContext) as TimerContextType;
    const {recordState} = useContext(RecordContext) as RecordContextType;

    const [recordModalState, setRecordModalState] = useState<boolean>(false);
    const [secretModalState, setSecretModalState] = useState<boolean>(false);
   
    // console.log(gameState.tenzies)
    // console.log(runTimerState)

    //Functions
    const newGame = useCallback((): void => {
        gameDispatch({type: "RESET_GAME"});       
        timerDispatch({type: "RESET_TIMER"});
        diceDispatch({type: "NEW_DICE"});
        runTimerDispatch({type: "START_TIMER"});
    },[gameDispatch, timerDispatch, diceDispatch, runTimerDispatch])

    const handleRoll = useCallback((): void => {
        if (gameState.tenzies) return;
        gameDispatch({type:"ADD_ROLL"})
        diceDispatch({type: "ROLL_DICE"})
    },[diceDispatch, gameDispatch, gameState.tenzies])
    
    const handleNewGame = (): void => {
        newGame();
    }

    const isValidRecord = useCallback((currentTime: number, records: Record[]): boolean => {
        const length = records.length;
        if (length < MAX_RECORDS) return true;
        if (records[length - 1].time > currentTime) return true;
        return false;
    },[])

    //Shortcuts
    useEffect(() => {
        const handleShortcut = (e:KeyboardEvent): void => {
            if (e.code === "Space") handleRoll();
            if (e.code === "KeyN") newGame();
            if (e.code === "KeyP") setSecretModalState(true)
        }

        if (!recordModalState && !secretModalState) {
            window.addEventListener('keypress', handleShortcut);
        }
        return () => {
            window.removeEventListener('keypress', handleShortcut);
        }
    },[recordModalState, secretModalState, gameState.tenzies, handleRoll, newGame]);

    //Win condition
    useEffect(() => {
        const dieValue = diceState[0].value;
        const isAllSame = diceState.every(die => die.value === dieValue);
        const isAllHeld = diceState.every(die => die.isHeld === true);
        if (isAllSame && isAllHeld) {
            gameDispatch({type: "END_GAME"});
            if (isValidRecord(timerState, recordState)) setRecordModalState(true);
        };
    }, [diceState, gameDispatch, isValidRecord])


    //Timer Interval
    useEffect(() => {
        let timerId: NodeJS.Timer | null = null;
        if (runTimerState) {
            timerId = setInterval(() => {
                timerDispatch({type: "ADD_TIMER", payload: TIMER_INTERVAL})
            }, TIMER_INTERVAL)
        }
        
        if (!runTimerState && timerId) {
            clearInterval(timerId)
        }
        return () => {
            if (timerId) clearInterval(timerId)
        }
    },[timerDispatch, runTimerState])

    //Timer start/stop
    useEffect(() => {
        if(!gameState.tenzies) {
            runTimerDispatch({type:"START_TIMER"})
        } else {
            runTimerDispatch({type:"STOP_TIMER"})
        }
    },[gameState.tenzies, runTimerDispatch]);

    //Elements
    const diceElements = diceState.map(die => 
        <DieItem 
            key={die.id}
            die={die}
            dispatch={diceDispatch}
        />
    )

    return (
        <div className="Game">
            {secretModalState &&
                <SecretModal 
                    setSecretModalState={setSecretModalState}
                />

            }
            {recordModalState && 
                <RecordModal 
                    time={timerState} 
                    rolls={gameState.rolls} 
                    setRecordModalState={setRecordModalState} 
                />
            }
            {gameState.tenzies && <Confetti />}

            <div className="metrics">
                <Rolls rolls={gameState.rolls} />
                <Timer timerState={timerState} />
            </div>

            <div className="dice">
                {diceElements}
            </div> 
                <button onClick={gameState.tenzies ? handleNewGame : handleRoll} className="button-large">{gameState.tenzies ? 'New Game' : 'Roll'}</button>
                {/* {
                    <button 
                    onClick={() => {
                        gameDispatch({type: "END_GAME"})
                        if (isValidRecord(timerState, recordState)) setRecordModalState(true);
                    }}
                    >End Game</button>
                } */}
            <div className="controls">
                <Link to="/"><button onClick={handleNewGame} className="button-small">Main Menu</button></Link>
                <Link to="/leaderboards"><button onClick={handleNewGame} className="button-small">Leaderboards</button></Link>
            </div>
        </div>
    )
}

export default memo(Game);