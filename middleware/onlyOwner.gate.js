import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const localePath = useLocalePath();

    const panelStore = usePanelStore();
    const userStore = useUserStore();

    // checking if user has access to the brand
    if (!Object.keys(userStore.brands.list).includes(to.params.id)) return navigateTo(localePath("/panel"));

    // if user is not owner the return
    if (userStore.brands.list[to.params.id].role != "owner") return navigateTo(localePath("/panel"));
});
