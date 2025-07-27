import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './features/products/components/product-details/product-details.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  {path:'products',component:ProductListComponent,title:'Products'},
  {path:'product/:id',component:ProductDetailsComponent,title:'Details'},
  {path:'cart',component:CartComponent},
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'**',component:NotfoundComponent,title:'404'},

];
