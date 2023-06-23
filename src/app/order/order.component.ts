import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  products: { [key: string]: number } = {
    'Червона риба 1 кг': 600,
    'Яловичина 1 кг': 150,
    'Молоко 1 л': 50,
    'Яйця 50 шт': 300,
    'Рис 1 кг': 80,
    'Помідори 1 кг': 40,
    'Вино La vino 1 л': 800,
    'Вино Chаteau dYquem 1 л': 700,
    'Вино Chateau Lafite 1 л': 900
  };

  productNames = Object.keys(this.products); 

  shoppingCart: { product: string; quantity: number }[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      const item = { product: formData.productName, quantity: formData.quantity };
      this.shoppingCart.push(item);
      this.orderForm.reset();
    }
  }

  removeFromCart(index: number) {
    this.shoppingCart.splice(index, 1);
  }

  calculatePrice(product: string, quantity: number): number {
    return this.products[product] * quantity;
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (let item of this.shoppingCart) {
      total += this.calculatePrice(item.product, item.quantity);
    }
    return total;
  }
}
