import {Component, OnInit} from '@angular/core';
import {ItemService} from '../services';
import {IItem} from '../interfaces/item.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  items:IItem[];
  item:IItem;
  form:FormGroup;
  formUpdate:FormGroup;

  constructor(private itemService: ItemService){

  }
  ngOnInit(): void{
      this.form= new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      shop_name : new FormControl('')
    })
    this.formUpdate= new FormGroup({
      Newprice: new FormControl(''),

    })
    this.itemService.getAll().subscribe(value => this.items=value);
  }

  save(form:FormGroup): void {
     this.itemService.create(form.getRawValue()).subscribe(()=> this.ngOnInit());
  }

  del(id:number): void {
    this.itemService.delete(id).subscribe( () => this.ngOnInit());
  }

  update(id:number,formUpdate: FormGroup):void {
    console.log(this.formUpdate.controls.Newprice.value)
    console.log(id)
    this.itemService.getItem(id,this.formUpdate.controls.Newprice.value).subscribe( ()=> this.ngOnInit());
    }


}
