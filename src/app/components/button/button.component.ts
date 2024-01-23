import { Component } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  onClick(){
    console.log('child component button click');
    const parent=new ParentComponent();
    parent.parentClick();
  }
}
