import { IProduct } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products : IProduct[];

  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private prodService : ProductService) { }

  ngOnInit(): void {
    this.prodService.getProducts().subscribe( products => {
      this.products = products;
    })
  }
}
