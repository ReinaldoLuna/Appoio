import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public menu: MenuController
  ) {

  }

  login(){
    this.navCtrl.setRoot('HomePage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true)
  }

}
