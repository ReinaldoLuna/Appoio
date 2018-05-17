import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CriancaService } from '../../services/domain/crianca.service';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-cadastro-crianca',
  templateUrl: 'cadastro-crianca.html',
})
export class CadastroCriancaPage {


  formatData() {
    let d = this.formGroup.value.dataNascimento;
    let split = d.split('-');
    this.formGroup.value.dataNascimento = split[2] + '/' + split[1] + '/' + split[0];
  }

  usuario: UsuarioDTO;


  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public criancaService: CriancaService,
    public alertCtrl: AlertController,
    public storage: StorageService,
    public usuarioService: UsuarioService, ) {

    this.formGroup = this.formBuilder.group({
      nome: ['Juscelino', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      colegio: ['Granbery', [Validators.required]],
      foto: ['teste.jpg', [Validators.required]],
      dataNascimento: ['', Validators.required],
      sexo: [0, [Validators.required]],
      categoriaTea: [0, [Validators.required]],
      recomendacoesMedicas: [[{ "observacoes": "" }], [Validators.required]],
      usuarios: [[{ "id": "" }]]
    });
  }

  ionViewDidLoad() {

    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
        })
    }
  }

  novaCrianca() {
    this.formatData();
    this.formGroup.value.usuarios = [{ "id": this.usuario.id }]
    
        this.criancaService.insert(this.formGroup.value)
          .subscribe(response => {
            this.showInsertOk()
          }, error => { })

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push('HomePage');
          }
        }
      ]
    });
    alert.present();
  }
}
