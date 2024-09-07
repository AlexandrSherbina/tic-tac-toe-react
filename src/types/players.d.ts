
declare module 'game-players' {
    export interface Player {
        index: number,
        playerLetter: string;
        human: boolean;
        ai: boolean;
        scores: number;
        isWinner?: boolean;
        isLoser?: boolean;
        playerMoves: Array<number>;
    }

    export interface PlayersType {
        [key: string]: Player;
    }
}