import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RotinaDTO } from "../../models/rotina.dto";

@Injectable()
export class RotinaService {

    constructor(public http: HttpClient) {

    }

    findById(rotina_id: string) {
        return this.http.get<RotinaDTO>(`${API_CONFIG.baseUrl}/rotinas/${rotina_id}`)
    }

    findByCrianca(crianca_nome: string, page: number = 0,linesPerPage: number = 24 ) {
        return this.http.get(`${API_CONFIG.baseUrl}/rotinas/page/?nome_crianca=${crianca_nome}&page=${page}&linesPerPage=${linesPerPage}&direction=DESC`)
    }

    insert(obj: RotinaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/rotinas/`,
            obj,
            {
                observe: "response",
                responseType: "text"
            }
        )
    }

    delete(rotina_id: string){
        return this.http.delete(`${API_CONFIG.baseUrl}/rotinas/${rotina_id}`)
    }
}