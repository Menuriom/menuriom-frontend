<style scoped></style>

<template>
    <Dialog name="side-item-delete-confirmation" :title="$t('panel.menu.Delete Side Items Group')">
        <div class="flex flex-col gap-3">
            <hr class="w-full opacity-30 mt-2" />
            <h2 class="text-xl" v-html="$t('panel.menu.You are about to delete this side items group', { name: item.name })" />
            <p class="text-sm opacity-75 -mt-2">
                {{ $t("panel.menu.deletingSideItemsGroupDesc") }}
            </p>
            <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md mt-4">
                {{ $t("panel.brands.This action cannot be reversed") }}
            </small>
            <hr class="w-full opacity-40" />
            <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <div class="flex items-center gap-2 w-full">
                <button class="btn w-full p-3 rounded bg-dolphin" :disabled="deleting" @click="panelStore.openPopUp('side-item-picker')">
                    {{ $t("Cancel") }}
                </button>
                <button
                    class="btn w-full p-3 rounded bg-red-500"
                    :class="{ 'opacity-75 cursor-not-allowed': deleting }"
                    :disabled="deleting"
                    @click="deleteRecord()"
                >
                    <span v-if="!deleting"> {{ $t("panel.menu.Delete Items Group") }} </span>
                    <Loading class="h-6" v-else />
                </button>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import FormLangListForDialog from "~/components/panel/FormLangListForDialog.vue";
import Dialog from "~/components/panel/Dialog.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const route = useRoute();
const panelStore = usePanelStore();
const userStore = useUserStore();

const props = defineProps({
    item: Object,
});

const formLang = ref("default");
const errorField = ref("");
const responseMessage = ref("");

// deleting ----------------------------------------
const deleting = ref(false);
const deleteRecord = async () => {
    if (deleting.value) return;
    deleting.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = props.item._id;

    await axios
        .delete(`/api/v1/panel/menu-sides/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            panelStore.openPopUp("side-item-picker");
        })
        .catch((err) => {
            if (typeof err.response !== "undefined" && err.response.data) {
                const errors = err.response.data.errors || err.response.data.message;
                if (typeof errors === "object") {
                    responseMessage.value = errors[0].errors[0];
                    errorField.value = errors[0].property;
                }
            } else responseMessage.value = t("Something went wrong!");
            if (process.server) console.log({ err });
            // TODO : log errors in sentry type thing
        })
        .finally(() => (deleting.value = false));
};
// -------------------------------------------------
</script>
