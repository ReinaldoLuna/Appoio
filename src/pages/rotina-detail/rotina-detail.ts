import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RotinaDTO } from '../../models/rotina.dto';
import { RotinaService } from '../../services/domain/rotina.service';


@IonicPage()
@Component({
  selector: 'page-rotina-detail',
  templateUrl: 'rotina-detail.html',
})
export class RotinaDetailPage {

  rotina: RotinaDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rotinaService: RotinaService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {

    let rotina_id = this.navParams.get('rotina_id');

    this.rotinaService.findById(rotina_id)
      .subscribe(response => {
        this.rotina = response;
      }, error => {

      })
  }

  deleteRotina(rotina_id: string) {
    this.rotinaService.delete(rotina_id)
      .subscribe(response => {
        this.navCtrl.pop()
      })
  }

  confirmDelete(id_rotina: string) {
    let confirm = this.alertCtrl.create({
      title: 'Apagar rotina',
      message: 'Você tem certeza que deseja apagar esta rotina?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',

        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteRotina(id_rotina)
          }
        }
      ]
    });
    confirm.present();
  }

}
