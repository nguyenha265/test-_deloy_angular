import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './FRESH-FOOD/user/create-user/create-user.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { LoginUserComponent } from './FRESH-FOOD/user/login-user/login-user.component';
import { DetailsUserComponent } from './FRESH-FOOD/user/details-user/details-user.component';
import { UpdateUserComponent } from './FRESH-FOOD/user/update-user/update-user.component';
import { UpdatePasswordComponent } from './FRESH-FOOD/user/update-password/update-password.component';
import { HomeUserComponent } from './FRESH-FOOD/user/home-user/home-user.component';
import { environment } from '../environments/environment';
import { CreateProductComponent } from './FRESH-FOOD/product/create-product/create-product.component';
import { ListProductComponent } from './FRESH-FOOD/product/list-product/list-product.component';
import { ProductManagementComponent } from './FRESH-FOOD/admin/product-management/product-management.component';
import { ManagementListProductComponent } from './FRESH-FOOD/admin/management-list-product/management-list-product.component';
import { UpdateProductComponent } from './FRESH-FOOD/product/update-product/update-product.component';
import { DeleteProductComponent } from './FRESH-FOOD/product/delete-product/delete-product.component';
import { DetailProductComponent } from './FRESH-FOOD/product/detail-product/detail-product.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CookieService} from 'ngx-cookie-service';
import {ContentComponent} from './header/content/content.component';
import {SearchComponent} from './header/search/search.component';
import { BuyNowComponent } from './FRESH-FOOD/shopping/buy-now/buy-now.component';
import { ShopCartComponent } from './FRESH-FOOD/shopping/shop-cart/shop-cart.component';
import { ManagementListOrderComponent } from './FRESH-FOOD/admin/management-list-order/management-list-order.component';
import { CreateCategoryComponent } from './FRESH-FOOD/category/create-category/create-category.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginUserComponent,
    DetailsUserComponent,
    UpdateUserComponent,
    UpdatePasswordComponent,
    HomeUserComponent,
    CreateProductComponent,
    ListProductComponent,
    ProductManagementComponent,
    ManagementListProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    DetailProductComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    SearchComponent,
    BuyNowComponent,
    ShopCartComponent,
    ManagementListOrderComponent,
    CreateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
