import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroRotinaPage } from './cadastro-rotina';

@NgModule({
  declarations: [
    CadastroRotinaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroRotinaPage),
  ],
})
export class CadastroRotinaPageModule {}
