import {Component, OnInit} from '@angular/core';
import {UserBillService} from '../../service/bill/user-bill.service';
import {OrdersAwaiting} from '../../interface/bill/orders-awaiting';

@Component({
  selector: 'app-management-list-order',
  templateUrl: './management-list-order.component.html',
  styleUrls: ['./management-list-order.component.css']
})
export class ManagementListOrderComponent implements OnInit {
  listOrder: OrdersAwaiting[];
  check = false;

  constructor(private userBillService: UserBillService) {
  }

  ngOnInit() {
    this.userBillService.listOrderProcessing().subscribe(next => {
      this.listOrder = next;
    }, error => {
      console.log(error);
    });
  }

  payAll(id: number, i: number) {
    this.userBillService.confirmPayment(id).subscribe(next => {
      this.check = true;
      this.listOrder.splice(i, 1);
    }, error => {
      this.check = false;
    });
  }
}
