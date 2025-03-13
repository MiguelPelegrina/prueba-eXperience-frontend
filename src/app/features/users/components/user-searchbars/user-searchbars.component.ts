import { Component, EventEmitter, Output } from '@angular/core';
import { SearchbarComponent } from "../../../../core/components/searchbar/searchbar.component";
import { MaterialModule } from '../../../../core/material.module';
import { User } from '../../models/user';
import { UserQueryRequest } from '../../models/userQueryRequest';

@Component({
  selector: 'app-user-searchbars',
  imports: [MaterialModule, SearchbarComponent],
  templateUrl: './user-searchbars.component.html',
  styleUrl: './user-searchbars.component.css'
})
export class UserSearchbarsComponent {
  protected user: UserQueryRequest = {
    email: '',
    name: '',
    firstSurname: '',
    secondSurname: ''
  };

  @Output()
  public searchEmitter = new EventEmitter<Partial<User>>();

  updateUserField(field: keyof UserQueryRequest, value: any) {
    this.user[field] = value || undefined;  // Remove empty fields
  }

  search() {
    this.searchEmitter.emit(this.user);
  }
}
