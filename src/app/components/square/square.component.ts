import { Component, Input } from '@angular/core';
import { SymbolType } from '../../models';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss',
})
export class SquareComponent {
  @Input() value: SymbolType;
}
