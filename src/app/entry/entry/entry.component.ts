import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from './loginDTO';
import { WpxServicesService } from 'src/app/services/wpx-services.service';
import { GlobalConstant } from 'src/app/global/global-constant';


import { JwtHelperService } from '@auth0/angular-jwt';
import jsonNotaria from "../../../assets/json/notaria.json";



@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {


  public _isLoged = GlobalConstant._isLoged;


  loginDto: LoginDTO;

  isError = false;
  messageError = "";


  Notaria: any = jsonNotaria;
  _nameNotaria: string;
  _generalTitle: string;


  constructor(public router: Router,
    public services: WpxServicesService) { }


  preLogin() {
    GlobalConstant.nameNotaria = this.Notaria[0].Name;
    GlobalConstant.generalTitle = this.Notaria[0].GeneralTitle;
    GlobalConstant.apiURL = this.Notaria[0].api;

  }



  login() {

    const user = {
      user: this.loginDto.login,
      password: this.loginDto.password
    };

    this.services.login(user).subscribe(data => {
      sessionStorage.setItem('access_token', data.detail);
      this._isLoged = true;

      GlobalConstant._isLoged = true;
      GlobalConstant.userLogin = this.loginDto.login;

      let helper = new JwtHelperService();
      let decodedToken = helper.decodeToken(data.detail);

      let auxToken = decodedToken.data.split("#");

      GlobalConstant.nameLogin = auxToken[1];
      GlobalConstant.userLogin = auxToken[0];
      GlobalConstant.nameNotaria = this.Notaria[0].Name;

      GlobalConstant.typeUser = auxToken[2];
      GlobalConstant.areaUser = auxToken[4];

      this.router.navigate(["/home"]);


    }, error => {
      this.isError = true;
      console.error(error);
      this.messageError = error.status + " " + error.statusText;

    });



    

  }



  ngOnInit(): void {


    this.loginDto = new LoginDTO();
    this.preLogin();
    this._nameNotaria = GlobalConstant.nameNotaria;
    this._generalTitle = GlobalConstant.generalTitle;


    // let urlParam = window.location.search.substring(1);



  }

}
