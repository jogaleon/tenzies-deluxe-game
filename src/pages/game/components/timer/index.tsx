import { memo } from 'react';
import { formatTimer } from '../../../../context/utils';

interface Props {
    timerState: number
}

const Timer = ({timerState}: Props) => {
    const formattedTime = formatTimer(timerState);

    return (
        <div className="Timer">
            <p className="metrics-label">Time:</p>
            <p className="metrics-main">{formattedTime}</p>
        </div>
    )
}

export default memo(Timer);