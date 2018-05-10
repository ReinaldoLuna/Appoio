import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotinaService } from '../../services/domain/rotina.service';
import { RotinaDTO } from '../../models/rotina.dto';

/**
 * Generated class for the RotinasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rotinas',
  templateUrl: 'rotinas.html',
})
export class RotinasPage {

  rotinas: RotinaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rotinaService: RotinaService) {
  }

  ionViewDidLoad() {
    let crianca_nome = this.navParams.get("crianca_nome")

    this.rotinaService.findByCrianca(crianca_nome)
      .subscribe(response => {
        this.rotinas = response['content'];
      }, error => {
        
      })
  }

  showDetail(rotina_id : string){
    this.navCtrl.push('RotinaDetailPage', {rotina_id: rotina_id});
  }
}
