import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Livro } from "./livro.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar
  ) { }

  findById( id: String ): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${id}`;
    return this.http.get<Livro>(url);
  }

  findAllByCategoria( idCat: String ): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros/?categoria=${idCat}`;
    return this.http.get<Livro[]>(url);
  }

  update(livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/livros/${livro.id}`;
    return this.http.put<Livro>(url, livro);
  }

  create( livro: Livro, idCat: String ): Observable<Livro[]> {
    const url = `${this.baseUrl}/livros?categoria=${idCat}`;
    return this.http.post<Livro[]>(url, livro);
  }

  mensagem( str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
