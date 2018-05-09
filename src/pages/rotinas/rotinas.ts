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

  items: RotinaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rotinaService: RotinaService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get("categoria_id")

    this.rotinaService.findByCrianca(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
      }, error => {
        
      })
  }

}
