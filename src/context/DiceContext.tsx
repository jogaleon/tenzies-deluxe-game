import { createContext, useReducer } from 'react';
import { ContextProviderProps } from './interface';
import { Die, Dice } from './interface';
import { v4 as uuidV4 } from 'uuid';

//Types/Interfaces

export type DiceActionType = 
    {type: "ROLL_DICE" | "NEW_DICE" } |
    {type: "HOLD_DIE"; payload: string}
;

export interface DiceContextType {
    diceState: Dice;
    diceDispatch: React.Dispatch<DiceActionType>;
}
//Functions

const generateDieFace = (): number => {
    return Math.floor(Math.random() * 6 + 1);
}

const generateNewDice = (): Dice => {
    return [...Array(10)].map(die => ({
        id: uuidV4(),
        value: generateDieFace(),
        isHeld: false 
    }))
}

const rollDice = (dice: Dice): Dice => {
    return dice.map(die => {
        return die.isHeld ? die : {
            ...die,
            value: generateDieFace()
        }
    })
}

const holdDie = (dice: Dice, id: string): Dice => {
    return dice.map(die => {
        return die.id !== id ? die : {
            ...die,
            isHeld: !die.isHeld
        }
    })
}

const diceReducer = (state: Dice, action: DiceActionType) => {
    switch(action.type) {
        case "ROLL_DICE": return rollDice(state) 
        case "NEW_DICE": return generateNewDice() 
        case "HOLD_DIE": return holdDie(state, action.payload)
        default: throw new Error("Invalid Action");

    }  
}

//Vars
const initialState = generateNewDice();
const testState: Dice = [...Array(10)].map(die => ({
    id: uuidV4(),
    value: 1,
    isHeld: false 
}))
const DiceContext = createContext<DiceContextType | null>(null);

export const DiceContextProvider = ({children}: ContextProviderProps) => {
    const [diceState, diceDispatch] = useReducer(diceReducer, initialState);
    return (
        <DiceContext.Provider value={{diceState, diceDispatch}}>{children}</DiceContext.Provider>
    )
}

export default DiceContext;