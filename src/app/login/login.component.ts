import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  showPreloader: boolean = false;
  buttonCadastro: boolean = false;
  buttonLogin: boolean = false;

  rota = localStorage.getItem('rota');

  nome: string = '';
  email: string = '';
  telefone: string = '';
  senha: string = '';
  id: string = '';

  ngOnInit() {
    this.rota=localStorage.getItem('rota');
    console.log(this.rota);
  }

  testLogin() {
    const email = "johndoe@example.com";
    const senha = "senha123";

    this.Login(email, senha);

    // Verificar se o console.log foi chamado corretamente
    // e se os demais passos do login estão corretos.
  }

  Login(email: string, senha: string) {
    this.showPreloader = true;
    console.log('Passei no primeiro ponto do login');
    $.get(
      `https://servidorslowfu-api.onrender.com/login`,
      {
        email: email,
        senha: senha,
      },
      (res) => {
        console.log(res);
        console.log('Passei no segundo ponto do login');
        if (res === 'Login') {
          console.log('Sua senha foi válidada!');
          this.Dados(email);
          console.log("Tudo certo no login! aqui os dados salvos: "+this.id,this.nome,this.email,this.telefone);
          this.showPreloader = false;
          this.buttonCadastro = true;
          setTimeout(() => {
            this.router.navigate(['/seletor']);
          }, 1000);
        } else if (res === 'Usuário não encontrado.') {
          this.showPreloader = false;
          alert('Usuário não encontrado.');
        } else {
          this.showPreloader = false;
          alert('Senha incorreta.');
        }
      }
    );
  }

  formValido(): boolean {
    return true;
  }

  Dados(email: string) {
    console.log('Fui acionado');

    $.post(
      `https://servidorslowfu-api.onrender.com/dados_usuario`,
      {
        email: email,
      },
      (res) => {
        console.log('Trouxe dados!');
        this.id = res[0].ID;
        this.nome = res[0].nome; // Verifique a estrutura do objeto JSON retornado e ajuste os índices ou propriedades adequadamente
        this.senha = res[0].senha;
        this.email = res[0].email;
        this.telefone = res[0].telefone;
        console.log(res);
        localStorage.setItem('id', this.id); //salvando o id no localStorage
        localStorage.setItem('nome', this.nome);
        localStorage.setItem('senha', this.senha);
        localStorage.setItem('email', this.email);
        localStorage.setItem('telefone', this.telefone);
      }
    );
  }

  Home(){
    this.buttonLogin = true;
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  Cadastro(){
    this.buttonCadastro = true;
    setTimeout(() => {
      window.location.href = '/cadastro';
    }, 1000);
  }
}
