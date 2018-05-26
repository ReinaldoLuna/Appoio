import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroCriancaPage } from './cadastro-crianca';

@NgModule({
  declarations: [
    CadastroCriancaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroCriancaPage),
  ],
})
export class CadastroCriancaPageModule {}
