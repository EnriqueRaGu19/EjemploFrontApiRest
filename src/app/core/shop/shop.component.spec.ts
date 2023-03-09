import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/services/shop/products/products.service';
import { infoInterface } from 'src/app/interfaces/info';

const info: infoInterface = {
  'name': "algo",
  'user': "algo"
}
const algo: {
  loadProducts: () => Observable<any>;
} = {
  loadProducts: () => of(info)
}

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopComponent ],
      imports: [
        HttpClientTestingModule,
        TableModule,
        DialogModule,
        InputNumberModule,
        InputTextModule,
        ConfirmDialogModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ProductsService, useValue: algo }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // xit('deberia llamar a la funcion del servicio loadProducts()', () => {
  //   const spy = spyOn(algo, 'loadProducts');
  //   spy.and.returnValue(of(info));
  //   component.loadProducts();
  //   expect(algo.loadProducts).toHaveBeenCalled();
  // });

});
