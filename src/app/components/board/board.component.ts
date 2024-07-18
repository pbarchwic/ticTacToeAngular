import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface GameData {
  players: { [key: string]: number[] };
  symbols: { [key: string]: string };
  winner: string;
  draw: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  square: Array<any> = []; /// zmienic typ
  oIsNext: boolean = true;
  champion: string = '';
  counter = 0;
  gameDraw = '';
  newPage = true;
  playersNames: Array<string> = [];
  gameData: GameData = { players: {}, symbols: {}, winner: '', draw: false };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadPlayersData();
  }

  startGame() {
    this.square = Array(9).fill(null);
    this.champion = '';
    this.gameDraw = '';
    this.counter = 0;
    this.newPage = false;
  }

  setPlayersNames = (names: Array<string>) => {
    this.playersNames = names;
    this.playerShuffel(this.playersNames);
    this.gameData = {
      players: {
        [this.playersNames[0]]: [],
        [this.playersNames[1]]: [],
      },
      symbols: {
        [this.playersNames[0]]: 'O',
        [this.playersNames[1]]: 'X',
      },
      winner: '',
      draw: false,
    };
    // this.playerShuffel(this.playersNames);
    this.savePlayersData();
  };

  playerShuffel = (players: Array<string>): void => {
    this.playersNames = Math.random() < 0.5 ? players : players.reverse();
  };

  get getPlayerName() {
    return this.oIsNext ? this.playersNames[0] : this.playersNames[1];
  }

  get getPlayer() {
    return this.oIsNext ? 'O' : 'X';
  }

  makeMove(index: number) {
    if (!this.square[index]) {
      this.updatesMoves(index);
      this.square[index] = this.getPlayer;
      this.oIsNext = !this.oIsNext;
      this.counter++;
    }

    this.champion = this.findChampion();
    console.log(this.champion);

    if (!this.champion && this.counter == 9) {
      setTimeout(() => {
        this.router.navigate(['/results']);
      }, 1000);
      this.gameDraw = 'Draw';
    }
  }

  findChampion() {
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
        return this.square[a];
      }
    }

    return null;
  }

  setResult = () => {};

  savePlayersData = (): void => {
    sessionStorage.setItem('PlayersData', JSON.stringify(this.gameData));
  };

  updatesMoves = (move: number) => {
    this.gameData[this.getPlayerName].push(move);
    this.savePlayersData();
  };

  loadPlayersData = () => {
    const savedGameData = sessionStorage.getItem('PlayersData');
    if (savedGameData) {
      this.gameData = JSON.parse(savedGameData);

      // Przywróć imiona graczy
      this.playersNames = Object.keys(this.gameData);

      // Przywróć stan gry
      this.square = Array(9).fill(null);
      for (const player in this.gameData) {
        this.gameData[player].forEach((move: number) => {
          this.square[move] = player === this.playersNames[0] ? 'O' : 'X';
        });
      }

      // Przywróć licznik ruchów
      this.counter =
        this.gameData[this.playersNames[0]].length +
        this.gameData[this.playersNames[1]].length;

      // Sprawdź, kto jest następny
      this.oIsNext = this.counter % 2 === 0;
      this.getPlayerName;

      // Sprawdź, czy jest zwycięzca
      this.champion = this.findChampion();
    }
  };
}
