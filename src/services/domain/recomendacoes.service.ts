import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RecomendacaoMedicaDTO } from "../../models/recomendacao.dto";

@Injectable()
export class RecomendacoesService {

    constructor(public http: HttpClient) {

    }

    findByCrianca(crianca_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/recomendacoesMedicas/crianca/${crianca_id}`)
    }

    findById(recomendacao_id: string) {
        return this.http.get<RecomendacaoMedicaDTO>(`${API_CONFIG.baseUrl}/recomendacoesMedicas/${recomendacao_id}`)
    }

    deleteById(recomendacao_id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/recomendacoesMedicas/${recomendacao_id}`)
    }

    insert(obj: RecomendacaoMedicaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/recomendacoesMedicas/`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}