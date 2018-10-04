import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

 
 searchTerm ='';
 isCollapsed =false;

 constructor(private router:Router,public data:DataService){
 	this.data.getProfile()
 }

 getToken(){
 	return localStorage.getItem('token');
 }
 collapse(){
 	this.isCollapsed =true;
 }

 closeDropdown(dropdown){
 	dropdown.close();
 }

 logout(){
 	this.data.user = {};
 	localStorage.clear();
 	this.router.navigate(['']);
 }

 search(){}
}