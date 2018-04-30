import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      nome: ['',[Validators.required]],
      email: ['',[Validators.required]],
      senha: ['',[Validators.required, Validators.minLength(8)]],
      telefone: ['',[Validators.required]],
      foto: [''],
      tipo: ['2',[Validators.required]],
      
    });
  }

  signupUser() {
    console.log('formulario enviado')
  }

  ionViewDidLoad() {
  }

}
