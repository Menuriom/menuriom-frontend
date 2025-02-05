import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const localePath = useLocalePath();

    const panelStore = usePanelStore();
    const userStore = useUserStore();

    // checking if user has access to the brand
    if (!Object.keys(userStore.brands.list).includes(to.params.brandID)) return navigateTo(localePath("/panel"));

    // if user has access to the brand then set the brand
    panelStore.setSelectedBrand(to.params.brandID);

    // owner has access to all routes
    if (userStore.brands.list[to.params.brandID].role == "owner") return;

    // if the use is not owner then check permissions base on route
    const permissionsToCheck = getRoutePermissionList(to.matched, localePath);
    const userPermissions = userStore.brands.list[to.params.brandID].permissions;
    for (let i = 0; i < permissionsToCheck.length; i++) {
        if (!userPermissions.includes(permissionsToCheck[i])) return navigateTo(localePath("/panel"));
    }
});

const getRoutePermissionList = (routes, localePath) => {
    const routesPermissions = {
        // route : 'permission'
        [localePath("/panel/:brandID")]: ["main-panel"],
        // branches
        [localePath("/panel/:brandID/branches")]: ["main-panel.branches.view"],
        [localePath("/panel/:brandID/branches/:id")]: ["main-panel.branches.view", "main-panel.branches.edit"],
        [localePath("/panel/:brandID/branches/creation")]: ["main-panel.branches.add"],
        // menu
        [localePath("/panel/:brandID/menu/editor")]: ["main-panel.menu.items"],
        [localePath("/panel/:brandID/menu/category/:id")]: ["main-panel.menu.items"],
        [localePath("/panel/:brandID/menu/category/creation")]: ["main-panel.menu.items"],
        [localePath("/panel/:brandID/menu/item/:id")]: ["main-panel.menu.items"],
        [localePath("/panel/:brandID/menu/item/creation")]: ["main-panel.menu.items"],
        // staff
        [localePath("/panel/:brandID/staff/members")]: ["main-panel.staff.view"],
        [localePath("/panel/:brandID/staff/invite")]: ["main-panel.staff.view", "main-panel.staff.invite"],
        // staff roles
        [localePath("/panel/:brandID/staff/roles")]: ["main-panel.staff.roles"],
        [localePath("/panel/:brandID/staff/roles/creation")]: ["main-panel.staff.roles"],
        [localePath("/panel/:brandID/staff/roles/:id")]: ["main-panel.staff.roles"],
        // settings
        [localePath("/panel/:brandID/settings/languages")]: ["main-panel.settings"],
        // billing
        [localePath("/panel/:brandID/billing")]: ["main-panel.billing.access"],
        // ...
        // TODO : add to this list to keep route permission checking up to date
    };

    const neededPermissions = new Set();
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        neededPermissions.add(...routesPermissions[route]);
    }
    return neededPermissions;
};
