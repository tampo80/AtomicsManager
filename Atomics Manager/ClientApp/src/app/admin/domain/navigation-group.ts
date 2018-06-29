import { NavigationItem } from "./navigation-item";
import { NavigationPermissions } from "./navigation-permissions";

export interface NavigationGroup {
    icon: string;
    name: string;
    items: NavigationItem[];
    permissions:NavigationPermissions[];
}