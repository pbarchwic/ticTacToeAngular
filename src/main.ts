import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RootModule } from './app/root.module';

platformBrowserDynamic()
  .bootstrapModule(RootModule)
  .catch((err) => console.error(err));
