<style scoped>
.wrapper {
    height: 100vh;
    height: 100svh;
}

main {
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
    <div
        class="wrapper flex flex-col items-center w-screen max-w-screen-4xl mx-auto bg-neutral-50 overflow-clip"
        :class="{ 'blur-sm': panelStore.popUpOpened != '' }"
        id="app"
    >
        <Html :lang="localHead.htmlAttrs.lang" :dir="localHead.htmlAttrs.dir">
            <NuxtLoadingIndicator color="repeating-linear-gradient(to right, #9f74cd 0%, #7ecfe1 100%)" />
            <Header />
            <div class="relative flex w-full h-0 p-2 flex-grow">
                <SideMenu v-if="!dontShowMenu" />
                <!-- <SideMenuWhite v-if="!dontShowMenu" /> -->
                <main class="relative py-3 px-1 md:p-4 flex-grow max-h-full overflow-auto" :class="{ wide: !panelStore.sideMenuOpen }">
                    <slot />
                </main>
            </div>
        </Html>

        <Teleport to="body">
            <SentInvites v-if="panelStore.popUpOpened == 'sent-invites'" />
            <PersonalInfo v-if="panelStore.popUpOpened == 'personal-info'" />
            <SelectAccountType v-if="panelStore.popUpOpened == 'select-account-type'" />
            <CreateNewBrand v-if="panelStore.popUpOpened == 'create-new-brand'" />
            <FindYourTeam v-if="panelStore.popUpOpened == 'find-your-team'" />
            <BrandCreatedSuccess />
        </Teleport>
    </div>
</template>

<script setup>
import Header from "~/components/panel/Header.vue";
import Blob from "~/components/web/Blob.vue";
const SideMenu = defineAsyncComponent(() => import("~/components/panel/SideMenu.vue"));
const SideMenuWhite = defineAsyncComponent(() => import("~/components/panel/SideMenuWhite.vue"));
const SentInvites = defineAsyncComponent(() => import("~/components/panel/dialogs/staff/SentInvites.vue"));
const PersonalInfo = defineAsyncComponent(() => import("~/components/panel/dialogs/account-setup/PersonalInfo.vue"));
const CreateNewBrand = defineAsyncComponent(() => import("~/components/panel/dialogs/account-setup/CreateNewBrand.vue"));
const FindYourTeam = defineAsyncComponent(() => import("~/components/panel/dialogs/account-setup/FindYourTeam.vue"));
import SelectAccountType from "~/components/panel/dialogs/account-setup/SelectAccountType.vue";
import BrandCreatedSuccess from "~/components/panel/dialogs/account-setup/BrandCreatedSuccess.vue";
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";
import { storeToRefs } from "pinia";

const localHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });
useHead({
    // title: t("layouts.title"),
    link: [...localHead.value.link],
    meta: [...localHead.value.meta],
});

const route = useRoute();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();
const user = storeToRefs(userStore);

const dontShowMenu = computed(() => {
    for (let i = 0; i < route.matched.length; i++) if (route.matched[i].path == localePath("/panel/:brandID")) return false;
    return true;
});
const showPopUp = computed(() => {
    const paths = route.matched.map((x) => x.path);
    if (paths.includes(localePath("/panel/brand/creation")) || paths.includes(localePath("/panel/account"))) return false;
    return true;
});

if (userStore.name === "" || userStore.family === "" || userStore.mobile === "") panelStore.openPopUp("personal-info");
else if (Object.keys(user.brands.value.list).length == 0) {
    if (showPopUp.value) panelStore.openPopUp("select-account-type");
}

if (process.client) await userStore.refreshToken().catch((e) => {});

onMounted(() => {
    panelStore.loadSelectedBrand();
    userStore.setRefreshInterval();
});
</script>
