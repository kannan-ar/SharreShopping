import { Http, Headers } from "@angular/http";
import { Injectable, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from "@angular/core";

import {AccountService} from "../account/account.service";
import {IWishlistService} from "../wishlist.service";
import {FlipkartProductComponent} from "../../views/flipkart/flipkart-product.component";
import {ContainerDistributionService} from "../container-distribution.service";

@Injectable()
export class FlipkartWishlistService implements IWishlistService {

    private componentFactory: ComponentFactory<FlipkartProductComponent>;
    private containerService: ContainerDistributionService;

    constructor(
        private http: Http,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(FlipkartProductComponent);
    }

    loadItem(id: string, container: ViewContainerRef): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());

        this.http.get("/api/wishlist/flipkart/" + id, {
            headers: headers
        }).map(response => response.json())
            .subscribe(product => {
                let flipkartComponent = container.createComponent(this.componentFactory);
                flipkartComponent.instance.item = product;
            });
    }

    loadWishlist(ids: string[], rowCount: number): void {
        ids.forEach(id => {
            this.loadItem(id, this.containerService.getNext());
        });
    }

    loadAll(containers: ViewContainerRef[], rowCount: number): void {
        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + AccountService.getToken());
        this.containerService = new ContainerDistributionService(containers);

        this.http.get("/api/wishlist/flipkart", {
            headers: headers
        }).map(response => response.json())
            .subscribe(results => {
                this.loadWishlist(results, rowCount);
           });
    }
}