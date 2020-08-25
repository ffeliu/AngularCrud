import { IProduct } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {


  product : IProduct = { 
    name: '',
    price: null
  };

  constructor(private prodService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  createProduct() : void {

    this.prodService.createProduct(this.product).subscribe(
      () => {
        this.prodService.showMessage('Produto criado');
        this.router.navigate(['/products']);
      }
    );
  }

  cancel() : void {
    this.router.navigate(['/products']);
  }  

}
