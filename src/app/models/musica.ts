
export class Musica {
  private _id: string;
  private _nome: string;
  private _anoLancamento: number;
  private _genero: string;
  private _downloadURL : string;

  private _albumMusica: string;
  private _cantor: string;
  private _produtora: string;
  private _duracao: number;


  constructor(nome: string, anoLancamento: number,
    genero: string){
    this._nome = nome;
    this._anoLancamento = anoLancamento;
    this._genero = genero;
  }

  get id(): string{
    return this._id;
  }

   get nome(): string{
    return this._nome;
   }

   set nome(nome: string){
    this._nome = nome;
   }


   get anoLancamento(): number{
    return this._anoLancamento;
   }

   set anoLancamento(anoLancamento: number){
    this._anoLancamento = anoLancamento;
   }

   get genero(): string{
    return this._genero;
   }

   set genero(genero: string){
    this._genero = genero;
   }

   get downloadURL() : string{
    return this._downloadURL;
   }

   set downloadURL(downloadURL : string){
    this._downloadURL = downloadURL;
   }


   get albumMusica(): string{
    return this._albumMusica;
   }

   set albumMusica(albumMusica: string){
    this._albumMusica = albumMusica;
   }

   get cantor(): string{
    return this._cantor;
   }

   set cantor(cantor: string){
    this._cantor = cantor;
   }
   
   get produtora(): string{
    return this._produtora;
   }

   set produtora(produtora: string){
    this._produtora = produtora;
   }
   get duracao(): number{
    return this._duracao;
   }

   set duracao(duracao: number){
    this._duracao = duracao;
   }

}
