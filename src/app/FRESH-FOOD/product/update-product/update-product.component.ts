import {Component, OnInit} from '@angular/core';
import {Product} from '../../interface/product/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Picture} from '../../interface/product/picture';
import {Provider} from '../../interface/product/provider';
import {Category} from '../../interface/product/category';
import {HttpClient} from '@angular/common/http';
import {ProductServiceService} from '../../service/product/product-service.service';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: Product;
  updateProductForm: FormGroup;
  check = '';
  picture: Picture;
  arrayPicture = [];
  providers: Provider[];
  listCategory: Category[];
  provider: Provider;
  category: Category;
  sub: Subscription;


  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private productService: ProductServiceService,
              private activatedRoute: ActivatedRoute,
              private db: AngularFireDatabase,
              private  router: Router) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.productService.detailProduct(id).subscribe(next => {
        this.product = next;
      }, error => {
        console.log(error);
      });
    });
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
    this.updateProductForm = this.fb.group({
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
          this.picture = {id: this.product.picture[0].id++, name: downloadURL};
          this.arrayPicture.push(this.picture);
        });
      }
    );
  }

  transferFormDataToProduct() {
    this.product = {
      id: this.product.id,
      name: this.updateProductForm.get('name').value,
      category: this.category = {id: this.updateProductForm.get('category').value},
      amount: this.updateProductForm.get('amount').value,
      picture: this.arrayPicture,
      description: this.updateProductForm.get('description').value,
      price: this.updateProductForm.get('price').value,
      origin: this.updateProductForm.get('origin').value,
      provider: this.provider = {id: this.updateProductForm.get('provider').value},
      status: true,
    };
  }

  onSubmit() {
    if (this.updateProductForm.valid && this.arrayPicture.length === 3) {
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
