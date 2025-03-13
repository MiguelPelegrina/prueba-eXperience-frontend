import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../core/material.module';
import { User } from '../../models/user';
import { UserSearchbarsComponent } from "../user-searchbars/user-searchbars.component";
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { SharedModule } from '../../../../core/shared.module';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, merge, startWith, switchMap } from 'rxjs';

// TODO
// - Implement sorting
@Component({
  selector: 'app-users-list',
  imports: [MaterialModule, SharedModule, UserSearchbarsComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements AfterViewInit{
  // Subcomponents
  @ViewChild(MatPaginator)
  protected paginator!: MatPaginator;

  @ViewChild(UserSearchbarsComponent)
  protected searchbars!: UserSearchbarsComponent;

  // Fields
  protected users$: Observable<User[]> = new Observable<User[]>();
  protected isLoading = false;
  protected searchQuery: Partial<User> = {};

  protected columnsToDisplay: string [] = ['email', 'name', 'firstSurname', 'secondSurname'];
  protected dataLength = 0;
  protected dataPage = 0
  protected dataPageSize = 5;
  protected dataPageSizeOptions = [5, 10, 25, 100];
  protected userPage?: PageEvent;

  // Constructor
  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.loadUsers();
  }

  onSearch(query: Partial<User>) {
    this.searchQuery = query;
    this.loadUsers();
  }

  private loadUsers() {
    this.users$ = merge(
      this.paginator.page
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoading = true;

        this.dataPage = this.paginator.pageIndex;

        this.dataPageSize = this.paginator.pageSize;

        return this.userService.getUsersByQuery({
          ...this.searchQuery,  // Include search query
          page: this.paginator.pageIndex,
          limit: this.paginator.pageSize
        });
      }),
      map(response => {
        this.isLoading = false;
        if (!response) {
          return [];
        }

        this.dataLength = response.totalResults;
        this.dataPage = response.currentPage;

        return response.data;
      })
    );
  }
}
