import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';


interface Customer {
  customerID: number;
  customerName: string;
  city: string;
  mobileNumber: string;
  email: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cityFromHost = '';
  customers : Customer[] = [];

  customersList:Observable<any> = from([
    { customerID: 1, customerName: 'John Doe', city: 'New York', mobileNumber: '123-456-7890', email: 'john.doe@example.com' },
    { customerID: 2, customerName: 'Jane Smith', city: 'Los Angeles', mobileNumber: '098-765-4321', email: 'jane.smith@example.com' },
    { customerID: 3, customerName: 'Michael Johnson', city: 'Chicago', mobileNumber: '555-555-5555', email: 'michael.johnson@example.com' },
    { customerID: 4, customerName: 'Emily Davis', city: 'Houston', mobileNumber: '444-444-4444', email: 'emily.davis@example.com' },
  ]);

  ngOnInit(): void{
    this.getAllData();
    window.addEventListener('filter_table',(event:any) => {
      this.customers = [];
      this.cityFromHost = event.detail.inputVal;
      if(this.cityFromHost.length > 0){
        this.customersList.pipe(filter(x => x.city.toLowerCase().includes(this.cityFromHost.toLowerCase()))).subscribe(res => {
          this.customers.push(res);
        });
      }else{
        this.getAllData();
      }
    });
  }

  getAllData(){
    this.customersList.subscribe(res => {
      this.customers.push(res);
    });
  }
  
  getOrders(customerName : string){
    const event = new CustomEvent('filter_ordersByName',{
      detail:{
        custName: customerName
      }
    });

    window.dispatchEvent(event);
  }
}
