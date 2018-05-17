import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriancaDetailPage } from './crianca-detail';

@NgModule({
  declarations: [
    CriancaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CriancaDetailPage),
  ],
})
export class CriancaDetailPageModule {}
