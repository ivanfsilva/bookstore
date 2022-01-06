import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Livro } from "./livro.model";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  findAllByCategoria( idCat: String ): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${idCat}`;
    return this.http.get<Livro[]>(url);
  }

}
