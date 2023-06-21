<style scoped></style>

<template>
    <Dialog name="side-item-creator" boxClass="max-w-xl">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/list-tree-light.png" alt="" />
                <h3 class="text-xl md:text-2xl font-bold text-center">{{ $t("panel.menu.New Side Item Group") }}</h3>
            </div>
        </template>
        <hr class="opacity-25" />
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
            <hr class="opacity-25" />
            <small class="flex flex-col gap-1"> {{ $t("panel.menu.You can add up to 20 items") }} </small>
            <ul class="flex flex-col gap-4">
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
                        class="flex items-center gap-2 p-4 rounded-md hover:bg-rose-500 hover:bg-opacity-10 text-red-300 cursor-pointer flex-shrink-0"
                        @click="items.splice(i, 1)"
                    >
                        <Icon class="w-5 h-5 bg-red-300" name="trash-can.svg" folder="icons/light" size="20px" />
                        <!-- <small>{{ $t("panel.Delete") }}</small> -->
                    </button>
                </li>
            </ul>
            <button class="flex items-center gap-2 w-max text-xs text-purple-300" @click="addNewItem()" type="button">
                <Icon class="w-3 h-3 bg-purple-300" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.menu.Add New Item") }}
            </button>
            <hr class="opacity-25" />
            <div class="flex flex-col md:flex-row items-center gap-4">
                <div class="flex flex-col gap-1 shrink-0">
                    <h3 class="font-bold">{{ $t("panel.menu.Maximum That User Can Select") }}</h3>
                    <small class="text-xs opacity-75">{{ $t("panel.menu.Leave it empty to specify no limit for the user") }}</small>
                </div>
                <Input class="w-full" :label="$t('panel.menu.Maximum Limit')" mask="##" v-model="maximum" />
            </div>
            <hr class="opacity-25" />
            <button></button>
        </div>
    </Dialog>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import FormLangListForDialog from "~/components/panel/FormLangListForDialog.vue";
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// TODO : max items in a group is 20

const formLang = ref("default");
const errorField = ref("");
const responseMessage = ref("");

const name = reactive({ values: { default: "" } });
const description = reactive({ values: { default: "" } });
const items = ref([{ name: { values: { default: "" } }, price: "" }]);
const maximum = ref('');

const addNewItem = () => {
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
</script>
