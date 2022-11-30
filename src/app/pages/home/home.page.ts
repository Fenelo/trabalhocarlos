import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MusicaFirebaseService } from 'src/app/services/musica-firebase.service';
import { Musica } from '../../models/musica';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  musicas : Musica[];

  constructor(private router: Router,
    private auth: AuthService,
    private musicaService: MusicaFirebaseService) {
      console.log(this.auth.getUsuarioLogado());
      this.musicaService.getMusicas()
      
      .subscribe(resp=> {
        this.musicas = resp.map(musica=>{
          return{
            id : musica.payload.doc.id,
            ...musica.payload.doc.data() as Musica
          }as Musica
        });
      });
  }

  irParaCadastroPage(): void{
    this.router.navigate(['/cadastro']);
  }

  irParaDetalharPage(musica: Musica):void{
    this.router.navigateByUrl('/detalhar', {
      state: { objeto:musica }
    });
  }

}
