import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style.css';
//Settings
const HUE_INTERVAL = 50;
const HUE_INCREMENT = 10;

const MainMenu = () => {
    const [hue, setHue] = useState(0);
    const [hueDirection, setHueDirection] = useState(true);

    const TITLE_STYLE = {
        color: `hsl(${hue}, 40%, 50%)`
    }

    const handleHue = (increment: number): void => {
        if (hue <= 0) setHueDirection(true);
        if (hue >= 360) setHueDirection(false);
        hueDirection ? setHue(prevHue => prevHue + increment) : setHue(prevHue => prevHue - increment);
    }

    useEffect(() => {
        let timerId: NodeJS.Timer | null = null;
        if (timerId) clearInterval(timerId);
        timerId = setInterval(() => handleHue(HUE_INCREMENT), HUE_INTERVAL);
        return () => {
            if (timerId) clearInterval(timerId)
        }
    })
    return (
        <div className="MainMenu">
            <h1 style={TITLE_STYLE} className="title">Tenzies Deluxe</h1>
            <div className="menu">
                <Link to="/play"><button className="button-large">Play</button></Link>
                <Link to="/tutorial"><button>How to play</button></Link>    
                <Link to="/leaderboards"><button>Leaderboards</button></Link>
            </div>
        </div>
    )
}

export default MainMenu;