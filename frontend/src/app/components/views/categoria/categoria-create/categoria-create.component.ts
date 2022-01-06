import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../categoria.service";
import { Categoria } from "../categoria.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(
    private service: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.categoria).subscribe( resposta => {
      this.router.navigate(['categorias']);
      this.service.mensagem('Categoria criada com sucesso!');
    }, error => {
      for ( let i = 0; i < error.error.errors.length; i++ ) {
        this.service.mensagem( error.error.errors[i].message);
      }
    });
  }

}
