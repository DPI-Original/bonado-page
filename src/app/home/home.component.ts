import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  pix: string = '';
  pixok = false;

  ngOnInit(): void {
    this.usuarioService.buscarID().subscribe(
      (res: any) => {
        this.pix = res.chave_pix;
        console.log(this.pix);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  copiarPix() {
    console.log('copiado');

    if (this.pix) {
      // Cria um elemento de input para armazenar o texto que você deseja copiar
      const inputElement = document.createElement('input');
      inputElement.value = this.pix;

      // Anexa o elemento de input ao DOM (não é visível para o usuário)
      document.body.appendChild(inputElement);

      // Seleciona o texto dentro do input
      inputElement.select();

      // Copia o texto selecionado para a área de transferência
      document.execCommand('copy');

      // Remove o elemento de input do DOM
      document.body.removeChild(inputElement);

      // Exibe uma mensagem de sucesso (opcional)
      this.pixok = true;
    }
  }
}
