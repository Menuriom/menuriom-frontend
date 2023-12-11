<style scoped></style>

<template>
    <div class="relative" ref="dropdown">
        <div
            class="relative flex items-center gap-1 cursor-pointer hover:bg-bgSecondary p-0.5 hover:px-2 transition-all rounded-full"
            @click="toggleDropdown()"
            v-if="panelStore.selectedBrandId"
        >
            <Icon class="w-7 h-7 bg-fgPrimary" name="cowbell.svg" folder="icons" size="20px" />
            <span class="absolute top-1 start-0 w-3 h-3 bg-rose-500 rounded-full border-white" v-if="newNotifs">
                <span class="absolute inset-0 bg-rose-400 rounded-full animate-pulse"></span>
            </span>
        </div>
        <transition name="slide-up" mode="out-in" appear>
            <div
                class="absolute top-12 mt-1 end-[calc(100%-145px)] md:-end-4 flex flex-col gap-3 w-screen max-w-screen-2xs p-3 bg-bgAccent text-white shadow-mr35 rounded-2xl"
                v-if="open"
            >
                <div class="flex items-center justify-between gap-2 w-full p-1 px-2">
                    <h4 class="font-semibold">{{ $t("panel.Notifications") }}</h4>
                    <!-- <button class="text-xs text-secondary opacity-80 hover:opacity-100 underline underline-offset-2">Clear All</button> -->
                </div>
                <hr class="w-full mx-auto opacity-25" />
                <ul class="flex flex-col gap-1 w-full max-h-64 overflow-auto" v-if="!loadingNotifs">
                    <li v-for="(notif, i) in notifications">
                        <nuxt-link class="flex flex-col gap-2 w-full p-2.5 hover:bg-dolphin rounded-xl cursor-pointer" to="#">
                            <div class="flex items-center gap-2">
                                <!-- <Icon class="icon w-5 h-5 bg-zinc-100" name="user-pen.svg" folder="icons/light" size="20px" /> -->
                                <span class="text-sm font-semibold grow">{{ notif.translation?.[locale]?.title || notif.title }}</span>
                                <span class="w-2.5 h-2.5 gradient rounded-full" v-if="!notif.viewedInSysAt"></span>
                            </div>
                            <p class="text-xs opacity-75">{{ notif.translation?.[locale]?.text || notif.text }}</p>
                        </nuxt-link>
                    </li>
                    <li class="flex flex-col items-center justify-center" v-if="!notifications.length">
                        <NuxtImg class="opacity-75" src="/img/empty-state2.png" sizes="200px" format="webp" />
                        <small class="opacity-75 mb-4">{{ $t("panel.No Notifications") }}</small>
                    </li>
                </ul>
                <ul class="flex flex-col gap-4 w-full" v-else>
                    <li class="flex flex-col gap-2 w-full p-2.5 bg-bgSecondary bg-opacity-75 rounded-xl" v-for="i in 4">
                        <span class="skeleton h-4 w-full rounded-md"></span>
                        <span class="skeleton h-1.5 w-full rounded-md"></span>
                        <span class="skeleton h-1.5 w-8/12 rounded-md"></span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import axios from "axios";
import { usePanelStore } from "@/stores/panel";

const { locale } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();

const open = ref(false);
const dropdown = ref(null); //Ref to DOM
const toggleDropdown = () => {
    open.value = !open.value;
    if (open.value) {
        loadNotifs();
        markAsRead();
    }
};
const closeDropdown = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) open.value = false;
};

// newNotifCheck ------------------------------------------
const newNotifs = ref(false);
const newNotifsCheck = await useFetch(`/api/v1/panel/notifications/new`, {
    lazy: process.client,
    headers: { brand: panelStore.selectedBrandId },
    watch: [panelStore.selectedBrandId],
});
if (newNotifsCheck.error.value && newNotifsCheck.error.value.statusCode >= 500 && process.server) {
    console.error({ err: newNotifsCheck.error.value });
}
if (newNotifsCheck.data.value) newNotifs.value = newNotifsCheck.data.value.newNotifs;
watch(newNotifsCheck.data, (val) => (newNotifs.value = val.newNotifs));
// -------------------------------------------------

// getNotifs -------------------------------------------------
const notifications = ref([]);
const loadingNotifs = ref(false);
const loadNotifs = async () => {
    if (loadingNotifs.value) return;
    loadingNotifs.value = true;

    const getNotifs = await useFetch(`/api/v1/panel/notifications/`, {
        lazy: process.client,
        headers: { brand: panelStore.selectedBrandId },
    });

    loadingNotifs.value = false;
    if (getNotifs.error.value && getNotifs.error.value.statusCode >= 500 && process.server) {
        console.error({ err: getNotifs.error.value });
    }

    if (getNotifs.data.value) notifications.value = getNotifs.data.value.notifs;
};
// -------------------------------------------------

const marked = false;
const markAsRead = async () => {
    if (marked) return;
    await axios
        .post(`/api/v1/panel/notifications/mark-as-read`, {}, { headers: { brand: panelStore.selectedBrandId } })
        .then(() => (marked = true))
        .catch((e) => {});
};

onMounted(() => {
    document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdown);
});
</script>
