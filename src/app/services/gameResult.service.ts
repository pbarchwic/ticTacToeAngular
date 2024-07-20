import { Injectable } from '@angular/core';

@Injectable()
export class GameResultService {
  winner: string | undefined = undefined;
  public setWinner = (winner: string | undefined): void => {
    this.winner = winner;
  };

  public get getWinner(): string | undefined {
    return this.winner;
  }
}
