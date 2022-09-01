import { Component, OnInit } from '@angular/core';
import { ProductService } from './productservice';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  products: Product[];

  cols: any[];
  originals: any[];
  difference: any[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'category', header: 'Category' },
    ];
    this.originals = [...this.cols]; 
    this.reloadDiff();
  }

  public myFilter(event: any) {
    this.cols = event.columns;
    console.log(event.columns);
    for (let col of event.columns) {
      console.log('col:' + col.field);
    }
  }

  public reloadDiff(){
      console.log('originals:'+this.originals);
      console.log('cols:'+ this.cols);
      this.difference = this.originals.filter(x => this.cols.indexOf(x) === -1);
  }

  public remove(i: number) {
    this.cols.splice(i, 1);
    this.reloadDiff();
    console.log(this.difference);
  }
  public add(i: number) {
    console.log('add: '+this.difference[i])
    this.cols.push(this.difference[i]);
    this.reloadDiff();
  }
}
