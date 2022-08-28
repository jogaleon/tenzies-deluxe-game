import { Link } from "react-router-dom";

import './style.css';

const Tutorial = () => {
    return (
        <div className="Tutorial">
            <div className="tutorial main">
                <h2>How to Play Tenzies</h2>
                <p>You are given a set of 10 dice.</p>
                <hr />
                <p>To win the game, roll these dice until all of them are on the same number.</p>
                <hr />
                <p>Left click on a die to hold/unhold it. It won't get rolled when held.</p>
                <hr />
            </div>
            <div className="tutorial shortcuts">
                <h3>Keyboard Shortcuts</h3>
                <p>
                    <span>
                        <span className="bold">Spacebar</span> for roll
                    </span>
                    <span>
                        <span className="bold">N</span> for a new game
                    </span>
                </p>
                
            </div>
            <div className="controls">
                <Link to="/play"><button>Play</button></Link>
                <Link to="/"><button>Main Menu</button></Link>
            </div>
        </div>
    )
}

export default Tutorial;