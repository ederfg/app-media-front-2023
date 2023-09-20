import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/model/menu';
import { LoginService } from 'src/app/service/login.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  menus: Menu[];

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router:Router
  ){}

  ngOnInit(): void {
      this.menuService.getMenuChange().subscribe(data =>{
        this.menus = data

       // this.menus = this.menus.filter(  e=> e.idMenu!==12);
      } );
  }

  logout(){
    this.loginService.logout();
  }

  toInfoUser(){ 
    this.router.navigate(['/pages/user-info']);
  }
}
