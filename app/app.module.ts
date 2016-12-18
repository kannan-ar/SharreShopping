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
import {DealOfDayComponent} from "./home/deal-of-day.component";
import {PageNotFoundComponent} from "./page-not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        DealOfDayComponent,
        PageNotFoundComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        AppRouting
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {

}