<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/layer-group-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.menu.New Category") }}</h1>
                </div>
                <div class="flex items-center gap-1 text-sm ms-2">
                    <nuxt-link :to="localePath(`/panel/${route.params.brandID}`)">
                        <Icon class="w-4 h-4 bg-pencil-tip hover:bg-violet" name="house.svg" folder="icons/light" size="16px" />
                    </nuxt-link>
                    <span>&gt;</span>
                    <nuxt-link class="hover:text-violet" :to="localePath(`/panel/${route.params.brandID}/menu/editor`)">
                        {{ $t("panel.menu.Menu Editor") }}
                    </nuxt-link>
                    <span>&gt;</span>
                    <span>{{ $t("panel.menu.New Category") }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap-reverse lg:flex-nowrap items-start gap-4 w-full" ref="form">
            <div class="flex flex-col gap-4 w-full max-w-screen-md p-4 rounded-lg bg-pencil-tip text-white shadow-nr35">
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="images.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.Category Icon") }}
                </h3>

                <div class="flex flex-wrap md:flex-nowrap items-start gap-4">
                    <div class="relative flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-full bg-white shrink-0">
                        <img class="w-20 max-h-20 object-cover" :src="logoBlob" v-if="logoBlob" />
                        <img class="w-20 max-h-20 object-cover" src="~/assets/images/panel-icons/knife-fork.svg" v-else />
                    </div>
                    <div class="flex flex-col gap-2 p-2 w-full bg-dolphin rounded-lg shadow-nr25">
                        <ul class="flex items-center gap-2">
                            <li
                                class="p-1 px-2 text-xs rounded-md border border-violet cursor-pointer"
                                :class="[iconMode == 'upload' ? 'bg-white text-black' : 'text-white']"
                                @click="iconMode = 'upload'"
                            >
                                {{ $t("panel.menu.File Upload") }}
                            </li>
                            <li
                                class="p-1 px-2 text-xs rounded-md border border-violet cursor-pointer"
                                :class="[iconMode == 'list' ? 'bg-white text-black' : 'text-white']"
                                @click="iconMode = 'list'"
                            >
                                {{ $t("panel.menu.Select From List") }}
                            </li>
                        </ul>
                        <hr class="w-full opacity-20" />
                        <div
                            class="flex flex-col justify-center gap-2 w-full h-44"
                            v-show="iconMode === 'upload'"
                            v-if="checkLimitations([['customizable-category-logo', true]], brand)"
                        >
                            <small class="text-xs opacity-75">{{ $t("panel.Images must be less than nMB", { size: 1 }) }}</small>
                            <div
                                class="relative flex items-center justify-center w-full rounded-lg border-2 border-dashed border-neutral-400 hover:border-violet grow"
                            >
                                <div class="flex flex-col items-center justify-center gap-2 w-full">
                                    <Icon class="w-5 h-5 bg-purple-300" name="images.svg" folder="icons/light" size="20px" />
                                    <span class="text-sm text-purple-300">{{ $t("panel.Drag & drop your logo or click to select") }}</span>
                                </div>
                                <input
                                    class="absolute inset-0 opacity-0 cursor-pointer"
                                    ref="logo"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp"
                                    @change="selectLogoImage()"
                                    :disabled="saving"
                                />
                            </div>
                        </div>
                        <div class="flex flex-col items-center justify-center gap-1 h-44" v-show="iconMode === 'upload'" v-else>
                            <span class="opacity-75 text-sm">{{ $t("panel.This feature is for the pro plan only") }}.</span>
                            <nuxt-link class="text-purple-300 text-sm underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                                {{ $t("panel.Upgrade your plan to get this feature") }}.
                            </nuxt-link>
                        </div>
                        <div class="flex flex-col justify-center gap-4 w-full h-44" v-show="iconMode === 'list'">
                            <ul class="flex flex-wrap items-start gap-2 w-full h-full overflow-auto">
                                <li
                                    class="bg-pencil-tip p-3 rounded-md border-4 cursor-pointer"
                                    :class="[logoBlob === icon ? 'border-violet' : 'border-transparent']"
                                    v-for="(icon, i) in icons.list"
                                    :key="i"
                                    @click="selectIconFromList(icon)"
                                >
                                    <img class="w-12 h-12" :src="icon" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr class="w-full opacity-20" />
                <Input
                    :label="$t('panel.menu.Category Name')"
                    :required="formLang == 'default'"
                    v-model="name.values[formLang]"
                    :error="errorField == `name.${formLang}` ? responseMessage : ''"
                />
                <Switch :label="$t('panel.menu.Show as new category')" v-model:value="showAsNew" />
                <Switch :label="$t('panel.menu.Hide This Category')" v-model:value="hide" />
                <hr class="w-full opacity-20" />
                <small> {{ $t("panel.menu.You can select specific branches for this category") }} </small>
                <MultiSelectDropDown
                    class="w-full flex-grow"
                    :formHtmlObject="form"
                    :label="$t('panel.branches.Branches')"
                    :options="branches.list"
                    v-slot="{ option }"
                    v-model:selected-options="selectedBranches.list"
                    :error="errorField == 'selectedBranches' ? responseMessage : ''"
                >
                    <span :value="option.value">{{ option.name }}</span>
                </MultiSelectDropDown>
                <small class="text-xs opacity-75">
                    {{ $t("panel.menu.If you dont select any branches this category will be available for all of your branches") }}
                </small>
                <hr class="w-full opacity-20" />
                <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!saving && errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <div class="flex flex-wrap items-center gap-2" v-if="saving && percentage > 0">
                    <small>{{ $t("panel.Uploading") }}</small>
                    <div class="p-1 w-full max-w-screen-2xs rounded-md bg-dolphin">
                        <span class="flex h-2 rounded-lg gradient" :style="`width:${percentage}%`"></span>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-4">
                    <nuxt-link
                        class="btn flex items-center justify-center gap-2 p-3 py-2.5 text-sm rounded-lg border-2 border-neutral-300 flex-shrink-0"
                        :to="localePath(`/panel/${route.params.brandID}/menu/editor`)"
                    >
                        <Icon
                            class="w-3 h-3 py-2 bg-white"
                            :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                            name="arrow-angle.svg"
                            folder="icons"
                            size="12px"
                        />
                        {{ $t("panel.Go Back") }}
                    </nuxt-link>
                    <button
                        class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-violet text-white flex-shrink-0"
                        :class="{ 'opacity-50': saving }"
                        :disabled="saving"
                        @click="save()"
                        v-if="checkPermissions(['main-panel.menu.add'], brand)"
                    >
                        <span class="flex items-center gap-2" v-if="!saving">
                            <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                            {{ $t("panel.menu.Create Category") }}
                        </span>
                        <Loading v-else />
                    </button>
                </div>
            </div>
            <FormLangList
                :brandID="route.params.brandID"
                :formLang="formLang"
                @update:formLang="formLang = $event"
                @updateLanguages="setLangVariables($event)"
            />
        </section>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Switch from "~/components/form/Switch.vue";
