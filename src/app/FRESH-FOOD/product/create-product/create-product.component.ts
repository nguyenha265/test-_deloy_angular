import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductServiceService} from '../../service/product/product-service.service';
import {Product} from '../../interface/product/product';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Picture} from '../../interface/product/picture';
import {Provider} from '../../interface/product/provider';
import {Category} from '../../interface/product/category';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product: Product;
  createProductForm: FormGroup;
  check = '';
  picture: Picture;
  arrayPicture = [];
  providers: Provider[];
  listCategory: Category[];
  provider: Provider;
  category: Category;


  constructor(private http: HttpClient, private fb: FormBuilder,
              private productService: ProductServiceService,
              private db: AngularFireDatabase,
              private  router: Router) {
  }

  ngOnInit() {
    this.productService.listCategory().subscribe(next => {
      this.listCategory = next;
    }, error => {
      console.log(error);
    });
    this.productService.listProvider().subscribe(next => {
      this.providers = next;
    }, error => {
      console.log(error);
    });
    this.createProductForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      origin: ['', Validators.required],
      category: ['', [Validators.required]],
      provider: ['', [Validators.required]],
    });
  }


  uploadFile(event) {
    const file = event.target.files;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.picture = {name: downloadURL};
          this.arrayPicture.push(this.picture);
        });
      }
    );
  }

  transferFormDataToProduct() {
    this.product = {
      name: this.createProductForm.get('name').value,
      category: this.category = {id: this.createProductForm.get('category').value},
      amount: this.createProductForm.get('amount').value,
      picture: this.arrayPicture,
      description: this.createProductForm.get('description').value,
      price: this.createProductForm.get('price').value,
      origin: this.createProductForm.get('origin').value,
      provider: this.provider = {id: this.createProductForm.get('provider').value},
      status: true,
    };
  }

  onSubmit() {
    if (this.createProductForm.valid && this.arrayPicture.length === 3) {
      this.transferFormDataToProduct();
      this.productService.createProduct(this.product).subscribe(next => {
          this.router.navigate(['productManagement/listProduct']);
        },
        error => {
          this.check = 'false';
        });
    }
  }
}
