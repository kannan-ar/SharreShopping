import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import {AccountService} from "./account/account.service";

@Injectable()
export class FacebookService {
    constructor(private http: Http) {
    }

    getUser(): void {
        this.http.post("https://graph.facebook.com/v2.9/me/feed",
            {
                "access_token": AccountService.getToken(),
                "message": "this is a test"
            })
            .map(response => response.json())
            .subscribe(results => {
                console.log(results);
            });
    }
}