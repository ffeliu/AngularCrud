import { Component, OnInit } from '@angular/core';
import { IProduct } from './../product.model';
import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product : IProduct;   

  constructor(private prodService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

  const id = this.route.snapshot.paramMap.get('id');

  this.prodService.getById(id).subscribe((product) => {
      this.product = product;
    });
  }

  cancel() : void {
    this.router.navigate(['/products']);
  }  
  
  updateProduct() : void {
    this.prodService.updateProduct(this.product).subscribe(() => {
      this.prodService.showMessage("Produto atualizado com sucesso");
      this.router.navigate(['/products']);
    });

    
  }  

}
