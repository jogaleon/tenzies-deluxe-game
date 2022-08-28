import React, { useContext } from "react";
import Modal from "../../../../assets/components/modal"
import RecordContext, { RecordContextType } from "../../../../context/RecordContext";

import './style.css';

interface Props {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClearModal = ({setModalState}: Props) => {
    const {recordDispatch} = useContext(RecordContext) as RecordContextType;

    //Functions
    const handleYes = ():void => {
        recordDispatch({type:"CLEAR_RECORDS"});
        setModalState(false);
    }

    const handleNo = ():void => {
        setModalState(false);
    }

    return (
        <Modal>
            <div className="ClearModal ModalBody">
                <h2>Are you sure you want to clear the current leaderboard?</h2>
                <div className="ModalButtons">
                    <button onClick={handleYes}>Yes</button>
                    <button onClick={handleNo}>No</button>
                </div>
            </div>
        </Modal>
    )
}

export default ClearModal;