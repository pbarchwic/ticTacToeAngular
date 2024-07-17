import { Component, ViewChild } from '@angular/core';
import { PlayersDataService } from '../../services';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent {
  @ViewChild(BoardComponent) boardComponent!: BoardComponent;

  playerOne: string = '';
  playerTwo: string = '';
  playerName: string = '';

  constructor(private playerDataService: PlayersDataService) {}

  playerShuffel = (players: Array<string>): void => {
    players = Math.random() < 0.5 ? players : players.reverse();
    this.playerName = players[0];
    this.playerDataService.savefirstPlayer(players);
  };

  startGame = (playerOne: string, playerTwo: string): void => {
    let players = [playerOne, playerTwo];
    this.playerShuffel(players);
    this.boardComponent.startGame();
  };
}
