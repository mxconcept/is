import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})

export class StorageComponent implements OnInit {
  products!: { [key: string]: number };
  productForm = this.fb.group({
    name: ['', Validators.required],
    num: [0, Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.products = {
      'Червона риба 1 кг': 2,
      'Яловичина 1 кг': 3,
      'Молоко 1 л': 6,
      'Яйця 50 шт': 2,
      'Рис 1 кг': 5,
      'Помідори 1 кг': 6,
      'Вино La vino 1 л': 1,
      'Вино Chаteau dYquem 1 л': 2,
      'Вино Chateau Lafite 1 л': 2
    };
  }

  addProduct() {
    if (this.productForm.valid) {
      const name = this.productForm.get('name')?.value;
      const num = this.productForm.get('num')?.value;
      if (name && num) {
        this.products[name] = num;
        this.productForm.reset();
      }
    }
  }

  deleteProduct(productName: string) {
    delete this.products[productName];
  }
}