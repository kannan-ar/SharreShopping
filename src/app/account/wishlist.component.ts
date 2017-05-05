import {Component, ViewContainerRef, ViewChild, OnInit} from "@angular/core"
import Masonry from "masonry-layout";

import {WishlistService} from "../services/wishlist.service";

@Component({
    selector: 'wishlist',
    template: `
        <div class="row">
            <div class="col-sm-12">
                <div class="wishlist-header">
                    <h4>Wishlist Items</h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="grid">
                <template #container></template>
            </div>
        </div>
    `,
    styles: [`
        .wishlist-header {
            background-color: #14819C;
            padding: 1px 10px 1px 20px;
        }

        .wishlist-header h4 {
            margin-top: 5px;
            margin-bottom: 5px;
        }
    `]
})

export class WishlistComponent {
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(private wishlistService: WishlistService) {
    }
    
    ngOnInit() {
        this.wishlistService.loadAll(this.container);

        new Masonry('.grid', {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
    }
}