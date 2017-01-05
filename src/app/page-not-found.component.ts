import {Component} from "@angular/core";

@Component({
    selector: "page-not-found",
    template:`
    <h2>{{title}}</h2>
    <div>Page not found</div>
    `
})

export class PageNotFoundComponent {
    title = "404";
}