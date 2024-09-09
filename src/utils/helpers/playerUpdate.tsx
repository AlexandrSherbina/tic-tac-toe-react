import { Player, PlayersType } from "game-players";

export const updatePlayer = (
  setStateFn: (value: any) => void,
  playerId: "O" | "X",
  updates: Partial<Player>
) => {
  setStateFn((prevPlayers: PlayersType) => ({
    ...prevPlayers,
    [playerId]: {
      ...prevPlayers[playerId],
      ...updates,
    },
  }));
};

export const updateSelectedPlayers = (
  setStateFn: (value: any) => void,
  playerIdsToUpdate: string[],
  updates: Partial<Player>
) => {
  setStateFn((prevPlayers: PlayersType) => {
    return Object.keys(prevPlayers).reduce((newPlayers, playerId) => {
      const shouldUpdate = playerIdsToUpdate.includes(playerId);
      const updatedPlayer = {
        ...prevPlayers[playerId],
        ...updates,
      };
      return {
        ...newPlayers,
        [playerId]: shouldUpdate ? updatedPlayer : { ...prevPlayers[playerId] },
      };
    }, {} as PlayersType);
  });
};
