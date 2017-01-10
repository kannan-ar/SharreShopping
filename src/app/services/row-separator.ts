import { Injectable, ViewContainerRef, ComponentFactoryResolver, Renderer } from "@angular/core";

import {RowSeparatorComponent} from "../views/row-separator.component";

@Injectable()
export class RowSeparator {
    count: number;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    init(): void {
        this.count = 0;
    }

    check(container: ViewContainerRef, renderer: Renderer): void {
        this.count += 1;

        if (this.count == 3) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RowSeparatorComponent);
            let rowSeparator = container.createComponent(componentFactory);
            rowSeparator.instance.isSmBlock = true;
        }
        else if (this.count == 4) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RowSeparatorComponent);
            let rowSeparator = container.createComponent(componentFactory);
            rowSeparator.instance.isMdBlock = true;
        }
        else if (this.count > 4) {
            this.count = 0;
        }
    }
}