import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RotinaService } from '../../services/domain/rotina.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rotinaService: RotinaService  ) {
  }

  ionViewDidLoad() {
    
    this.rotinaService.findAll()
      .subscribe(response => {
        console.log(response);
      },
    error =>{
      console.log(error)
    })
    
    console.log();
  }

}
