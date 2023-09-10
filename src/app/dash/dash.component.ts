import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  user: string = '';
  pix: string = '';
  token: string = '';

  pixatual: string = '';
  ngOnInit(): void {
    const sessao = sessionStorage.getItem('usuario_logado');
    if (sessao) {
      const { id, jwtToken } = JSON.parse(sessao);
      this.token = jwtToken;
      this.usuarioService.buscarID().subscribe(
        (res: any) => {
          this.user = res.nome;
          this.pixatual = res.chave_pix;
          console.log(this.user);
          console.log(this.pixatual);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.router.navigate(['/admin/login']);
    }
  }

  mudarPix() {
    console.log('Botão clicado');
    if (this.pix !== '') {
      this.usuarioService.mudarPix(this.pix, this.token).subscribe(
        (res) => {
          this.usuarioService.buscarID().subscribe(
            (res: any) => {
              this.pixatual = res.chave_pix;
            },
            (err) => {}
          );
        },
        (err) => {}
      );
    }
  }
}
