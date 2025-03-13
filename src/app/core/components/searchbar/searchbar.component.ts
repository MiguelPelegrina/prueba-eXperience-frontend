import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-searchbar',
  imports: [MaterialModule, SharedModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  // Fields
  @Input()
  placeholder: string = '';

  @Output()
  valueChange = new EventEmitter<string>();

  protected value: string = '';

  onValueChange() {
    this.valueChange.emit(this.value);
  }
}
