///<reference path="typings/index.d.ts"/>
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import "rxjs/Rx";

import {AppRouting} from "./app.routing";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {SearchComponent} from "./home/search.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {DealOfDayModule} from "./deal-of-day.module";
import {OfferModule} from "./offer.module";
import {SharedModule} from "./shared.module";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        PageNotFoundComponent],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        AppRouting,
        SharedModule,
        DealOfDayModule,
        OfferModule],
    bootstrap: [
        AppComponent]
})

export class AppModule {
}