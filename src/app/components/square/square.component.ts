import { Component, Input } from '@angular/core';

type Value = 'X' | 'O';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss',
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | undefined;
}
