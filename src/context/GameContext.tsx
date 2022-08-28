import { createContext, useReducer } from "react";
import { ContextProviderProps } from "./interface";
import { GameStateType } from "./interface";


//Types
export type GameActionType =
    {type: "ADD_ROLL" | "END_GAME" | "RESET_GAME"}
;

export interface GameContextType {    
    gameState: GameStateType;
    gameDispatch: React.Dispatch<GameActionType>;
}

//Vars
const initialState: GameStateType = {
    rolls: 0,
    tenzies: false
}

//Functions
const addRoll = (state: GameStateType): GameStateType => {
    return {
        ...state,
        rolls: state.rolls + 1
    }
}

const endGame = (state: GameStateType): GameStateType => {
    return {
        ...state,
        tenzies: true    
    }
}

const resetGame = (): GameStateType => {
    return {
        rolls: 0,
        tenzies: false,
    }
}

const gameReducer = (state: GameStateType, action: GameActionType) => {
    switch (action.type) {
        case "ADD_ROLL": return addRoll(state)
        case "END_GAME": return endGame(state)
        case "RESET_GAME": return resetGame()
        default: throw new Error("Invalid Action");
    }
}

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProivder = ({children}: ContextProviderProps) => {
    const [gameState, gameDispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{gameState, gameDispatch}}>{children}</GameContext.Provider>
    )    
}

export default GameContext;