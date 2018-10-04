import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
	products: any;

  constructor( private data: DataService, private rest: RestApiService) { }
 images =[1,2,3,4,5];

 async ngOnInit() {
 	try{

 		const data = await this.rest.get(
            'http://localhost:3000/api/products'
 			);
 		data['success']
 		? (this.products = data['products'])
 		: this.data.error('Could not fetch products.');

 	}catch(error){
 		this.data.error(error['message']);
 	}
  }

}
