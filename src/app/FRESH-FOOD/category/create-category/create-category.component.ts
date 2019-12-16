import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/Category/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
  }

  createCategory() {
  }
}
