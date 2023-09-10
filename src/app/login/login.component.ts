import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ILogin } from '../interfaces/ILogin';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: UsuarioService,
    private router: Router
  ) {}
  email: string = '';
  senha: string = '';
  alerta!: string;
  erro = false;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const usuario: ILogin = {
        email: this.email,
        senha: this.senha,
      };
      console.log(usuario);
      this.loginService.login(usuario).subscribe(
        (res: any) => {
          sessionStorage.setItem('usuario_logado', JSON.stringify(res));
          this.router.navigate(['/admin']);
        },
        (err) => {
          (this.erro = true), (this.alerta = err.error), console.log(err);
        }
      );
    }
  }
}
