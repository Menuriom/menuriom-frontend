<style scoped>
header {
    width: calc(100% - 1rem);
}

.toggle {
    /* width: 2.75rem;
    height: 2.75rem; */
}

.toggle div {
    gap: 5px;
}
.toggle span {
    height: 3px;
}
</style>

<template>
    <header class="flex items-center justify-between gap-3 rounded-2xl mt-2 p-2 max-w-screen-4xl bg-bgAccent shadow-mr25 z-20">
        <div class="flex items-center gap-3 flex-grow">
            <button
                class="toggle flex items-center justify-center w-10 h-10 hover:bg-neutral-600 rounded-lg transition-colors shrink-0"
                @click="panelStore.toggleSideMenu()"
                v-if="!dontShowToggle"
            >
                <div class="flex flex-col gap-1.5">
                    <span class="h-0.5 bg-white transition-all" :class="[panelStore.sideMenuOpen ? 'w-3' : 'w-6']"></span>
                    <span class="w-6 h-0.5 bg-white transition-all"></span>
                    <span class="h-0.5 bg-white transition-all" :class="[panelStore.sideMenuOpen ? 'w-4' : 'w-6']"></span>
                </div>
            </button>
            <nuxt-link class="flex items-center justify-center p-1 rounded-lg gradient shrink-0" :to="localePath('/')" v-else>
                <img class="relative h-7 rounded-md" src="/logos/logo9-dark.svg" title="Menuriom" alt="Menuriom" />
            </nuxt-link>

            <nuxt-link class="flex items-center justify-center h-7 md:h-9 overflow-hidden group" :to="localePath('/')">
                <img class="h-4 md:h-6" src="/logos/logo-text-en-light.svg" title="Menuriom" alt="Menuriom" v-if="locale == 'en'" />
                <img class="h-4 md:h-6" src="/logos/logo-text-fa-light.svg" title="منوریوم" alt="منوریوم" v-if="locale == 'fa'" />
            </nuxt-link>
        </div>
        <div class="flex items-center gap-3 shrink-0">
            <a
                class="hidden md:flex hover:bg-bgSecondary p-0.5 hover:px-2 transition-all rounded-full"
                :href="localePath('/help-center')"
                target="_blank"
                title="Help"
            >
                <Icon class="w-7 h-7 bg-fgPrimary" name="square-question.svg" folder="icons" size="20px" />
            </a>
            <NotifDropDown />
            <ProfileDropDown />
            <span class="w-0.5 h-3 mx-1 bg-fgPrimary opacity-50"></span>
            <LangSwitch class="me-1" textColor="white" :showText="true" />
        </div>
    </header>
</template>

<script setup>
import LangSwitch from "~/components/LangSwitch.vue";
import NotifDropDown from "~/components/panel/NotifDropDown.vue";
import ProfileDropDown from "~/components/panel/ProfileDropDown.vue";
import { usePanelStore } from "@/stores/panel";

const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();

const dontShowToggle = computed(() => {
    for (let i = 0; i < route.matched.length; i++) if (route.matched[i].path == localePath("/panel/:brandID()")) return false;
    return true;
});
</script>
