
declare module 'game-players' {
    interface Player {
        index: number,
        human: boolean;
        ai: boolean;
        scores: number;
        playerMoves: Array<number>;
    }

    export interface PlayersType {
        [key: string]: Player;
    }
}