

// types/my-library.d.ts
declare module 'game-mode' {
  export interface GameMode {
    value: string;
    label: string;
    disabled?: boolean;
  }
}