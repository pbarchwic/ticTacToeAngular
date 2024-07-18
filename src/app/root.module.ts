import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RootRoutingModule } from './root-routing.module';

import * as Components from './components/index';
import * as Services from './services/index';

@NgModule({
  declarations: [
    Components.RootComponent,
    Components.LayoutComponent,
    Components.PlayersComponent,
    Components.BoardComponent,
    Components.ResultsComponent,
    Components.SquareComponent,
  ],
  imports: [BrowserModule, RootRoutingModule, FormsModule],
  providers: [Services.PlayersDataService],
  bootstrap: [Components.RootComponent],
})
export class RootModule {}
