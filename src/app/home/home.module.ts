import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ConvertDataPipePipe } from '../pipe/convert-data-pipe.pipe';
import { InfotempFormatDataPipe } from '../pipe/infotemp-format-data.pipe';
import { HomeRoutingModule } from './home-route.routing';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, ConvertDataPipePipe, InfotempFormatDataPipe],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
