<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full" ref="form">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="gear.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.side-menu.Settings") }}</h1>
                </div>
            </div>
            <!-- <div class="flex flex-wrap items-center gap-2"></div> -->
        </header>
        <hr class="w-full border-bgSecondary" />
        <ul class="scroll-thin flex items-center gap-2 w-full -my-3 overflow-auto shrink-0">
            <li class="shrink-0 cursor-pointer">
                <nuxt-link
                    class="btn flex items-center gap-2 text-sm p-2 px-3 hover:px-5 border-2 rounded-xl bg-bgAccent"
                    :class="[
                        route.path === localePath(`/panel/${panelStore.selectedBrandId}/settings`)
                            ? 'bg-bgSecondary border-primary border-opacity-75'
                            : 'border-bgSecondary opacity-80',
                    ]"
                    :to="localePath(`/panel/${panelStore.selectedBrandId}/settings`)"
                >
                    {{ $t("panel.side-menu.Brand Settings") }}
                </nuxt-link>
            </li>
            <li class="shrink-0 cursor-pointer">
                <nuxt-link
                    class="btn flex items-center gap-2 text-sm p-2 px-3 hover:px-5 border-2 rounded-xl bg-bgAccent"
                    :class="[
                        route.path === localePath(`/panel/${panelStore.selectedBrandId}/settings/languages`)
                            ? 'bg-bgSecondary border-primary border-opacity-75'
                            : 'border-bgSecondary opacity-80',
                    ]"
                    :to="localePath(`/panel/${panelStore.selectedBrandId}/settings/languages`)"
                >
                    {{ $t("panel.side-menu.Language & Currency Settings") }}
                </nuxt-link>
            </li>
        </ul>
        <hr class="w-full border-bgSecondary" />
        <NuxtPage />
    </div>
</template>

<script setup>
import { usePanelStore } from "@/stores/panel";

// const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const panelStore = usePanelStore();
</script>
