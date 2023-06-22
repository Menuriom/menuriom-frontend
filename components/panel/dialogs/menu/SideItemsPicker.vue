<style scoped></style>

<template>
    <Dialog name="side-item-picker">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/list-tree-light.png" alt="" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.menu.Side Item Groups") }}</h3>
            </div>
        </template>
        <div class="flex flex-col gap-4 md:w-screen max-w-md">
            <small class="opacity-75 -mt-1">
                {{ $t("panel.menu.Select side item groups that you want to add to this item of the menu") }}
            </small>
            <hr class="opacity-25" />
            <div class="flex flex-col items-center p-2" v-if="sideItemGroups.list.length == 0">
                <span class="">{{ $t("panel.menu.You havent created any side groups yet") }}</span>
            </div>
            <ul class="flex flex-col gap-2 w-full">
                <li
                    class="flex flex-col items-center gap-2 p-4 bg-neutral-800 rounded-lg border-2 border-transparent hover:border-violet cursor-pointer"
                    @click="panelStore.openPopUp('side-item-creator')"
                    v-if="canCreateNewGroup"
                >
                    <Icon class="w-4 h-4 bg-purple-300" name="plus.svg" folder="icons" size="16px" />
                    <span class="text-purple-300 text-xs">{{ $t("panel.menu.Create New Group") }}</span>
                </li>
                <li class="flex flex-wrap items-center gap-4 p-4 bg-neutral-800 rounded-lg cursor-pointer" v-for="(item, i) in sideItemGroups.list" :key="i">
                    <span
                        class="flex items-center justify-center w-4 h-4 border-2 rounded transition-all shrink-0"
                        :class="[selectedItemGroups.has(item) ? 'border-baby-blue bg-baby-blue shadow-xl shadow-baby-blue' : 'border-zinc-500']"
                        @click="selectItemGroup(item)"
                    >
                        <Icon class="w-4 h-4 bg-neutral-800" name="Check.svg" folder="icons/basil" size="20px" />
                    </span>
                    <div class="flex flex-col grow" @click="selectItemGroup(item)">
                        <h4 class="font-bold">{{ item.translation?.[locale]?.name || item.name }}</h4>
                        <small class="text-xs opacity-75">{{ item.translation?.[locale]?.description || item.description }}</small>
                    </div>
                    <div class="flex flex-wrap items-center gap-1">
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-blue-500 hover:bg-opacity-10 text-blue-300 cursor-pointer shrink-0"
                            @click="$emit('openDelete', item)"
                            :title="$t('panel.Edit')"
                        >
                            <Icon class="w-5 h-5 bg-neutral-300" name="pen-to-square.svg" folder="icons/light" size="18px" />
                        </button>
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-rose-500 hover:bg-opacity-10 text-red-300 cursor-pointer shrink-0"
                            @click="$emit('openDelete', item)"
                            :title="$t('panel.Delete')"
                        >
                            <Icon class="w-5 h-5 bg-red-300" name="trash-can.svg" folder="icons/light" size="18px" />
                        </button>
                    </div>
                </li>
            </ul>
            <Loading v-if="loadingGroups" />
            <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!saving && errorField === '' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <hr class="opacity-25" />
            <button
                class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-md bg-violet text-white flex-shrink-0"
                @click="$emit('update:sideItemList', selectedItemGroups)"
                v-if="selectedItemGroups.size > 0"
            >
                <Icon class="w-4 h-4 bg-white" name="bars-progress.svg" folder="icons/light" size="16px" />
                {{ $t("panel.menu.Add Selected Groups") }}
            </button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const nuxtApp = useNuxtApp();
const panelStore = usePanelStore();
const userStore = useUserStore();

const props = defineProps({
    sideItemList: Set,
});

const emit = defineEmits(["openDelete", "update:sideItemList"]);

const errorField = ref("");
const responseMessage = ref("");

const selectedItemGroups = ref(new Set(props.sideItemList));
const selectItemGroup = (item) => {
    selectedItemGroups.value.has(item) ? selectedItemGroups.value.delete(item) : selectedItemGroups.value.add(item);
};

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getCategoryList -------------------------------------------------
const sideItemGroups = reactive({ list: [] });
const canCreateNewGroup = ref(true);
const getGroupList_results = await useLazyAsyncData(() => getSideItemGroupList(route.params.brandID));
const loadingGroups = computed(() => getGroupList_results.pending.value);

if (getGroupList_results.error.value) handleErrors(getGroupList_results.error.value);
watch(getGroupList_results.error, (err) => handleErrors(err));

const handleGroupList_results = (data) => {
    if (!data) return;
    sideItemGroups.list = data._records;
    canCreateNewGroup.value = data._canCreateNewGroup;
};
watch(getGroupList_results.data, (val) => handleGroupList_results(val), { immediate: process.server || nuxtApp.isHydrating });

// -------------------------------------------------
</script>
