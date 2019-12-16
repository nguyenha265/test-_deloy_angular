import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUserComponent} from './FRESH-FOOD/user/create-user/create-user.component';
import {LoginUserComponent} from './FRESH-FOOD/user/login-user/login-user.component';
import {AppComponent} from './app.component';
import {DetailsUserComponent} from './FRESH-FOOD/user/details-user/details-user.component';
import {UpdateUserComponent} from './FRESH-FOOD/user/update-user/update-user.component';
import {UpdatePasswordComponent} from './FRESH-FOOD/user/update-password/update-password.component';
import {HomeUserComponent} from './FRESH-FOOD/user/home-user/home-user.component';
import {CreateProductComponent} from './FRESH-FOOD/product/create-product/create-product.component';
import {ListProductComponent} from './FRESH-FOOD/product/list-product/list-product.component';
import {ProductManagementComponent} from './FRESH-FOOD/admin/product-management/product-management.component';
import {ManagementListProductComponent} from './FRESH-FOOD/admin/management-list-product/management-list-product.component';
import {UpdateProductComponent} from './FRESH-FOOD/product/update-product/update-product.component';
import {DeleteProductComponent} from './FRESH-FOOD/product/delete-product/delete-product.component';
import {DetailProductComponent} from './FRESH-FOOD/product/detail-product/detail-product.component';
import {BuyNowComponent} from './FRESH-FOOD/shopping/buy-now/buy-now.component';
import {ShopCartComponent} from './FRESH-FOOD/shopping/shop-cart/shop-cart.component';
import {ManagementListOrderComponent} from './FRESH-FOOD/admin/management-list-order/management-list-order.component';


const routes: Routes = [
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: 'home/auth/login',
    component: LoginUserComponent
  },
  {
    path: 'login',
    component: LoginUserComponent
  },
  {
    path: 'register',
    component: CreateUserComponent
  },
  {
    path: 'auth/login/registered',
    component: CreateUserComponent
  },
  {
    path: 'homeUser',
    component: HomeUserComponent,
    children: [{
      path: 'userUpdate',
      component: UpdateUserComponent
    }, {
      path: 'updatePassword',
      component: UpdatePasswordComponent
    }, {
      path: 'userDetails',
      component: DetailsUserComponent
    }]
  },
  {
    path: 'listProduct',
    component: ListProductComponent,
  }, {
    path: 'listProduct/detailProduct/:id',
    component: DetailProductComponent
  },
  {
    path: 'productManagement',
    component: ProductManagementComponent,
    children: [
      {
        path: 'createProduct',
        component: CreateProductComponent
      },
      {
        path: 'listProduct',
        component: ManagementListProductComponent
      },
      {
        path: 'listProduct/updateProduct/:id',
        component: UpdateProductComponent
      },
      {
        path: 'listProduct/deleteProduct/:id',
        component: DeleteProductComponent
      },
    ]
  },
  {
    path: 'listProduct/pay/:id',
    component: BuyNowComponent
  },
  {
    path: 'listProduct/shopCart',
    component: ShopCartComponent
  },
  {
    path: 'shopCart/listProduct',
    component: ListProductComponent
  },
  {
    path: 'listOrder',
    component: ManagementListOrderComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
