import { Component, EventEmitter, Output } from '@angular/core';
import { SearchbarComponent } from "../../../../core/components/searchbar/searchbar.component";
import { MaterialModule } from '../../../../core/material.module';
import { User } from '../../models/user';
import { UserQueryRequest } from '../../models/userQueryRequest';

/**
 * User searchbars component.
 */
@Component({
  selector: 'app-user-searchbars',
  imports: [MaterialModule, SearchbarComponent],
  templateUrl: './user-searchbars.component.html',
  styleUrl: './user-searchbars.component.css'
})
export class UserSearchbarsComponent {
  // Fields
  @Output()
  public searchEmitter = new EventEmitter<Partial<User>>();

  protected user: UserQueryRequest = {
    email: '',
    name: '',
    firstSurname: '',
    secondSurname: ''
  };

  /**
   * Update user field.
   * @param field - Field to update.
   * @param value - New value.
   */
  updateUserField(field: keyof UserQueryRequest, value: any) {
    this.user[field] = value || undefined;  // Remove empty fields
  }

  /**
   * Emits the search event.
   */
  search() {
    this.searchEmitter.emit(this.user);
  }
}
