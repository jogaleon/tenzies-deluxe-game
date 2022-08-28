import React from "react";

//Global
export interface ContextProviderProps {
    children: React.ReactNode;
}

//Dice Context
export type Die = {
    id: string;
    value: number;
    isHeld: boolean;
}
export type Dice = Die[];

//Game Context
export type GameStateType = {
    rolls: number;
    tenzies: boolean;
}

//Timer Context

//Record Context
export type Record = {
    id: string;
    name: string;
    rolls: number;
    time: number;
    dateCreated: string;
}

