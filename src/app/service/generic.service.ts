import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected http: HttpClient,
    @Inject("url") protected url: string
  ) { }

  findAll(){
    return this.http.get<T[]>(this.url);
  }

  findById(id: number){
    return this.http.get<T>(`${this.url}/${id}`);
  }

  save(t: T):Observable<T>{
    return this.http.post(this.url, t).pipe(map((response: any) => response as T));;
  }

  update(id: number, t: T){
    return this.http.put(`${this.url}/${id}`, t);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
