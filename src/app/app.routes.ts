import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ProductDetailsComponent } from './features/products/components/product-details/product-details.component';

export const routes: Routes = [
  {path:'products',component:ProductListComponent,title:'Products'},
  {path:'product/:id',component:ProductDetailsComponent,title:'Details'},
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'**',component:NotfoundComponent,title:'404'}

];