import FormLangList from "~/components/panel/FormLangList.vue";
import MultiSelectDropDown from "~/components/form/MultiSelectDropDown.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

// TODO : add ability to remove category icon in style section

const { localeProperties, t } = useI18n();
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const toast = useToast();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.menu.New Category")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const form = ref(); // Dom Ref
const formLang = ref("default");
const errorField = ref("");
const responseMessage = ref("");

const name = reactive({ values: { default: "" } });
const selectedBranches = reactive({ list: [] });
const showAsNew = ref(false);
const hide = ref(false);

const iconMode = ref("list");
const selectedIconMode = ref("list");

const logo = ref(""); // Dom Ref
const logoBlob = ref(null);
const selectLogoImage = () => {
    if (!logo.value.files[0]) return;
    logoBlob.value = URL.createObjectURL(logo.value.files[0]);
    selectedIconMode.value = "upload";
};
const selectIconFromList = (icon) => {
    logoBlob.value = icon;
    selectedIconMode.value = "list";
};

const setLangVariables = (translations) => {
    for (const lang in translations) {
        if (!name.values[lang]) name.values[lang] = "";
    }
};

// saving ----------------------------------------
const percentage = ref(0);
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    formLang.value = "default";
    responseMessage.value = "";
    errorField.value = "";

    const data = new FormData();

    if (logo.value.files?.[0] && selectedIconMode.value === "upload") {
        if (logo.value.files[0].size > 1_048_576) {
            responseMessage.value = t("panel.Images must be less than nMB", { size: 1 });
            saving.value = false;
            return;
        }
        data.append("uploadedIcon", logo.value.files[0]);
    }
    if (logoBlob.value && selectedIconMode.value === "list") data.append(`selectedIcon`, logoBlob.value);
    data.append(`iconMode`, selectedIconMode.value);
    for (const val in name.values) data.append(`name.${val}`, name.values[val]);
    data.append(`showAsNew`, showAsNew.value);
    data.append(`hide`, hide.value);
    selectedBranches.list.forEach((branch) => data.append(`branches[]`, branch.value));

    await axios
        .post(`/api/v1/panel/menu-categories/`, data, {
            headers: { brand: route.params.brandID },
            onUploadProgress: (event) => (percentage.value = parseInt(Math.round((event.loaded / event.total) * 100))),
        })
        .then((response) => {
            toast.success(t(`panel.menu.New category has been created`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            router.push(localePath(`/panel/${route.params.brandID}/menu/editor`));
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
        .finally(() => (saving.value = false));
};
// -------------------------------------------------

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getIconList -------------------------------------------------
const icons = reactive({ list: [] });
const getIconList_results = await useLazyAsyncData(() => getCategoryIconList(route.params.brandID, icons.list));
const loadingIcons = computed(() => getIconList_results.pending.value);

if (getIconList_results.error.value) handleErrors(getIconList_results.error.value);
watch(getIconList_results.error, (err) => handleErrors(err));

const handleIconList_results = (data) => {
    if (!data) return;
    icons.list = data._icons;
};
watch(getIconList_results.data, (val) => handleIconList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getBranchList -------------------------------------------------
const branches = reactive({ list: [] });
const getBranchList_results = await useLazyAsyncData(() => getBranchList(route.params.brandID));
const loadingBranches = computed(() => getBranchList_results.pending.value);

if (getBranchList_results.error.value) handleErrors(getBranchList_results.error.value);
watch(getBranchList_results.error, (err) => handleErrors(err));

const handleBranchList_results = (data) => {
    branches.list = data._records.map((record) => {
        return { name: record.name, value: record._id };
    });
};
watch(getBranchList_results.data, (val) => handleBranchList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
