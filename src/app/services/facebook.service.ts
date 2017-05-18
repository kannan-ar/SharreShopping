import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import {AccountService} from "./account/account.service";
import {FacebookPost} from "../models/facebook-post";

@Injectable()
export class FacebookService {
    constructor(private http: Http) {
    }

    postProduct(post: FacebookPost): void {
        this.http.post("https://graph.facebook.com/v2.9/me/feed",
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