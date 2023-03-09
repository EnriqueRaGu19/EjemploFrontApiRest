import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  path = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  public loadProducts() {
    return this.http.get<any>(this.path + "/products");
  }

  public async editProduct(body:any) {
    const insertBody =  {name:body.name, description: body.description, quantity:body.quantity};
    const value$ = this.http.put(this.path + "/products/"+  body.id, insertBody);
    return await lastValueFrom(value$);
  }

  public async deleteProduct(id:number) {
    const value$ = this.http.delete(this.path + "/products/"+ id);
    return await lastValueFrom(value$);
  }

  public async createProduct(body:any) {
    const value$ = this.http.post(this.path + "/products", body);
    return await lastValueFrom(value$);
  }

  public getInfo() {
    return this.http.get('assets/info.json');
  }
}
