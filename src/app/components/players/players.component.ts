import { Component } from '@angular/core';
import { PlayersDataService } from '../../services';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent {
  playerOne: string = '';
  playerTwo: string = '';
  playerName: string = '';

  constructor(private playerDataService: PlayersDataService) {}

  playerShuffel = (playerOne: string, playerTwo: string): void => {
    let players = [playerOne, playerTwo];

    players = Math.random() < 0.5 ? players : players.reverse();
    this.playerName = players[0];
    this.playerDataService.savefirstPlayer(players);
  };
}
