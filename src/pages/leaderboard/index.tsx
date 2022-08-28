import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import RecordContext, { RecordContextType } from "../../context/RecordContext";
import ClearModal from "./components/clear-modal";
import RecordItem from "./components/record-item";

import './style.css';

const Leaderboard = () => {
    const {recordState} = useContext(RecordContext) as RecordContextType;
    const [modalState, setModalState] = useState(false);
    

    //Functions

    //Elements
    const recordElements = recordState.map((record, index) => 
        <RecordItem 
        key={record.id} 
            rank={index + 1}
            record={record}
        />
    )

    return (
        <div className="Leaderboard">
            {modalState && <ClearModal setModalState={setModalState} />}

            <h2>Leaderboards</h2>
            <div className="records-header">
                <span className="rank">Rank</span>
                <span className="name">Name</span>
                <span className="rolls">Rolls</span>
                <span className="time">Time</span>
            </div>
            <div className="records">
                {recordElements}            
            </div>
            <div className="controls">
                <span>
                    <Link to="/"><button>Main Menu</button></Link>
                    <Link to="/play"><button>Play</button></Link>
                </span>
                <button onClick={() => setModalState(true)} className="button-small">Clear Leaderboard</button>
            </div>
        </div>
    )
}

export default Leaderboard;