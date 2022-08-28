import { createContext, useReducer } from "react";
import { ContextProviderProps } from "./interface";

//Types
export type TimerActionType =
    {type: "ADD_TIMER"; payload: number} |
    {type: "RESET_TIMER"}
;

export type runTimerActionType =
    {type: "START_TIMER" | "STOP_TIMER"}
;

export interface TimerContextType {    
    timerState: number;
    timerDispatch: React.Dispatch<TimerActionType>;
    runTimerState: boolean;
    runTimerDispatch: React.Dispatch<runTimerActionType>;
}

//Settings
export const TIMER_INTERVAL = 100;

//Functions
const timerReducer = (state: number, action: TimerActionType) => {
    switch(action.type) {
        case "ADD_TIMER": return state + action.payload;
        case "RESET_TIMER": return 0;
        default: throw new Error("Invalid Action");
    }
}

const runTimerReducer = (state: boolean, action: runTimerActionType) => {
    switch(action.type) {
        case "START_TIMER": return true;
        case "STOP_TIMER": return false;
        default: throw new Error("Invalid Action");
    }
}
//Vars
const initialState: number = 0;

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerContextProivder = ({children}: ContextProviderProps) => {
    const [timerState, timerDispatch] = useReducer(timerReducer, initialState);
    const [runTimerState, runTimerDispatch] = useReducer(runTimerReducer, true);
    // console.log(timerState)
    
    return (
        <TimerContext.Provider value={{timerState, timerDispatch, runTimerState, runTimerDispatch}}>{children}</TimerContext.Provider>
    )    
}

export default TimerContext;