import { Injectable, Inject, ViewContainerRef } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
        private httpClient: HttpClient) {
        this.servicePoints = new Array<IWishlistService>();

        this.services.forEach(service => {
            this.servicePoints.push(service);
        });
    }

    addWishlist(provider: string, id: string): void {
        this.httpClient.post("/api/wishlist/add/" + provider + "/" + id, "").subscribe();
    }

    removeWishlist(provider: string, id: string): void {
        this.httpClient.post("/api/wishlist/remove/" + provider + "/" + id, "").subscribe();
    }

    loadAll(container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        this.servicePoints.forEach(service => {
            service.loadAll(container, gridSelector, grid);
        });
    }
}