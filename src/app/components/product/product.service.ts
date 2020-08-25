import { IProduct } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError } from "rxjs/operators";
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl = "http://localhost:3000/products";

  constructor(private snackBar: MatSnackBar,
    private httpClient: HttpClient) { } 

  showMessage(msg: string, isError: boolean = false) : void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  createProduct(product: IProduct) : Observable<IProduct> {
    return this.httpClient.post<IProduct>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getProducts() : Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getById(id: string): Observable<IProduct>{
    
    const url = `${this.baseUrl}/${id}`;
    
    return this.httpClient.get<IProduct>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const url = `${this.baseUrl}/${product.id}`;

    return this.httpClient.put<IProduct>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  deleteProduct(id: string): Observable<IProduct> {

    const url = `${this.baseUrl}/${id}`;

    return this.httpClient.delete<IProduct>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }  
}
