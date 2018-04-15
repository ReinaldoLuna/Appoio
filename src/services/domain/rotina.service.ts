import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RotinaDTO } from "../../models/rotina.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class RotinaService{

constructor(public http: HttpClient){

}

findAll() : Observable<RotinaDTO[]>{
    return this.http.get<RotinaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
}

}