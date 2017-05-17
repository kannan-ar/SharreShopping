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
        return this.http.get("/api/account/logininfo").map(response => response.json());
    }

    logout(): void {
        this.http.get("/api/account/logout").subscribe(() => { },
        (error) => { console.log(error); },
        () => {
            this.clearLoginTrail();
            window.location.href = "/";
        });
    }

    clearLoginTrail() {
        window.sessionStorage.removeItem('Token');
    }

    isLogged(): boolean {
        return window.sessionStorage.getItem('Token') != null;
    }

    static getToken(): string {
        return window.sessionStorage.getItem('Token');
    }
}