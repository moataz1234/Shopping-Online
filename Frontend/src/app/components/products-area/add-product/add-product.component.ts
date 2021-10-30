import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    public product = new ProductModel();
    public categories: CategoryModel[];
    constructor(private myProductsService: ProductsService, private myRouter: Router, private notify: NotifyService) { }

    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public setImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    async ngOnInit() {
        try {
            this.categories = await this.myProductsService.getAllCategoriesAsync();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
 
    public async add() {
        try {
            await this.myProductsService.addProductAsync(this.product);
            IncompleteGuard.canLeave = true;
            this.notify.success("Product added");
            this.myRouter.navigateByUrl("/products");
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

}
