import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RotinaService } from '../../services/domain/rotina.service';
import { RotinaDTO } from '../../models/rotina.dto';


@IonicPage()
@Component({
  selector: 'page-rotinas',
  templateUrl: 'rotinas.html',
})
export class RotinasPage {

  rotinas: RotinaDTO[] = [];
  id_crianca: string;
  page: number = 0;

  crianca_id = this.navParams.get("crianca_id");
  crianca_nome = this.navParams.get("crianca_nome");
  usuario_id = this.navParams.get("usuario_id");
  usuario_tipo = this.navParams.get("usuario_tipo");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rotinaService: RotinaService,
    public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
    let loader = this.presentLoading();
    this.rotinaService.findByCrianca(this.crianca_nome, this.page, 10)
      .subscribe(response => {
        this.rotinas = this.rotinas.concat(response['content']);
        loader.dismiss()
      }, error => {
        loader.dismiss();
      })
  }

  addRotina(crianca_id: string, crianca_nome: string, usuario_id:string, usuario_tipo: string) {
    this.navCtrl.push('CadastroRotinaPage', { crianca_nome: this.crianca_nome, crianca_id: crianca_id, usuario_id: this.usuario_id, usuario_tipo: this.usuario_tipo });
  }
  
  showDetail(rotina_id: string) {
    this.navCtrl.push('RotinaDetailPage', { rotina_id: rotina_id });
  }

  doRefresh(refresher) {
    this.page = 0;
    this.rotinas = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
