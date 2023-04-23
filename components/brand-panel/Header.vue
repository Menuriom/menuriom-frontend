<style scoped>
header {
    width: calc(100% - 1rem);
}

.toggle {
    width: 2.75rem;
    height: 2.75rem;
}
</style>

<template>
    <header class="flex items-center justify-between gap-3 rounded-lg mt-2 p-2 md:p-3 max-w-screen-4xl h-14 md:h-16 bg-pencil-tip shadow-nr15 z-20">
        <div class="flex items-center gap-3 flex-grow">
            <button class="toggle flex items-center justify-center hover:bg-neutral-600 rounded-full transition-colors" @click="panelStore.toggleSideMenu()">
                <div class="flex flex-col gap-1.5">
                    <span class="h-0.5 bg-white transition-all" :class="[panelStore.sideMenuOpen ? 'w-3' : 'w-6']"></span>
                    <span class="w-6 h-0.5 bg-white transition-all"></span>
                    <span class="h-0.5 bg-white transition-all" :class="[panelStore.sideMenuOpen ? 'w-4' : 'w-6']"></span>
                </div>
            </button>

            <nuxt-link class="flex items-center justify-center h-7 md:h-9 overflow-hidden group" :to="localePath('/')">
                <img class="h-6 md:h-8" src="/logo-text-white.svg" title="Menuriom" alt="Menuriom" v-if="locale == 'en'" />
                <img class="h-7 md:h-9" src="/logo-text-white-fa.svg" title="منوریوم" alt="منوریوم" v-if="locale == 'fa'" />
            </nuxt-link>
        </div>
        <div class="flex items-center gap-3 flex-shrink-0">
            <a
                class="hidden md:flex hover:bg-neutral-600 hover:p-1 transition-all rounded-full"
                :href="localePath('/help-center')"
                target="_blank"
                title="Help"
            >
                <Icon class="w-7 h-7 bg-zinc-100" name="square-question.svg" folder="icons" size="20px" />
            </a>
            <NotifDropDown />
            <ProfileDropDown />
            <span class="w-0.5 h-3 mx-1 bg-zinc-500"></span>
            <LangSwitch class="" textColor="white" />
        </div>
    </header>
</template>

<script setup>
import LangSwitch from "~/components/LangSwitch.vue";
import NotifDropDown from "~/components/brand-panel/NotifDropDown.vue";
import ProfileDropDown from "~/components/brand-panel/ProfileDropDown.vue";
import { usePanelStore } from "@/stores/panel";

const { locale } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();
</script>
