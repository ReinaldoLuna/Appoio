import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { CriancaService } from '../../services/domain/crianca.service';
import { CriancaDTO } from '../../models/crianca.dto';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: UsuarioDTO;
  criancas: CriancaDTO[];
  picture: string;
  profileImage;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public camera: Camera,
    public criancaService: CriancaService,
    public loadingCtrl: LoadingController,
    public sanitizer: DomSanitizer
  ) {
    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    let loader = this.presentLoading()

    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();
          this.criancaService.findByUser(this.usuario.id)
            .subscribe(response => {
              this.criancas = response;
              this.loadImgageUrls();
              loader.dismiss();
            }, error => {
              loader.dismiss();
            })
        }, error => {
          if (error.status == 403) {
            console.log("Erro 403")
            this.navCtrl.setRoot('LoginPage')
          }
        })
    } else {

      this.navCtrl.setRoot('LoginPage')
    }
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
      .subscribe(response => {
        this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/usuario_id${this.usuario.id}.jpg`;
        this.blobToDataURL(response).then(dataUrl => {
          let str = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        })
      }, error => {
        this.profileImage = 'assets/imgs/avatar-blank.png';
      })
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob)
    })
  }

  loadImgageUrls() {
    for (var i = 0; i < this.criancas.length; i++) {
      let crianca = this.criancas[i];
      this.criancaService.getImageFromBucket(crianca.id)
        .subscribe(response => {
          crianca.imageUrl = `${API_CONFIG.bucketBaseUrl}/crianca_id${crianca.id}.jpg`;
        }, error => { })
    }
  }
/*
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
      this.cameraOn = false;
    });
  }
*/
  getGaleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
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
    this.usuarioService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageIfExists();
      }, error => { })
  }

  cancel() {
    this.picture = null;
  }

  showDetail(crianca_id: string, usuario_tipo: string) {
    this.navCtrl.push('CriancaDetailPage', { crianca_id: crianca_id, usuario_tipo: this.usuario.tipo })
  }

}
