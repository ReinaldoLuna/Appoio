import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RotinaDTO } from "../../models/rotina.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class RotinaService{

constructor(public http: HttpClient){

}
findByCrianca(crianca_nome: string){
    return this.http.get(`${API_CONFIG.baseUrl}/rotinas/page/?nome_crianca=${crianca_nome}`)
}

}