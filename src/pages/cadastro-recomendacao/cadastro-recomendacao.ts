import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { RecomendacoesService } from '../../services/domain/recomendacoes.service';

@IonicPage()
@Component({
  selector: 'page-cadastro-recomendacao',
  templateUrl: 'cadastro-recomendacao.html',
})
export class CadastroRecomendacaoPage {

  formGroup: FormGroup
  usuario: UsuarioDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storageService: StorageService,
    public usuarioService: UsuarioService,
    public recomendacaoService: RecomendacoesService) {
    this.formGroup = this.formBuilder.group({
      observacao: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      crianca: ['', [Validators.required]]
    })
  }

  crianca_id = this.navParams.get('crianca_id')

  ionViewDidLoad() {

  }

  novaRecomendacao() {
    let localUser = this.storageService.getLocalUser()
    this.usuarioService.findByEmail(localUser.email)
      .subscribe(response => {
        this.usuario = response;
        this.formGroup.value.crianca = { 'id': this.crianca_id }
        this.formGroup.value.usuario = { 'id': this.usuario.id }

        this.recomendacaoService.insert(this.formGroup.value)
          .subscribe(response => {
            this.navCtrl.pop()
          })
      }, error => {

      })


  }

}
