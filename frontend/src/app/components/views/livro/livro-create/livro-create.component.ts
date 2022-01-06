import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { LivroService } from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Livro} from "../livro.model";

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  idCat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);

  autor = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);

  texto = new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(10000),
  ]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('idCat')!;
  }

  create(): void {
    this.service.create(this.livro, this.idCat).subscribe( (resposta) => {
      this.router.navigate([`categorias/${this.idCat}/livros`]);
      this.service.mensagem("Livro criado com sucesso!");
    }, err => {
      this.router.navigate([`categorias/${this.idCat}/livros`]);
      this.service.mensagem("Erro ao criar um novo livro. Tente mais tarde.");
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`]);
  }

  getMessage(): boolean | String {
    if ( this.titulo.invalid ) {
      return "O campo TÍTULO deve conter entre 3 e 100 caracteres";
    }

    if ( this.autor.invalid ) {
      return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres";
    }

    if ( this.texto.invalid ) {
      return "O campo TEXTO deve conter entre 10 e 10.000 caracteres";
    }

    return false;
  }

}
