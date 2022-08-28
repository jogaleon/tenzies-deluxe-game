import { memo } from 'react';

interface Props {
    rolls: number;
}

const Rolls = ({rolls}: Props) => {
    return (
        <div className="Rolls">
            <p className="metrics-label">Rolls:</p>
            <p className="metrics-main">{rolls}</p>
        </div>
    )
}

export default memo(Rolls);