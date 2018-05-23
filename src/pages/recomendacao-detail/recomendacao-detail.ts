import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RecomendacoesService } from '../../services/domain/recomendacoes.service';
import { RecomendacaoMedicaDTO } from '../../models/recomendacao.dto';

@IonicPage()
@Component({
  selector: 'page-recomendacao-detail',
  templateUrl: 'recomendacao-detail.html',
})
export class RecomendacaoDetailPage {

  recomendacao: RecomendacaoMedicaDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recomendacaoService: RecomendacoesService,
    public alertCtrl: AlertController) {
  }

  recomendacao_id = this.navParams.get('recomendacao_id');
  tipo_medico = this.navParams.get('tipo_medico');


  ionViewDidLoad() {
    this.getRecomendacao()
  }

  getRecomendacao() {
    return this.recomendacaoService.findById(this.recomendacao_id)
      .subscribe(response => {
        this.recomendacao = response
        console.log(this.recomendacao)
      }, error => {

      })
  }


  deleteRecomendacao(id_recomendacao: string){
    this.recomendacaoService.deleteById(this.recomendacao_id)
    .subscribe( response => {
      this.navCtrl.pop()
    })
  }

  confirmDelete(id_recomendacao: string){
    let confirm = this.alertCtrl.create({
      title: 'Apagar Recomendação Médica?',
      message: 'Você tem certeza que deseja apagar esta Recomendacao médica?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',

        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteRecomendacao(id_recomendacao)
          }
        }
      ]
    });
    confirm.present();
  }
}
