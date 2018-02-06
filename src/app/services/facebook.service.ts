import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {AccountService} from "./account/account.service";
import {FacebookPost} from "../models/facebook-post";

@Injectable()
export class FacebookService {
    constructor(private httpClient: HttpClient) {
    }

    hasFacebookAuth(): boolean {
        return window.sessionStorage.getItem('AuthType') == "Facebook";
    }

    postProduct(post: FacebookPost): void {
        this.httpClient.post("https://graph.facebook.com/v2.9/me/feed",
            {
                "access_token": AccountService.getToken(),
                "message": post.message,
                "picture": post.picture,
                "link": post.link
            })
            .subscribe(id => {
            });
    }
}