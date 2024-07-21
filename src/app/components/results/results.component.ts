import { Component, OnInit } from '@angular/core';
import { GameResultService } from '../../services';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  winner: string | undefined = undefined;
  constructor(private gameResultService: GameResultService) {}

  ngOnInit(): void {
    this.result;
  }

  get result(): string | undefined {
    const winner = this.gameResultService.getWinner;
    if (winner) return (this.winner = winner);
    return;
  }
}
