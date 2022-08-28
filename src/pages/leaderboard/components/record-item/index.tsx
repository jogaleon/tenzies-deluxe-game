import { Record } from '../../../../context/interface';
import { formatTimer } from '../../../../context/utils';
import { rankTenSuffix } from '../../../../context/utils';
import medalFirst from '../../../../assets/images/icons/medal-first.png';
import medalSecond from '../../../../assets/images/icons/medal-second.png';
import medalThird from '../../../../assets/images/icons/medal-third.png';

interface Props {
    rank: number;
    record: Record;
}

const RecordItem = ({rank, record}: Props) => {
    const getMedalElement = (rank: number) => {
        if (rank > 3) return <div className="medal placeholder"></div>

        const medal = (() => {
            switch(rank) {
                case 1: return medalFirst;
                case 2: return medalSecond;
                case 3: return medalThird;
                default: return '';
            }
        })()
        return <img className="medal" src={medal} alt={`medal${rank}`} />
    }

    const medalElement = getMedalElement(rank)

    return (
        <div className="RecordItem">
            <div className="content">
                <span className="rank">{rankTenSuffix(rank)}</span>
                <div className="name">
                    {medalElement} 
                    <span>{record.name}</span>
                </div>
                <span className="rolls">{record.rolls}</span>
                <span className="time">{formatTimer(record.time)}</span>
            </div>
            <hr />
        </div>
    )
}

export default RecordItem;