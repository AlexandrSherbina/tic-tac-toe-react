import { useState } from 'react';
const HUMAN_VS_AI = "human-ai";
const HUMAN_VS_HUMAN = "human-human";

type values = typeof HUMAN_VS_HUMAN | typeof HUMAN_VS_AI;
interface GameMode {
    value: values;
    label: string;
}

const useGameMode = () => {
    const [selectedMode, setSelectedMode] = useState<GameMode['value']>(HUMAN_VS_HUMAN);

    const handleModeChange = (value: GameMode['value']) => {
        setSelectedMode(value);
    };

    return {
        selectedMode,
        handleModeChange,
    };
};

export default useGameMode;