import { useEffect, useState, memo } from "react";
import { debounce } from '../../../context/utils';

import ReactConfetti from "react-confetti";
type DimensionType = {
    width: number;
    height: number;
}
const Confetti = () => {
    const [windowDimension, setWindowDimension] = useState<DimensionType>({width: window.innerWidth, height: window.innerHeight});
    const updateSize = () => {
        setWindowDimension({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(() => {
        window.addEventListener('resize', debounce(updateSize, 400))
        return () => {
            window.removeEventListener('resize', updateSize)
        }
    },[])

    return (
        <ReactConfetti
            width={windowDimension.width}
            height={windowDimension.height} 
        />
    )
}

export default memo(Confetti);