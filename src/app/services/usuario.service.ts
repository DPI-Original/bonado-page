import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../interfaces/ILogin';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  private API = 'https://bonado-api.vercel.app/';
  private local = 'localhost:3000/';

  public login(usuario: ILogin) {
    return this.http.post(`${this.API}sessao`, usuario);
  }

  public buscarID() {
    const id: string = environment.ID_ADM;
    return this.http.get(`${this.API}usuario/${id}`);
  }

  public mudarPix(pix: string, token: string) {
    const body = {
      chave_pix: pix,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put(`${this.API}usuario`, body, { headers });
  }
}
