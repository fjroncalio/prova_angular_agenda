import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './pages/menu/menu.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'reset', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  {
    path: '',
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'contactlist',
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactListPageModule)
      },
      {
        path: 'contacteditor',
        loadChildren: () => import('./pages/contact-editor/contact-editor.module').then(m => m.ContactEditorPageModule),
      },
      {
        path: 'contacteditor/:id',
        loadChildren: () => import('./pages/contact-editor/contact-editor.module').then(m => m.ContactEditorPageModule),
      }

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
// { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
// {
//   path: '',
//   component: MenuPage,
//   canActivate: [AuthGuard],
//   children: [
//     {
//       path: '',
//       loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
//     },
//     {
//       path: 'cart',
//       loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
//     },
//     {
//       path: 'products/:product',
//       loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule),
//     }
//   ]
// },