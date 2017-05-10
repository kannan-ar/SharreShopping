import { Http, Headers } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import {IWishlistService} from "../wishlist.service";
import {AccountService} from "../account/account.service";
import {AmazonProduct} from "../../models/amazon/amazon-product";
import {AmazonWishlistComponent} from "../../views/amazon/amazon-wishlist.component";

@Injectable()
export class AmazonWishlistService implements IWishlistService {
    private componentFactory: ComponentFactory<AmazonWishlistComponent>;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(AmazonWishlistComponent);
    }

    loadWishlist(results: AmazonProduct[], container: ViewContainerRef, gridSelector: string, grid: Masonry) {
        let index: number = 0;

        while (index < results.length) {
            const model: AmazonProduct = results[index];
            let amazonComponent = container.createComponent(this.componentFactory);
            amazonComponent.instance.item = model;

            grid.appended(amazonComponent.location.nativeElement);
            imagesLoaded(gridSelector, function () {
                grid.layout();
            });

            ++index;
        }
    }

    loadAll(container: ViewContainerRef, gridSelector: string, grid: Masonry): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/amazon", {
            headers: headers
        }).map(response => response.json())
            .subscribe(results => {
                this.loadWishlist(results, container, gridSelector, grid);
            });
    }
}