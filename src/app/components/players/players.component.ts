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
  playerName = '';
  playersNames: string[] = [];

  ngOnInit() {
    this.setStoragePlayers();
  }

  startGame = (playerOne: string, playerTwo: string): void => {
    this.boardComponent.setPlayersNames([playerOne, playerTwo]);
    this.boardComponent.startGame();
  };

  setStoragePlayers = () => {
    const savedGameData = sessionStorage.getItem('PlayersData');
    if (savedGameData) {
      this.playersNames = Object.keys(JSON.parse(savedGameData));
      this.playerOne = this.playersNames[0];
      this.playerTwo = this.playersNames[1];
    }
  };
}
