<style scoped></style>

<template>
    <Dialog name="side-item-creator" boxClass="max-w-xl">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <Icon class="w-8 h-8 gradient" name="list-tree.svg" folder="icons/duo" size="32px" />
                <h3 class="text-xl md:text-2xl font-bold text-center">{{ $t("panel.menu.New Side Item Group") }}</h3>
            </div>
        </template>
        <hr class="border-bgSecondary" />
        <div class="flex flex-col gap-4 md:w-screen max-w-lg">
            <FormLangListForDialog
                :brandID="route.params.brandID"
                :formLang="formLang"
                @update:formLang="formLang = $event"
                @updateLanguages="setLangVariables($event)"
            />
            <Input
                class="w-full grow"
                :label="$t('panel.menu.Group Name')"
                :required="formLang == 'default'"
                v-model="name.values[formLang]"
                :error="errorField == `name.${formLang}` ? responseMessage : ''"
            />
            <Input
                class="w-full grow"
                :label="$t('panel.menu.Description')"
                :required="formLang == 'default'"
                v-model="description.values[formLang]"
                :error="errorField == `name.${formLang}` ? responseMessage : ''"
            />
            <hr class="border-bgSecondary" />
            <small class="flex flex-col gap-1"> {{ $t("panel.menu.You can add up to 20 items") }} </small>
            <ul class="flex flex-col gap-4 p-1 max-h-96 overflow-auto">
                <li class="flex flex-wrap md:flex-nowrap items-center gap-2" v-for="(item, i) in items" :key="i">
                    <Input :label="$t('panel.menu.Item Name')" class="w-full flex-grow" v-model="items[i].name.values[formLang]" />
                    <Input
                        class="w-full md:w-44 shrink-0"
                        :label="$t('panel.menu.Price')"
                        mask="###########"
                        :unit="$t('pricing.Toman')"
                        v-model="items[i].price"
                    />
                    <button
                        class="flex items-center gap-2 p-3.5 border border-bgSecondary rounded-xl hover:bg-rose-400 cursor-pointer group shrink-0"
                        @click="items.splice(i, 1)"
                    >
                        <Icon class="w-5 h-5 bg-red-300 group-hover:bg-fgPrimary" name="trash-can.svg" folder="icons/light" size="20px" />
                    </button>
                </li>
            </ul>
            <button
                class="btn flex items-center gap-2 w-max text-xs text-purple-300 border border-bgSecondary p-2 hover:px-5 rounded-xl"
                @click="addNewItem()"
                type="button"
                v-if="items.length < 20"
            >
                <Icon class="w-3 h-3 bg-purple-300" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.menu.Add New Item") }}
            </button>
            <hr class="border-bgSecondary" />
            <div class="flex flex-col md:flex-row items-center gap-4">
                <div class="flex flex-col gap-1 shrink-0">
                    <h3 class="font-bold">{{ $t("panel.menu.Maximum That User Can Select") }}</h3>
                    <small class="text-xs opacity-80 text-secondary">{{ $t("panel.menu.Leave it empty to specify no limit for the user") }}</small>
                </div>
                <Input class="w-full" :label="$t('panel.menu.Maximum Limit')" mask="##" v-model="maximum" />
            </div>
            <hr class="border-bgSecondary" />
            <div class="flex flex-wrap items-center gap-2">
                <button
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-bgSecondary shrink-0"
                    @click="panelStore.openPopUp('side-item-picker')"
                >
                    <Icon
                        class="w-3 h-3 py-2 bg-white"
                        :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                        name="arrow-angle.svg"
                        folder="icons"
                        size="12px"
                    />
                    {{ $t("panel.Go Back") }}
                </button>
                <button
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary grow"
                    :class="{ 'opacity-50': saving }"
                    @click="save()"
                >
                    <span class="flex items-center gap-2" v-if="!saving">
                        <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                        {{ $t("panel.menu.Create Item Group") }}
                    </span>
                    <Loading v-else />
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
const localePath = useLocalePath();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

const formLang = ref("default");
const errorField = ref("");
const responseMessage = ref("");

const name = reactive({ values: { default: "" } });
const description = reactive({ values: { default: "" } });
const items = ref([
    { name: { values: { default: "" } }, price: "0" },
    { name: { values: { default: "" } }, price: "0" },
]);
const maximum = ref("");

const addNewItem = () => {
    if (items.value.length >= 20) return;
    items.value.push({ name: { values: { default: "" } }, price: "" });
    setLangVariables(languageList);
};

let languageList = [];
const setLangVariables = (translations) => {
    languageList = translations;
    for (const lang in translations) {
        if (!name.values[lang]) name.values[lang] = "";
        if (!description.values[lang]) description.values[lang] = "";
        for (const item of items.value) {
            if (!item.name.values[lang]) item.name.values[lang] = "";
        }
    }
};

// saving ----------------------------------------
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    formLang.value = "default";
    responseMessage.value = "";
    errorField.value = "";

    const data = new FormData();
    for (const val in name.values) data.append(`name.${val}`, name.values[val]);
    for (const val in description.values) data.append(`description.${val}`, description.values[val]);
    if (maximum.value) data.append("maximum", maximum.value);
    items.value.forEach((item) => {
        item.price = item.price || 0;
        if (item.name) data.append("items[]", JSON.stringify(item));
    });

    await axios
        .post(`/api/v1/panel/menu-sides`, data, { headers: { brand: route.params.brandID } })
        .then((response) => {
            toast.success(t(`panel.menu.New side group has been created`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            panelStore.openPopUp("side-item-picker");
        })
        .catch((err) => {
            if (typeof err.response !== "undefined" && err.response.data) {
                const errors = err.response.data.errors || err.response.data.message;
                if (typeof errors === "object") {
                    responseMessage.value = errors[0].errors[0];
                    errorField.value = errors[0].property;
                    toast.success(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
                }
            } else responseMessage.value = t("Something went wrong!");
            if (process.server) console.log({ err });
            // TODO : log errors in sentry type thing
        })
        .finally(() => (saving.value = false));
};
// -------------------------------------------------
</script>
