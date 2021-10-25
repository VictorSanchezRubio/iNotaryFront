import { FormControl } from "@angular/forms";

export class GlobalConstant {

    public static apiURL: string =  "http://inotaryapi8.local:8288"; // "http://inotaryapi8.local:8288"; 

    public static _isLoged = false;
    public static _isAdmin = false;

    public static nameLogin = "";
    public static userLogin = "";

    public static nameNotaria = "";
    public static generalTitle = "";


    public static navLinks: any[]=[];
    public static activeLinkIndex = -1; 
    public static index = 0;

    public static typeUser = "";
    public static areaUser = "";

    public static selected = new FormControl(0);

}
