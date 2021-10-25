import { RouterModule } from "@angular/router";
import { EntryComponent } from "./entry/entry/entry.component";
import { AuthGuard } from './guards/authGuards';
import { SearchComponent } from "./wpx/files/search/search.component";
import { HomeComponent } from "./wpx/home/home/home.component";
import { FueraprotocoloComponent } from "./wpx/invoices/fueraprotocolo/fueraprotocolo.component";


const appRoutes = [

    { path: "", component: EntryComponent, pathMatch: "full" },
    { path: "login", component: EntryComponent, pathMatch: "full" },
    { path: "entry", component: EntryComponent, pathMatch: "full" },
    {
        path: "home", canActivate: [AuthGuard], component: HomeComponent,
        children: [
            { path: "search", canActivate: [AuthGuard], component: SearchComponent },
            { path: "fueraprotocolo", canActivate: [AuthGuard], component: FueraprotocoloComponent}
        ]



    },

];
export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });