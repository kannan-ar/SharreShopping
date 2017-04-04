import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import {Observable} from "rxjs/Rx";

import {LoginInfo} from "../../models/account/login-info";

@Injectable()
export class AccountService {
    constructor(
        private http: Http
    ) { }

    getInfo(): Observable<LoginInfo> {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + window.sessionStorage.getItem('SSToken'));

        return this.http.get("/api/account/logininfo", {
            headers: headers
        }).map(response => response.json());
    }
}