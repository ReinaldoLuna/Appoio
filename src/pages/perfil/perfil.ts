import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: UsuarioDTO 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService
  ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
       this.usuarioService.findByEmail(localUser.email)
       .subscribe(response => {
         this.usuario = response;
         //IMPORTANTE: buscar imagem
         this.getImageIfExists()
       }, error => {})
    }
  }

  getImageIfExists(){
    this.usuarioService.getImageFromBucket(this.usuario.id)
    .subscribe(respose => {
      this.usuario.foto = `${ API_CONFIG.bucketBaseUrl }/cp${ this.usuario.id }.jpg`
    }, error => {})
  }

}