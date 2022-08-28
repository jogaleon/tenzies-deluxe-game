import { useState, useEffect, memo, useCallback } from "react";
import Modal from "../../../../assets/components/modal"

interface Props {
    setSecretModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecretModal = ({setSecretModalState}: Props) => {
    const [combination, setCombination] = useState<string[]>([]);
    console.log(combination)
 

    const handleCombination = useCallback((e:KeyboardEvent) => {
        setCombination(prevCombination => [...prevCombination, e.key]);
        if (combination.length === 7) {
            let enteredCombination = combination.join('');
            console.log(enteredCombination)
            setCombination([]);
            if (enteredCombination === 'wswsadad') {
                console.log("success")
            }
        }
    },[combination])
    
    useEffect(() => {
        window.addEventListener('keypress', handleCombination);
        return () => {
            window.removeEventListener('keypress', handleCombination);
        }
    })

    return (
        <Modal>
            <div className="SecretModal ModalBody">
                <p>Enter a secret combination with your keyboard. . . </p>
                <div className="ModalButtons">
                    <button onClick={() => setSecretModalState(false)} className="button-small">Close</button>
                </div>
            </div>
        </Modal>
    )
}

export default memo(SecretModal);