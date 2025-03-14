import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared.module';

/**
 * Searchbar component.
 */
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

  /**
   * Emit new value when it changes.
   */
  onValueChange() {
    this.valueChange.emit(this.value);
  }
}
