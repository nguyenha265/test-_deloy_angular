import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../FRESH-FOOD/interface/product/product';
import {UserBillService} from '../../FRESH-FOOD/service/bill/user-bill.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(private billService: UserBillService) {
  }

  ngOnInit() {
  }


}
