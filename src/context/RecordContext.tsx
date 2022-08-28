import {createContext, useEffect, useReducer} from 'react';
import { ContextProviderProps, Record } from './interface';
import { getStringDate, NAME_ARRAY, drawRandomName } from './utils';
import { v4 as uuidV4 } from 'uuid';
// import { recordTest1 } from './testData';

//Types
export type RecordActionType =
    {type: "ADD_RECORD"; name: string; rolls: number; time: number} |
    {type: "SORT_TIME" | "TRIM_RECORDS" | "CLEAR_RECORDS"}
;

export interface RecordContextType {
    recordState: Record[]; 
    recordDispatch: React.Dispatch<RecordActionType>;
}

//Settings
export const MAX_RECORDS = 10;

//Functions

const addRecord = (state: Record[], name: string, rolls: number, time: number): Record[] => {
    const currentName = (!(name.trim() === '')) ? name : drawRandomName(NAME_ARRAY);
    const newRecord: Record = {
        id: uuidV4(),
        name: currentName,
        rolls: rolls,
        time: time,
        dateCreated: getStringDate()
    }
    return [...state, newRecord]
}

const sortRecordsByTime = (state: Record[]): Record[] => {
    const records = [...state];
    return records.sort((a, b) => a.time - b.time);
}

const trimRecords = (state: Record[]): Record[] => {
    if (state.length > MAX_RECORDS) return state.slice(0, MAX_RECORDS);
    return state;
}

const recordReducer = (state: Record[], action: RecordActionType) => {
    switch (action.type) {
        case "ADD_RECORD": return addRecord(state, action.name, action.rolls, action.time);
        case "SORT_TIME": return sortRecordsByTime(state);
        case "TRIM_RECORDS": return trimRecords(state);
        case "CLEAR_RECORDS": return [];
        default: throw new Error("Invalid Action");
    }
}


const getRecords = (): Record[] => {
    const records = localStorage.getItem('TENZIES_RECORDS');
    if (records === null) return [];
    return JSON.parse(records);
}

//Vars
const initialState: Record[] = getRecords();

const RecordContext = createContext<RecordContextType | null>(null);

export const RecordContextProivder = ({children}: ContextProviderProps) => {
    const [recordState, recordDispatch] = useReducer(recordReducer, initialState);
    // console.log(recordState)

    useEffect(() => {
        localStorage.setItem('TENZIES_RECORDS', JSON.stringify(recordState))
    }, [recordState])

    return (
        <RecordContext.Provider value={{recordState, recordDispatch}}>{children}</RecordContext.Provider>
    )    
}

export default RecordContext;