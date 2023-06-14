<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full" ref="form">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/cards-blank-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.side-menu.Menu Editor") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.menu.You are editing your general menu") }}
                </small>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <button
                    class="btn flex items-center justify-center gap-2 p-2.5 text-sm rounded-lg border-2 border-black flex-shrink-0"
                    @click="panelStore.openPopUp('sent-invites')"
                >
                    <Icon class="w-4 h-4 bg-black" name="envelope-open-text.svg" folder="icons/light" size="16px" />
                    {{ $t("panel.side-menu.Sent Invites") }}
                </button>
                <button
                    class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-violet text-white flex-shrink-0"
                    @click="panelStore.openPopUp('invite-new-member')"
                >
                    <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                    {{ $t("panel.menu.Invite Members") }}
                </button>
            </div>
        </header>
        <!-- TODO : add a reset button for every branch menu that returns any branch menu to default state -->
        <!-- TODO : when editing a menu item add button to save the item for general menu or one branch specific -->
        <div class="flex flex-wrap items-center justify-between gap-4">
            <!-- TODO : add single search bar that can search both in category and menus at same time -->
            <Search class="w-full max-w-xs" v-model="searchQuery" />
            <label class="flex items-center gap-2">
                <small class="text-sm">{{ $t("panel.menu.For Branch") }}</small>
                <SelectDropDown
                    class="w-64"
                    customPadding="px-2.5 py-2.5"
                    :formHtmlObject="form"
                    :options="[{ name: 'General Menu (no branch)', value: null }]"
                    v-slot="{ option }"
                    v-model:selected-option="forBranch"
                >
                    <span :value="option.value">{{ option.name }}</span>
                </SelectDropDown>
            </label>
        </div>
        <hr class="w-full border-gray-300 opacity-50" />

        <!-- <Teleport to="body"> </Teleport> -->
    </div>
</template>

<script setup>
import Search from "~/components/form/Search.vue";
import SlideMenu from "~/components/panel/SlideMenu.vue";
import SelectDropDown from "~/components/form/SelectDropDown.vue";
import Loading from "~/components/Loading.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.menu.Menu Editor")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const form = ref(); // Dom Ref
const errorField = ref("");
const responseMessage = ref("");

const forBranch = ref({ value: null, name: "General Menu (no branch)" });
const searchQuery = ref("");

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};
</script>
