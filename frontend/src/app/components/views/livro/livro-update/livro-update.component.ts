import { Component, OnInit } from '@angular/core';
import { Livro } from "../livro.model";
import { FormControl, Validators } from "@angular/forms";
import { LivroService } from "../livro.service";
import { ActivatedRoute, Router } from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findByid();
  }

  findByid():void {
    this.service.findById(this.livro.id!).subscribe( (resposta) => {
      this.livro = resposta;
    });
  }

  update(): void {
    this.service.update(this.livro).subscribe( (resposta) => {
      this.router.navigate([`categorias/${this.idCat}/livros`]);
      this.service.mensagem('Livro atualizado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.idCat}/livros`]);
      this.service.mensagem('Falha ao atualizar livro.');
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`]);
  }

  getMessageTitulo() {
    if( this.titulo.invalid ) {
      return 'O campo TITULO deve conter entre 3 e 100 caracteres.';
    }
    return false;
  }

  getMessageNomeAutor() {
    if( this.autor.invalid ) {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres.';
    }
    return false;
  }

  getMessageTexto() {
    if( this.texto.invalid ) {
      return 'O campo TEXTO deve conter entre 10 e 10.000 caracteres.';
    }
    return false;
  }

}
