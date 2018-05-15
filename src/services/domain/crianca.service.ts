import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CriancaDTO } from "../../models/crianca.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CriancaService {

    constructor(public http: HttpClient) {

    }

    findByUser(usuario_id: string): Observable<CriancaDTO[]> {
        return this.http.get<CriancaDTO[]>(`${API_CONFIG.baseUrl}/criancas/usuario/${usuario_id}`);
    }

    getImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/crianca_id${id}.jpg`
        return this.http.get(url, { responseType: 'blob'})
    }

    insert(obj: CriancaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/criancas/`,
            obj,
            {
                observe: "response",
                responseType: "text"
            }
        )
    }

}