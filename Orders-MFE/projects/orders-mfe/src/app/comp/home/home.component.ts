import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { filter, from, Observable } from 'rxjs';

interface Order {
  orderNo: number;
  orderDate: string;
  orderedItem: string;
  orderedQuantity: number;
  customerName: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  customerNameFromHost = '';
  orders : Order[] = [];

  ordersList:Observable<any> = from([
    { orderNo: 101, orderDate: '2024-07-01', orderedItem: 'Laptop', orderedQuantity: 2, customerName: 'John Doe' },
    { orderNo: 102, orderDate: '2024-07-02', orderedItem: 'Mouse', orderedQuantity: 5, customerName: 'Jane Smith' },
    { orderNo: 103, orderDate: '2024-07-03', orderedItem: 'Keyboard', orderedQuantity: 3, customerName: 'Michael Johnson' },
    { orderNo: 104, orderDate: '2024-07-04', orderedItem: 'Monitor', orderedQuantity: 1, customerName: 'Emily Davis' },
  ]);

  ngOnInit(): void{
    this.getAllData();
    
    window.addEventListener('filter_table',(event:any) => {
      this.customerNameFromHost = event.detail.inputVal;
      this.orders = [];
      if(this.customerNameFromHost.length > 0){
        this.ordersList.pipe(filter(x => x.customerName.toLowerCase().includes(this.customerNameFromHost.toLowerCase()))).subscribe(res => {
          this.orders.push(res);
        });
      }else{
        this.getAllData();
      }
    });
    
  }

  getAllData(){
    this.ordersList.subscribe(res => {
      this.orders.push(res);
    });
  }
}
