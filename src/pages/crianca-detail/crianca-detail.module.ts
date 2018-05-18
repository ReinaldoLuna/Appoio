import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriancaDetailPage } from './crianca-detail';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    CriancaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CriancaDetailPage),
  ],
  providers: [
    Camera
  ]
})
export class CriancaDetailPageModule {}
