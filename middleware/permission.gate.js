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

    // TODO : check for brands plan limitations and allow routes base on them

    // owner has access to all routes
    if (userStore.brands.list[to.params.brandID].role == "owner") return;

    const permissionsToCheck = getRoutePermissionList(to.matched, localePath);
    const userPermissions = userStore.brands.list[to.params.brandID].permissions;
    for (let i = 0; i < permissionsToCheck.length; i++) {
        if (!userPermissions.includes(permissionsToCheck[i])) return navigateTo(from.fullPath);
    }
});

const getRoutePermissionList = (routes, localePath) => {
    routesPermissions = {
        // route : 'permission'
        [localePath("/panel/")]: "",
        [localePath("/panel/:brandID")]: "",
        [localePath("/panel/:brandID/branches")]: "",
        [localePath("/panel/:brandID/branches/:id")]: "",
        [localePath("/panel/:brandID/branches/creation")]: "",
        [localePath("/panel/:brandID/languages")]: "",
        // ...
        // TODO : add to this list to keep route permission checking up to date
    };

    neededPermission = [];
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        neededPermission.push(routesPermissions[route]);
    }
    return neededPermission;
};
