import { Component, OnInit } from '@angular/core';
import {Livro} from "../livro.model";
import {FormControl, Validators} from "@angular/forms";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  idCat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

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

  delete(): void {
    this.service.delete(this.livro.id!).subscribe( () => {
      this.router.navigate([`categorias/${this.idCat}/livros`]);
      this.service.mensagem('Livro deletado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.idCat}/livros`]);
      this.service.mensagem('Falha ao excluir livro.');
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`]);
  }

}
