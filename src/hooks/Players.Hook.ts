import { PlayersType } from "game-players";
import { useState } from "react";


const usePlayers = (initialPlayers: PlayersType) => {
    const [players, setPlayers] = useState<PlayersType>(initialPlayers);
    return {
        players,
        setPlayers,
    }
}

export default usePlayers;