import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public rotinaService: RotinaService) {
  }

  ionViewDidLoad() {

let rotina_id = this.navParams.get('rotina_id');

    this.rotinaService.findById(rotina_id)
    .subscribe(response => {
      this.rotina = response;
    }, error => {

    })
  }

}
