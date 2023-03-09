import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/shop/products/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [ConfirmationService]
})
export class ShopComponent {

  products:any = [];
  displayDialogProduct:boolean = false;
  formGroup!: FormGroup;
  isEdit:string = '';

  constructor(private productService: ProductsService, 
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
    this.loadProducts();
  }

  loadProducts(){
    this.productService.loadProducts().subscribe( data => {
      this.products = data;
    });
  }

  showDialogProduct(product:any, edit:string = '' || 'edit' || 'create') {
    this.isEdit = edit;
    edit? this.formGroup.enable() : this.formGroup.disable()
    this.formGroup.patchValue({ id:product.id, name: product.name, description: product.description, quantity: product.quantity});
    this.displayDialogProduct = true;
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      id:["",
      ],
      name: ["",
        [ Validators.required]
      ],
      description: ["",
        [ Validators.required]
      ],
      quantity: ["",
        [ Validators.required]
      ],
    });
  }

  save(isEdit:string) {
    if (isEdit === 'edit') {
      this.productService.editProduct(this.formGroup.value).then( ()=> {
        this.loadProducts();
        this.displayDialogProduct = false;
      });
    } else if (isEdit === 'create') {
      const body =  {name:this.formGroup.value.name, description: this.formGroup.value.description, quantity:this.formGroup.value.quantity};
      this.productService.createProduct(body).then( ()=> {
        this.loadProducts();
        this.displayDialogProduct = false;
      });
    }
  }

  confirm(id:number) {
    this.confirmationService.confirm({
        message: 'Seguro que quiere eliminar?',
        accept: () => {
            this.deleteProduct(id);
        }
    });
  }

  deleteProduct(id:number) {
    this.productService.deleteProduct(id).then( ()=> {
      this.loadProducts();
      this.displayDialogProduct = false;
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get() {
    this.productService.getInfo().subscribe( data => {
      console.log(data);
    })
  }
}