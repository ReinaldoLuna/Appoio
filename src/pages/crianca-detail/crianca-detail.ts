import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CriancaService } from '../../services/domain/crianca.service';
import { CriancaDTO } from '../../models/crianca.dto';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UsuarioService } from '../../services/domain/usuario.service';
import { RecomendacoesService } from '../../services/domain/recomendacoes.service';

@IonicPage()
@Component({
  selector: 'page-crianca-detail',
  templateUrl: 'crianca-detail.html',
})
export class CriancaDetailPage {

  crianca: CriancaDTO;
  usuarios;
  recomendacoes;
  picture: string;
  cameraOn: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public criancaService: CriancaService,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController,
    public recomendacoesService: RecomendacoesService
  ) {
  }

  crianca_id = this.navParams.get('crianca_id');
  usuario_tipo = this.navParams.get('usuario_tipo');

  medico: boolean;
  delete_usuario: boolean = true;

  isMedico(tipo_usuario) {
    if ((tipo_usuario == "PSICOLOGO") || (tipo_usuario == "PSIQUIATRA") || (tipo_usuario == "PEDIATRA")) {
      this.medico = true;
    } else {
      this.medico = false;
    }
  }

  ionViewDidLoad() {
    this.getCrianca()
    this.getRecomendacoes()
    this.isMedico(this.usuario_tipo)
  }

  getCrianca() {
    return this.criancaService.findById(this.crianca_id)
      .subscribe(response => {
        this.crianca = response;
        this.usuarios = this.crianca.usuarios;
        this.recomendacoes = this.crianca.recomendacoesMedicas;
        if (this.usuarios.length < 2) {
          this.delete_usuario = false
        } else {
          this.delete_usuario = true
        }
      }, error => { })
  }

  editCrianca(crianca_id: string, crianca_obj: CriancaDTO) {
    this.navCtrl.push('EditCriancaPage', { crianca_id: this.crianca.id, crianca_obj: this.crianca })
  }

  deleteUserFromChild(usuario_id: string) {
    for (var i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id == usuario_id) {
        this.usuarios.splice(i, 1);
        this.crianca.usuarios = this.usuarios;
      }
    }

    this.criancaService.updateCrianca(this.crianca, this.crianca_id)
      .subscribe(response => {
        this.getCrianca();
        this.showDeleteUserOk()
      })
  }

  addNewUser(usuario_email: string) {
    this.usuarioService.findByEmail(usuario_email)
      .subscribe(response => {
        this.usuarios.push(response);
        this.criancaService.updateCrianca(this.crianca, this.crianca_id)
          .subscribe(response => {
            this.showInsertUserOk();
            this.getCrianca()
          }, error => {

          });
      }, error => {

      });
  }

  getRecomendacoes() {
    this.recomendacoesService.findByCrianca(this.crianca_id)
      .subscribe(response => {
        this.recomendacoes = response;
      })
  }

  addRecomendacao(crianca_id: string) {
    this.navCtrl.push('CadastroRecomendacaoPage', { crianca_id: crianca_id })
  }

  showDetail(recomendacao_id: string, tipo_medico: boolean) {
    this.navCtrl.push('RecomendacaoDetailPage', { recomendacao_id: recomendacao_id, tipo_medico: this.medico });
  }

  getImageIfExists() {
    this.criancaService.getImageFromBucket(this.crianca.id)
      .subscribe(respose => {
        this.crianca.imageUrl = `${API_CONFIG.bucketBaseUrl}/crianca_id${this.crianca.id}.jpg`
      }, error => { })
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  sendPicture() {
    this.criancaService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getCrianca();
      }, error => { })
  }

  cancel() {
    this.picture = null;
  }

  showInsertUserOk() {
    let alert = this.alertCtrl.create({
      title: "Sucesso!",
      message: "Novo usuário associado com sucesso",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Ok",
        }
      ]
    });
    alert.present();
  }

  showDeleteUserOk() {
    let alert = this.alertCtrl.create({
      title: "Sucesso!",
      message: "Usuário removido",
      enableBackdropDismiss: true,
      buttons: [
        {
          text: "Ok",
        }
      ]
    });
    alert.present();
  }

  confirmDelete(id_usuario: string) {
    let confirm = this.alertCtrl.create({
      title: 'Remover usuário?',
      message: 'Você tem certeza que deseja remover este usuário?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',

        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteUserFromChild(id_usuario)
          }
        }
      ]
    });
    confirm.present();
  }
}
