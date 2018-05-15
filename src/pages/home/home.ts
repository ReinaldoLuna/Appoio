import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CriancaService } from '../../services/domain/crianca.service';
import { CriancaDTO } from '../../models/crianca.dto';
import { UsuarioDTO } from '../../models/usuario.dto';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  criancas: CriancaDTO[];
  usuario: UsuarioDTO
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public criancaService: CriancaService,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    let loader = this.presentLoading()

    this.usuarioService.findByEmail(localUser.email)
      .subscribe(response => {
        this.usuario = response;
        loader.dismiss();
        this.criancaService.findByUser(this.usuario.id)
          .subscribe(response => {
            this.criancas = response
          }, error => {
            loader.dismiss();
          })
      })
  }

  showRotinas( crianca_nome: string, crianca_id: string) {
    this.navCtrl.push('RotinasPage', { crianca_nome: crianca_nome, crianca_id: crianca_id })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
