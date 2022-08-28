export const formatTimer = (ms: number): string => {
    let seconds = ms / 1000;
    // console.log(seconds)
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    let secondsStr = seconds.toFixed(1);

    if (secondsStr.indexOf('.') === -1) secondsStr += '.0';
    if (seconds < 10) {
        return `${minutes}:0${secondsStr}`;
    }
    return `${minutes}:${secondsStr}`;
}

//Only for ranks 0-10
export const rankTenSuffix = (rank: number): string => {
    if (rank > 10) throw new Error("rankTenSuffix can only accept numbers 0-10");
    if (rank === 1) return `${rank}st`;
    if (rank === 2) return `${rank}nd`;
    if (rank === 3) return `${rank}rd`;
    return `${rank}th`;
}

const DATE_SETTINGS: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
}

export const getStringDate = (): string => {
    return new Date().toLocaleString('en-US', DATE_SETTINGS)
}

export const debounce = (fn: Function, delay: number) => {
    let timerId: NodeJS.Timer | null = null;
    return (...args: any[]) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}

export const NAME_ARRAY = [
    `Josh "TheAnime" Bazinger`, `Grant GiggUK`, `Sebastian`,
    `Garand`, `Karabiner`, `Enfield`, `Arisaka`,
    `Peep the Horror`, `The Sus Guy`, `Chef Tony from Prison`, `Otto`,
    `warpatato`, `tater`, `potat`, `warpotato`,
    `[REDACTED]`,`GIGACHAD`, `monkaS`, `BOOBA`, `AUUUUGGH`,
    `Yui`, `Ritsu`, `Mio`, `Mugi`, `Azusa`, `Ui`, `Jun`, `Sawako`,
    `King of All Cosmos`, `Prince of All Cosmos`, `Miso`, 
    `Marcy`, `Ichigo`, `Nik`, `Ban-ban`, `Marny`, 

]

export const drawRandomName = (nameArray: string[]): string => {
    const index = Math.floor(Math.random() * nameArray.length);
    return nameArray[index];
}
