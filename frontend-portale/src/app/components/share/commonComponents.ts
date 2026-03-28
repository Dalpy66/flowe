import { inject } from "@angular/core";
import { Router } from "@angular/router";

export class CommonComponents {
    private route: Router = inject(Router);
    
    constructor(){

    }

    protected onNavigate(page: string){
        this.route.navigateByUrl(page)
    }
}