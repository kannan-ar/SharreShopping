import {NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";

import {ImageHolderComponent} from "./shared/image-holder.component";

@NgModule({
        imports: [CommonModule],
        declarations: [ImageHolderComponent],
        exports: [ImageHolderComponent]
})

export class SharedModule {
}