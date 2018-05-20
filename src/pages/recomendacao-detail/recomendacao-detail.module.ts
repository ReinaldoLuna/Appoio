import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecomendacaoDetailPage } from './recomendacao-detail';

@NgModule({
  declarations: [
    RecomendacaoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RecomendacaoDetailPage),
  ],
})
export class RecomendacaoDetailPageModule {}
