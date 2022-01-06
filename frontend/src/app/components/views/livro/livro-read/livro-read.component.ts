import { Component, OnInit } from '@angular/core';
import {Livro} from "../livro.model";
import {FormControl, Validators} from "@angular/forms";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

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

  cancel(): void {
    this.router.navigate([`categorias/${this.idCat}/livros`]);
  }

}
