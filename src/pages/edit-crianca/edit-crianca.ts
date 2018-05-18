import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CriancaService } from '../../services/domain/crianca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CriancaDTO } from '../../models/crianca.dto';

@IonicPage()
@Component({
  selector: 'page-edit-crianca',
  templateUrl: 'edit-crianca.html',
})
export class EditCriancaPage {

  formGroup: FormGroup;

  formatData() {
    let d = this.formGroup.value.dataNascimento;
    let split = d.split('-');
    this.formGroup.value.dataNascimento = split[2] + '/' + split[1] + '/' + split[0];
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public criancaService: CriancaService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

    let crianca: CriancaDTO = this.navParams.get('crianca_obj')
    let usuarios = crianca.usuarios;


    this.formGroup = this.formBuilder.group({
      nome: [crianca.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      colegio: [crianca.colegio, [Validators.required]],
      foto: ['teste.jpg', [Validators.required]],
      dataNascimento: ['', Validators.required],
      sexo: [crianca.sexo, Validators.required],
      categoriaTea: [crianca.categoriaTea, [Validators.required]],
      usuarios: [usuarios, [Validators.required]],
      recomendacoesMedicas: [[{ "observacoes": "Teste" }], [Validators.required]],
    });
  }

  crianca_id = this.navParams.get('crianca_id')

  ionViewDidLoad() {
  }

  editCrianca() {
    this.formatData();
    this.criancaService.updateCrianca(this.formGroup.value, this.crianca_id)
      .subscribe(response => {
        this.showEditOk()
      }, error => { })
  }

  showEditOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Criança editada!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('PerfilPage');
          }
        }
      ]
    });
    alert.present();
  }

}
