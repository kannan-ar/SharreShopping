import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import { Http, Headers } from "@angular/http";
import Masonry from "masonry-layout";

import { AccountService } from "./account/account.service";

export interface IWishlistService {
    loadAll(container: ViewContainerRef, gridSelector: string, grid: Masonry): void;
}

@Injectable()
export class WishlistService {

    private servicePoints: IWishlistService[];

    constructor(
        @Inject('WishlistServices') private services,
        private http: Http) {
        this.servicePoints = new Array<IWishlistService>();

        this.services.forEach(service => {
            this.servicePoints.push(service);
        });
    }

    addWishlist(provider: string, id: string): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.post("/api/wishlist/add/" + provider + "/" + id, "", {
            headers: headers
        }).subscribe();
    }

    removeWishlist(provider: string, id: string): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.post("/api/wishlist/remove/" + provider + "/" + id, "", {
            headers: headers
        }).subscribe();
    }

    loadAll(container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        this.servicePoints.forEach(service => {
            service.loadAll(container, gridSelector, grid);
        });
    }
}