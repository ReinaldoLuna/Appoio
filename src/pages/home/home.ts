import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CriancaService } from '../../services/domain/crianca.service';
import { CriancaDTO } from '../../models/crianca.dto';
import { UsuarioDTO } from '../../models/usuario.dto';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  criancas: CriancaDTO[];
  usuario: UsuarioDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public criancaService: CriancaService,
    public storage: StorageService,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {

    let localUser = this.storage.getLocalUser();

    this.usuarioService.findByEmail(localUser.email)
      .subscribe(response => {
        this.usuario = response;
        this.criancaService.findByUser(this.usuario.id)
        .subscribe(response => {
          this.criancas = response
        }, error =>{
          console.log("deu erro carai")
        })
      })
  }

  showRotinas(crianca_id: string){
    this.navCtrl.push('RotinasPage', {crianca_id: crianca_id})
  }

}
