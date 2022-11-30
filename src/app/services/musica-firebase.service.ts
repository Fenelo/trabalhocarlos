import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Musica } from '../models/musica';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class MusicaFirebaseService {
private PATH : string = 'musicas';

  constructor(private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage) { }

  getMusica(id : string){
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getMusicas(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  inserirMusicas(musica: Musica){
    return this.angularFirestore.collection(this.PATH).add({
      nome: musica.nome, anoLancamento: musica.anoLancamento,
      genero: musica.genero,
      downloadURL: musica.downloadURL
    });
  }

  editarMusica(musica: Musica, id: string){
   return this.angularFirestore.collection(this.PATH).doc(id).update({
      nome: musica.nome, anoLancamento: musica.anoLancamento,
      genero: musica.genero
    });
  }
  excluirMusica(id: string){
    return this.angularFirestore.collection(this.PATH).doc(id).delete();
  }

  enviarImagem(imagem: any, musica: Musica){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.log("Tipo Não Suportado!");
      return;
    }
    
    const path = `avatar/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);

    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp=>{
          musica.downloadURL = resp;
          this.inserirMusicas(musica);
        })
      })
    ).subscribe()
    return task;
  }
  
  editarImagem(imagem: any, musica: Musica){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.log("Tipo Não Suportado!");
      return;
    }
    
    const path = `avatar/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);

    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp=>{
          musica.downloadURL = resp;
          this.editarMusica(musica, musica.id);
        })
      }) 
    ).subscribe()
    return task;
  }

}

