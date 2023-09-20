import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  infoUser:any={};

    ngOnInit(): void {

      const token = sessionStorage.getItem(environment.TOKEN_NAME);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);  
      this.infoUser.user=  decodedToken.sub
      this.infoUser.role =decodedToken.role; 
    }



  
}
