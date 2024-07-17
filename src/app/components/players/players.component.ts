import { Component } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
})
export class PlayersComponent {
  playerOne: string = '';
  playerTwo: string = '';
  playerName: string = '';

  playerShuffel = (playerOne: string, playerTwo: string): void => {
    this.playerName = Math.random() < 0.5 ? playerOne : playerTwo;
  };
}
