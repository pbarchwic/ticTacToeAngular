import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent implements OnInit {
  @ViewChild(BoardComponent) boardComponent!: BoardComponent;

  playerOne = '';
  playerTwo = '';

  ngOnInit() {
    this.setStoragePlayers();
  }

  startGame = (playerOne: string, playerTwo: string): void => {
    this.boardComponent.setPlayersNames([playerOne, playerTwo]);
    this.boardComponent.startGame();
  };

  setStoragePlayers = (): void => {
    const savedGameData = sessionStorage.getItem('PlayersData');
    if (savedGameData) {
      const playersNames = Object.keys(JSON.parse(savedGameData));
      this.playerOne = playersNames[0];
      this.playerTwo = playersNames[1];
    }
  };
}
