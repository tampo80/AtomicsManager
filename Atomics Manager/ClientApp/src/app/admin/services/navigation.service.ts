import { Injectable } from '@angular/core';
import { NavigationGroup, NavigationItem } from '../domain';
import { NAVIGATION_MENU_DATA } from '../config';
import { UserService } from './user.service';
import { Permission, PermissionValues } from '../models/permission.model';
import { DbKeyService } from './db-key.service';

@Injectable()
export class NavigationService {

  public navigationList: NavigationGroup[];
  public  currentnavigationList: NavigationGroup[];
  public permissions: string[] = [];
  public selectedNavigationItem: NavigationItem;
  private selectedNavigationGroup: NavigationGroup;

  constructor(public userService: UserService) {
    this.navigationList = NAVIGATION_MENU_DATA;
    this.currentnavigationList = [];
    this.permissions = userService.currentUserPermissions;
  }
  public  currentUserPermissions (): string[] {
    let permissionValues = [];
    const stored = localStorage.getItem(DbKeyService.USER_PERMISSIONS);
    if (stored != null) {
      permissionValues = <string[]>JSON.parse(stored);
    }
     permissionValues = permissionValues.filter(x => x != null) as string[];
    return permissionValues;
  }

  public getNavigationList(): NavigationGroup[] {
    this.permissions = this.currentUserPermissions();
    if (this.permissions == null) {
      this.permissions = [];
    }
    this.navigationList = [];
    this.currentnavigationList = [];
    this.navigationList = NAVIGATION_MENU_DATA;

    this.navigationList.forEach((g) => {
    const permission = this.permissions.find(e => e === g.permissions[0].name);
    console.log(NAVIGATION_MENU_DATA);
    console.log(permission);
    if (g.permissions[0].value === true) {
      this.currentnavigationList.push(g);
    }
      if (permission !== undefined ) {

        this.currentnavigationList.push(g);
      }

    });
     console.log(this.currentnavigationList);
     console.log(this.permissions);
     console.log(this.navigationList);
    return this.currentnavigationList;
  }

  public updateSelectedNavigationGroup() {
    // var result: NavigationGroup;
    this.navigationList.forEach((g) => {
      g.items.forEach((i) => {
        if (this.selectedNavigationItem.name === i.name) {
          // console.log("Found group: " + g.name)
          this.selectedNavigationGroup = g;
        }
      });
    });
  }

}
