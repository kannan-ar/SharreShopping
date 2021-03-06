import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
//import "rxjs";

import {AppRouting} from "./app.routing";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {DealOfDayModule} from "./deal-of-day.module";
import {OfferModule} from "./offer.module";
import {ProductModule} from "./product.module";
import {AccountModule} from "./account.module";
import {SettingsModule} from "./settings.module";
import {SharedModule} from "./shared.module";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RouterModule,
        FormsModule,
        AppRouting,
        SharedModule,
        SettingsModule,
        DealOfDayModule,
        OfferModule,
        ProductModule,
        AccountModule],
    bootstrap: [
        AppComponent]
})

export class AppModule {
}