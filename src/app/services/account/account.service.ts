import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Rx";

import {LoginInfo} from "../../models/account/login-info";

@Injectable()
export class AccountService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getInfo(): Observable<LoginInfo> {
        return this.httpClient.get<LoginInfo>("/api/account/logininfo");
    }

    logout(): void {
        this.httpClient.get("/api/account/logout").subscribe(() => { },
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