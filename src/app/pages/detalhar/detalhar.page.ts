import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Musica } from 'src/app/models/musica';
import { MusicaFirebaseService } from 'src/app/services/musica-firebase.service';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
musica: Musica;
edicao: boolean = true;
form_cadastrar: FormGroup;
isSubmitted: boolean = false;

  constructor(private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private musicaService: MusicaFirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.musica = nav.extras.state.objeto;
    this.form_cadastrar = this.formBuilder.group({
      nome: [this.musica.nome,[Validators.required]],
      anoLancamento:  [this.musica.anoLancamento,[Validators.required, Validators.minLength(4)]],
      genero:  [this.musica.genero,[Validators.required]]
    });
  }

  get errorControl(){
    return this.form_cadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert('Musica', 'Erro ao Salvar Musica', 'Todos os Campos são Obrigatórios');
      return false;
    }else{
      this.salvar();
    }
  }

  alterarEdicao(): void{
    if(this.edicao == false){
      this.edicao = true;
    }else{
      this.edicao = false;
    }
  }

  salvar(){
    this.musicaService.editarMusica(this.form_cadastrar.value, this.musica.id)
    .then(()=>{
      this.presentAlert('Musicas', 'Editar', 'Musica editada com Sucesso!');
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      this.presentAlert('Musicas', 'Editar', 'Erro ao editar!');
    })
  }

  excluir(): void{
    this.presentConfirmAlert("Agenda", "Excluir Music",
    "Você deseja realmente excluir a Musica?");
  }

  private excluirMusica(){
     this.musicaService.excluirMusica(this.musica.id)
     .then(()=>{
      this.presentAlert('Musica', 'Excluir', 'Musica excluída com Sucesso!');
      this.router.navigate(['/home']);
    })
    .catch(()=>{
      this.presentAlert('Musica', 'Excluir', 'Erro ao excluir!');
    })
  }

  async presentAlert(titulo : string, subtitulo: string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK'],
    })
        await alert.present();
  }

  async presentConfirmAlert(titulo : string, subtitulo: string, msg : string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: [
        {text: 'Cancelar',
         role: 'cancelar',
         handler: ()=>{console.log("cancelou")}},
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler:(acao) =>{
            this.excluirMusica();
          }
        }
      ],
    })
        await alert.present();
  }

  private validar(campo: any) : boolean{
    if(!campo){
      return false;
    }else{
      return true;
    }
  }

}
