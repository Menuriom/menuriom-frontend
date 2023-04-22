<style scoped>
main {
    overflow: hidden;
    width: 100%;
}

@media (min-width: 768px) {
    main {
        width: calc(100% - 275px);
    }
    main.wide {
        width: 100%;
    }
}
</style>

<template>
    <div class="flex flex-col items-center w-screen h-screen bg-neutral-50 overflow-clip" :class="{ 'blur-sm': panelStore.popUpOpened != '' }" id="app">
        <Html :lang="localHead.htmlAttrs.lang" :dir="localHead.htmlAttrs.dir">
            <NuxtLoadingIndicator />
            <Header />
            <div class="relative flex w-full h-0 p-2 flex-grow">
                <SideMenu />
                <main class="relative p-4 py-2 flex-grow max-h-full overflow-auto" :class="{ wide: !panelStore.sideMenuOpen }">
                    <slot />
                </main>
            </div>
        </Html>

        <Teleport to="body">
            <PersonalInfo />
            <SelectAccountType />
            <CreateNewBrand />
            <FindYourTeam />
        </Teleport>
    </div>
</template>

<script setup>
import Header from "~/components/user-panel/Header.vue";
import SideMenu from "~/components/user-panel/SideMenu.vue";
import PersonalInfo from "~/components/user-panel/dialogs/account-setup/PersonalInfo.vue";
import SelectAccountType from "~/components/user-panel/dialogs/account-setup/SelectAccountType.vue";
import CreateNewBrand from "~/components/user-panel/dialogs/account-setup/CreateNewBrand.vue";
import FindYourTeam from "~/components/user-panel/dialogs/account-setup/FindYourTeam.vue";
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";
import { storeToRefs } from "pinia";

const localHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });
useHead({
    // title: t("layouts.title"),
    link: [...localHead.value.link],
    meta: [...localHead.value.meta],
});

const panelStore = usePanelStore();
const userStore = useUserStore();
const user = storeToRefs(userStore);

if (userStore.name === "" || userStore.family === "" || userStore.mobile === "") panelStore.openPopUp("personal-info");
else if (Object.keys(user.brands.value.list).length == 0) panelStore.openPopUp("select-account-type");

onMounted(async () => {
    // if (user.name.value === "" || user.family.value === "") await userStore.getUserInfo();
    await userStore.refreshToken().catch((e) => {});
    userStore.setRefreshInterval();
});
</script>
