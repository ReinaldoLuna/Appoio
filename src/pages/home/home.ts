import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotinaService } from '../../services/domain/rotina.service';
import { RotinaDTO } from '../../models/rotina.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  items: RotinaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rotinaService: RotinaService  ) {
  }

  ionViewDidLoad() {
    
    this.rotinaService.findAll()
      .subscribe(response => {
       this.items = response
       console.log(this.items)
      },
    error =>{});
  }

}
