import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CriancaDTO } from "../../models/crianca.dto";
import { Observable } from "rxjs/Rx";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class CriancaService {

    constructor(
        public http: HttpClient,
        public imageUtilService: ImageUtilService) {

    }

    findByUser(usuario_id: string): Observable<CriancaDTO[]> {
        return this.http.get<CriancaDTO[]>(`${API_CONFIG.baseUrl}/criancas/usuario/${usuario_id}`);
    }

    findById(crianca_id: string) {
        return this.http.get<CriancaDTO>(`${API_CONFIG.baseUrl}/criancas/${crianca_id}`)
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/crianca_id${id}.jpg`
        return this.http.get(url, { responseType: 'blob' })
    }

    updateCrianca(obj: CriancaDTO, crianca_id: string) {

        return this.http.put(
            `${API_CONFIG.baseUrl}/criancas/${crianca_id}`,
            obj,
            {
                observe: "response",
                responseType: "text"
            }
        )

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

    uploadPicture(picture, crianca_id: string) {
        console.log(crianca_id);
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/criancas/picture/${crianca_id}`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}