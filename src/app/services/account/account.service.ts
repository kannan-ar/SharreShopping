import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import {Observable} from "rxjs/Rx";

import {LoginInfo} from "../../models/account/login-info";

@Injectable()
export class AccountService {
    constructor(
        private http: Http
    ) { }

    static getToken(): string {
        return window.sessionStorage.getItem('SSToken');
    }

    getInfo(): Observable<LoginInfo> {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        return this.http.get("/api/account/logininfo", {
            headers: headers
        }).map(response => response.json());
    }
}