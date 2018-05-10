import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RotinaDetailPage } from './rotina-detail';

@NgModule({
  declarations: [
    RotinaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RotinaDetailPage),
  ],
})
export class RotinaDetailPageModule {}
