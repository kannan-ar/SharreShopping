import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

@Injectable()
export class WishlistService {
    constructor(
        private http: Http
    ) { }

    addWishlist(provider: string, id: string): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + window.sessionStorage.getItem('SSToken'));

        this.http.post("/api/wishlist/add/" + provider + "/" + id, "", {
            headers: headers
        }).subscribe();
    }
}