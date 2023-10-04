import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private urlBase = "http://localhost:9000/especialidades"
  private headers = new HttpHeaders().append("Content-Type", "application/json");

  constructor(private http: HttpClient) { }
obtenerEspecialidades(){
return this.http.get<any>(this.urlBase, {headers: this.headers});
}

}
