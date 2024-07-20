import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameData, SymbolType, PlayerName } from '../../models';
import { GameResultService } from '../../services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  readonly gameDataStorageName = 'PlayersData';
  readonly finishGamePath = '/results';
  readonly resultTimeout = 3000;
  readonly cross: SymbolType = 'X';
  readonly circle: SymbolType = 'O';

  oIsNext = true;
  newGame = true;
  counter = 0;

  square: SymbolType[] = [];
  winner: PlayerName = '';
  playersNames: string[] = [];
  firstSymbol: SymbolType = undefined;
  secondSymbol: SymbolType = undefined;
  gameData: GameData = {};

  constructor(
    private router: Router,
    private gameResultservice: GameResultService
  ) {}

  ngOnInit(): void {
    this.loadPlayersData();
  }

  public startGame = (): void => {
    this.square = Array(9).fill(null);
    this.winner = '';
    this.counter = 0;
    this.newGame = false;
    this.oIsNext = true;
  };

  public setPlayersNames = (names: string[]): void => {
    this.playersNames = names;
    this.playerShuffel();
    this.gameData = {
      [this.playersNames[0]]: {
        symbol: this.firstSymbol as SymbolType,
        moves: [],
      },
      [this.playersNames[1]]: {
        symbol: this.secondSymbol as SymbolType,
        moves: [],
      },
    };
    this.savePlayersData();
  };

  private playerShuffel = (): void => {
    [this.firstSymbol, this.secondSymbol] =
      Math.random() < 0.5
        ? [this.cross, this.circle]
        : [this.circle, this.cross];
  };

  private get getPlayer(): SymbolType {
    return this.oIsNext ? this.circle : this.cross;
  }

  public get getPlayerName(): PlayerName {
    return this.playersNames.find(
      (playerName) => this.gameData[playerName].symbol === this.getPlayer
    );
  }

  public makeMove = (index: number): void => {
    if (!this.square[index]) {
      this.updatesMoves(index);
      this.square[index] = this.getPlayer;
      this.oIsNext = !this.oIsNext;
      this.counter++;
    }

    this.checkAndFinish();
  };

  private findWinner = (): PlayerName => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        this.square[a] &&
        this.square[a] === this.square[b] &&
        this.square[a] === this.square[c]
      ) {
        return this.playersNames.find(
          (playerName) => this.gameData[playerName].symbol === this.square[a]
        );
      }
    }
    return;
  };

  private checkAndFinish = (): void => {
    this.winner = this.findWinner();

    if (this.winner || this.counter === 9) {
      this.gameResultservice.setWinner(this.winner);
      this.endGame();
    }
  };

  private endGame = (): void => {
    setTimeout(() => {
      this.router.navigate([this.finishGamePath]);
      sessionStorage.clear();
    }, this.resultTimeout);
  };

  private savePlayersData = (): void => {
    sessionStorage.setItem(
      this.gameDataStorageName,
      JSON.stringify(this.gameData)
    );
  };

  private updatesMoves = (move: number): void => {
    const playerName = this.getPlayerName;

    if (playerName !== undefined) {
      this.gameData[playerName].moves.push(move);
    }
    this.savePlayersData();
  };

  private loadPlayersData = (): void => {
    const savedGameData = sessionStorage.getItem(this.gameDataStorageName);
    if (savedGameData) {
      this.newGame = false;
      this.gameData = JSON.parse(savedGameData);
      this.playersNames = Object.keys(this.gameData);
      this.square = Array(9).fill(null);

      for (const player in this.gameData) {
        this.gameData[player].moves.forEach((move: number) => {
          this.square[move] = this.gameData[player].symbol;
        });
      }

      this.counter =
        this.gameData[this.playersNames[0]].moves.length +
        this.gameData[this.playersNames[1]].moves.length;

      this.oIsNext = this.counter % 2 === 0;
      // this.getPlayerName;

      this.checkAndFinish();
    }
  };
}
