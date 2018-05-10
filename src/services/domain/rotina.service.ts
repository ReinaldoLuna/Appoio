import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RotinaDTO } from "../../models/rotina.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class RotinaService{

constructor(public http: HttpClient){

}


findById(rotina_id: string){
return this.http.get<RotinaDTO>(`${API_CONFIG.baseUrl}/rotinas/${rotina_id}`)
}

findByCrianca(crianca_nome: string){
    return this.http.get(`${API_CONFIG.baseUrl}/rotinas/page/?nome_crianca=${crianca_nome}`)
}
}