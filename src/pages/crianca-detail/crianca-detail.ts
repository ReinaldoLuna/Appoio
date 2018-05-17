import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CriancaService } from '../../services/domain/crianca.service';
import { CriancaDTO } from '../../models/crianca.dto';
import { UsuarioDTO } from '../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-crianca-detail',
  templateUrl: 'crianca-detail.html',
})
export class CriancaDetailPage {

  crianca: CriancaDTO;
  usuarios;
  picture: string;
  cameraOn: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public criancaService: CriancaService,
    public camera: Camera,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.getCrianca()
  }

  getCrianca() {
    let crianca_id = this.navParams.get('crianca_id');
    return this.criancaService.findById(crianca_id)
      .subscribe(response => {
        this.crianca = response;
        this.usuarios = this.crianca.usuarios;
      }, error => { })
  }

  editCrianca(crianca_id: string, crianca_obj: CriancaDTO) {
    this.navCtrl.setRoot('EditCriancaPage', { crianca_id: this.crianca.id, crianca_obj: this.crianca })
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

}
