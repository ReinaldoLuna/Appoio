import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  creds: CredenciaisDTO = {
    email: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {

  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'))

        this.navCtrl.setRoot('HomePage');
      },
        error => { })
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'))

        this.navCtrl.setRoot('HomePage');
      },
        error => { })
  }


  signup() {
    this.navCtrl.push('CadastroPage')
  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true)
  }

}
