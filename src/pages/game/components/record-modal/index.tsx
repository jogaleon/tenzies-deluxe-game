import React, { useState, memo, useContext } from "react";
import { rankTenSuffix } from "../../../../context/utils";

import RecordContext, { RecordContextType } from "../../../../context/RecordContext";
import { Record } from "../../../../context/interface";

import Modal from "../../../../assets/components/modal";
import './style.css';

//Types
interface Props {
    time: number;
    rolls: number;
    setRecordModalState: React.Dispatch<React.SetStateAction<boolean>>
}
//Settings
const MAX_NAME_LENGTH = 20;

const RecordModal = ({time, rolls, setRecordModalState}: Props) => {
    const {recordState, recordDispatch} = useContext(RecordContext) as RecordContextType;
    const [nameInput, setNameInput] = useState<string>('');

    

    //Functions
    const findRecordRank = (time: number, records: Record[]): number => {
        const rank = records.reduce((rank, record) => {
            return (time >= record.time) ? rank + 1 : rank
        }, 1);
        return rank;
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNameInput(e.target.value);
    }

    const handleSaveRecord = (e: React.FormEvent<HTMLFormElement>, name: string, time: number, rolls: number) => {
        e.preventDefault();
        recordDispatch({type: "ADD_RECORD", name: name, time: time, rolls: rolls});
        recordDispatch({type: "SORT_TIME"});
        recordDispatch({type: "TRIM_RECORDS"});
        setRecordModalState(false);
    }

    //Vars
    const recordRank = findRecordRank(time, recordState);
    const RANK_STYLE = {
        color: (() => {
            switch(recordRank) {
                case 1: return 'rgb(206, 175, 0)'
                case 2: return 'rgb(138, 138, 138)'
                case 3: return '#e48e39'
                default: return 'rgba(0, 0, 0, 0.3)'
            }
        })()
    }
  
    return (
        <Modal>
            <div className="RecordModal ModalBody">
                <h2>Your record placed <span style={RANK_STYLE}>{rankTenSuffix(recordRank)}</span>!</h2>
                <form className="record-form" onSubmit={(e) => handleSaveRecord(e, nameInput, time, rolls)}>
                    <input type="text" value={nameInput} onChange={handleNameInput} placeholder="Enter your name..." maxLength={MAX_NAME_LENGTH} autoFocus/><br />
                    <p className="sub-text">If you don't want to type a name in, we'd provide one for you :)</p>
                    <div className="ModalButtons">
                        <button>Save Record</button>
                    </div>
                </form>
            </div>
        </Modal>   
    )
}

export default memo(RecordModal);