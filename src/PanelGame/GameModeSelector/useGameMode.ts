import { useState } from 'react';

interface GameMode {
    value: string;
    label: string;
}

const useGameMode = (initialMode: GameMode['value']) => {
    const [selectedMode, setSelectedMode] = useState<GameMode['value']>(initialMode);

    const handleModeChange = (value: GameMode['value']) => {
        setSelectedMode(value);
    };

    return {
        selectedMode,
        handleModeChange,
    };
};

export default useGameMode;