import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CriancaDTO } from "../../models/crianca.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CriancaService{

constructor(public http: HttpClient){

}

findByUser(usuario_id: string) : Observable<CriancaDTO[]>{
    return this.http.get<CriancaDTO[]>(`${API_CONFIG.baseUrl}/criancas/usuario/?id=${usuario_id}`);
}

}