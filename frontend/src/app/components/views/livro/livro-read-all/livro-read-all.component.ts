import { Component, OnInit } from '@angular/core';
import {Livro} from "../livro.model";
import {LivroService} from "../livro.service";
import {ActivatedRoute} from "@angular/router";
import {Categoria} from "../../categoria/categoria.model";
import {CategoriaService} from "../../categoria/categoria.service";

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];
  idCat: String = '';
  livros: Livro[] = [];

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(
    private service: LivroService,
    private serviceCat: CategoriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('idCat')!;
    this.findAll();
    this.findByIdCat();
  }

  findAll(): void {
    this.service.findAllByCategoria(this.idCat).subscribe((resposta) => {
      this.livros = resposta;
      console.log(this.livros);
    });
  }

  findByIdCat(): void {
    this.serviceCat.findById(this.idCat).subscribe((resposta) => {
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;
    });
  }

}
