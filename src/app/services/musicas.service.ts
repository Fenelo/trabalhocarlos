import { Injectable } from '@angular/core';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root'
})
export class MusicasService {
  private _musicas: Musica[] = [];

  constructor() {
    let musica: Musica = new Musica("Felipe",
    312412412, "masculino");
    this.inserir(musica);
  }

  inserir(musica: Musica): void{
    this._musicas.push(musica);
  }

  editar(musica: Musica, nome: string, anoLancamento: number,
    genero: string): boolean{
      for(let i=0; i< this._musicas.length; i++){
        if(this._musicas[i].id == musica.id){
          this._musicas[i].nome = nome;
          this._musicas[i]. anoLancamento = anoLancamento;
          this._musicas[i].genero = genero;
        
          return true;
        }
      }
      return false;
    }

    excluir(musica: Musica): boolean{
      for(let i=0; i< this._musicas.length; i++){
        if(this._musicas[i].id == musica.id){
          this._musicas.splice(i,1);
          return true;
        }
      }
      return false;
    }

  get musicas() : Musica[]{
    return this._musicas;
  }

  set musicas(musicas: Musica[]){
    this._musicas = musicas;
  }
}
