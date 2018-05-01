import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  formGroup: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['Teste', [Validators.required]],
      email: ['teste', [Validators.required]],
      senha: ['12345678', [Validators.required, Validators.minLength(8)]],
      telefone: ['32323232323', [Validators.required]],
      foto: [''],
      tipo: ['2', [Validators.required]],

    });
  }

  signupUser() {
    this.usuarioService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      })
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Sucesso!",
      message: "Cadastro realizado",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.pop();
          }   
        }    
      ]
    });
    alert.present();
  }

}
