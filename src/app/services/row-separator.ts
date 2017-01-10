import { Injectable, ViewContainerRef, ComponentFactoryResolver, Renderer } from "@angular/core";

import {RowSeparatorComponent} from "../views/row-separator.component";

@Injectable()
export class RowSeparator {
    smCount: number;
    mdCount: number;
    lgCount: number;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    init(): void {
        this.smCount = 0;
        this.mdCount = 0;
        this.lgCount = 0;
    }

    check(container: ViewContainerRef, renderer: Renderer): void {
        this.smCount += 1;
        this.mdCount += 1;
        this.lgCount += 1;

        if (this.smCount == 3) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RowSeparatorComponent);
            let rowSeparator = container.createComponent(componentFactory);
            rowSeparator.instance.isSmBlock = true;

            this.smCount = 0;
        }

        if (this.mdCount == 4) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RowSeparatorComponent);
            let rowSeparator = container.createComponent(componentFactory);

            rowSeparator.instance.isMdBlock = true;

            this.mdCount = 0;
        }

        if (this.lgCount == 6) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RowSeparatorComponent);
            let rowSeparator = container.createComponent(componentFactory);

            rowSeparator.instance.isLgBlock = true;

            this.lgCount = 0;
        }
    }
}