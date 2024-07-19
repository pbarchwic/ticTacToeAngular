import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameData, SymbolType } from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  readonly gameDataStorageName = 'PlayersData';
  readonly finishGamePath = '/results';
  readonly resultTimeout = 3000;
  readonly cross: string = 'X';
  readonly circle: string = 'O';

  square: SymbolType[] = [];
  oIsNext = true;
  champion: string | undefined = '';
  counter = 0;
  gameDraw = '';
  newGame = true;
  playersNames: string[] = [];
  firstSymbol = '';
  secondSymbol = '';
  gameData: GameData = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPlayersData();
  }

  startGame = () => {
    this.square = Array(9).fill(null);
    this.champion = '';
    this.gameDraw = '';
    this.counter = 0;
    this.newGame = false;
  };

  setPlayersNames = (names: Array<string>): void => {
    this.playersNames = names;
    this.playerShuffel();
    this.gameData = {
      [this.playersNames[0]]: { symbol: this.firstSymbol, moves: [] },
      [this.playersNames[1]]: { symbol: this.secondSymbol, moves: [] },
    };
    this.savePlayersData();
  };

  playerShuffel = (): void => {
    [this.firstSymbol, this.secondSymbol] =
      Math.random() < 0.5
        ? [this.cross, this.circle]
        : [this.circle, this.cross];
  };

  get getPlayer(): string | undefined {
    return this.oIsNext ? this.circle : this.cross;
  }

  get getPlayerName(): string | undefined {
    return this.playersNames.find((playerName) => {
      if (this.gameData[playerName].symbol === this.getPlayer) {
        return playerName;
      }
      return;
    });
  }

  makeMove = (index: number) => {
    if (!this.square[index]) {
      this.updatesMoves(index);
      this.square[index] = this.getPlayer;
      this.oIsNext = !this.oIsNext;
      this.counter++;
    }

    this.champion = this.findChampion();

    if (this.champion || this.counter === 9) {
      this.finishGame();
    }
  };

  findChampion = () => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.square[a] &&
        this.square[a] === this.square[b] &&
        this.square[a] === this.square[c]
      ) {
        if (this.getPlayerName !== undefined) {
          return this.playersNames.find(
            (playerName) => this.gameData[playerName].symbol === this.square[a]
          );
        }
      }
    }
    return;
  };

  finishGame = (): boolean => {
    this.champion
      ? console.log(`Champion: ${this.champion}`)
      : console.log('Game Draw');

    setTimeout(() => {
      this.router.navigate([this.finishGamePath]);
      sessionStorage.clear();
    }, this.resultTimeout);

    return true;
  };

  savePlayersData = (): void => {
    sessionStorage.setItem(
      this.gameDataStorageName,
      JSON.stringify(this.gameData)
    );
  };

  updatesMoves = (move: number) => {
    const playerName = this.getPlayerName;

    if (playerName !== undefined) {
      this.gameData[playerName].moves.push(move);
    }
    this.savePlayersData();
  };

  loadPlayersData = () => {
    const savedGameData = sessionStorage.getItem(this.gameDataStorageName);
    if (savedGameData) {
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
      this.getPlayerName;
      // this.champion = this.findChampion();
      this.newGame = false;
    }
  };
}
