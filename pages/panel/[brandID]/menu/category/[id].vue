<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="layer-group.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.menu.Edit Category") }}</h1>
                </div>
                <div class="flex items-center gap-1 text-sm ms-2">
                    <nuxt-link :to="localePath(`/panel/${route.params.brandID}`)">
                        <Icon class="w-4 h-4 bg-fgPrimary hover:bg-primary" name="house.svg" folder="icons/light" size="16px" />
                    </nuxt-link>
                    <span class="opacity-60">&gt;</span>
                    <nuxt-link class="hover:text-primary" :to="localePath(`/panel/${route.params.brandID}/menu/editor`)">
                        {{ $t("panel.menu.Menu Editor") }}
                    </nuxt-link>
                    <span class="opacity-60">&gt;</span>
                    <span class="text-secondary">{{ $t("panel.menu.Edit Category") }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-bgSecondary" />
        <section class="flex flex-wrap-reverse lg:flex-nowrap items-start gap-4 w-full" ref="form">
            <div class="flex flex-col gap-4 w-full max-w-screen-md p-4 rounded-2xl bg-bgAccent text-fgPrimary shadow-nr10">
                <div class="flex flex-wrap md:flex-nowrap items-start gap-4">
                    <div class="flex flex-col items-center gap-4 shrink-0">
                        <h3 class="flex items-center gap-2 text-lg font-bold">
                            <Icon class="w-5 h-5 gradient-re" name="images.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.menu.Category Icon") }}
                        </h3>
                        <div class="relative flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-2xl bg-fgPrimary shadow-mr35 shrink-0">
                            <img class="w-20 max-h-20 object-cover" :src="logoBlob" v-if="logoBlob" />
                            <img class="w-20 max-h-20 object-cover" src="~/assets/images/panel-icons/knife-fork.svg" v-else />
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 p-2 md:p-4 w-full bg-bgSecondary bg-opacity-50 rounded-2xl shadow-mr15">
                        <ul class="flex items-center gap-2">
                            <li
                                class="p-1 px-2 text-xs rounded-lg border-2 cursor-pointer"
                                :class="[iconMode == 'upload' ? 'bg-fgPrimary text-bgPrimary' : 'text-fgPrimary border-fgPrimary border-opacity-20']"
                                @click="iconMode = 'upload'"
                            >
                                {{ $t("panel.menu.File Upload") }}
                            </li>
                            <li
                                class="p-1 px-2 text-xs rounded-lg border-2 cursor-pointer"
                                :class="[iconMode == 'list' ? 'bg-fgPrimary text-bgPrimary' : 'text-fgPrimary border-fgPrimary border-opacity-20']"
                                @click="iconMode = 'list'"
                            >
                                {{ $t("panel.menu.Select From List") }}
                            </li>
                        </ul>
                        <hr class="w-full border-fgPrimary border-opacity-10" />
                        <div
                            class="flex flex-col justify-center gap-2 w-full h-32"
                            v-show="iconMode === 'upload'"
                            v-if="checkLimitations([['customizable-category-logo', true]], brand)"
                        >
                            <small class="text-xs text-secondary opacity-80">{{ $t("panel.Images must be less than nMB", { size: 1 }) }}</small>
                            <div
                                class="relative flex items-center justify-center w-full rounded-lg border-2 border-dashed border-fgPrimary border-opacity-20 hover:border-primary grow"
                            >
                                <div class="flex flex-col items-center justify-center gap-2 w-full">
                                    <Icon class="w-5 h-5 bg-fgPrimary" name="images.svg" folder="icons/light" size="20px" />
                                    <span class="text-sm text-primary">{{ $t("panel.Drag & drop your logo or click to select") }}</span>
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
                        <div class="flex flex-col items-center justify-center gap-1 h-32" v-show="iconMode === 'upload'" v-else>
                            <span class="opacity-75 text-sm">{{ $t("panel.This feature is for the pro plan only") }}.</span>
                            <nuxt-link class="text-purple-300 text-sm underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                                {{ $t("panel.Upgrade your plan to get this feature") }}.
                            </nuxt-link>
                        </div>
                        <div class="flex flex-col justify-center gap-4 w-full h-32" v-show="iconMode === 'list'">
                            <ul class="flex flex-wrap items-start gap-2 w-full h-full overflow-auto">
                                <li
                                    class="p-3 rounded-xl border-4 cursor-pointer"
                                    :class="[logoBlob === icon ? 'border-primary' : 'border-bgSecondary']"
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

                <hr class="w-full border-bgSecondary" />
                <Input
                    :label="$t('panel.menu.Category Name')"
                    :required="formLang == 'default'"
                    v-model="name.values[formLang]"
                    :error="errorField == `name.${formLang}` ? responseMessage : ''"
                />
                <div class="flex flex-wrap items-center gap-4">
                    <Switch :label="$t('panel.menu.Show as new category')" v-model:value="showAsNew" />
                    <Switch :label="$t('panel.menu.Hide This Category')" v-model:value="hide" />
                </div>
                <hr class="w-full border-bgSecondary" />
                <div class="flex flex-col gap-1">
                    <small> {{ $t("panel.menu.You can select specific branches for this category") }} </small>
                    <small class="text-xs opacity-75 text-secondary">
                        {{ $t("panel.menu.If you dont select any branches this category will be available for all of your branches") }}
                    </small>
                </div>
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
                <hr class="w-full border-bgSecondary" />
                <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!saving && errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-400 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <div class="flex flex-wrap items-center gap-2" v-if="saving && percentage > 0">
                    <small>{{ $t("panel.Uploading") }}</small>
                    <div class="p-1 w-full max-w-screen-2xs rounded-md bg-dolphin">
                        <span class="flex h-2 rounded-lg gradient" :style="`width:${percentage}%`"></span>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-4">
                    <nuxt-link
                        class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-bgSecondary"
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
                        class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary"
                        :class="{ 'opacity-50': saving }"
                        :disabled="saving"
                        @click="save()"
                        v-if="checkPermissions(['main-panel.menu.add'], brand)"
                    >
                        <span class="flex items-center gap-2" v-if="!saving">
                            <Icon class="w-4 h-4 bg-white" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            {{ $t("panel.Save Changes") }}
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

// const title = computed(() => `${t("panel.menu.Edit Category")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.menu.Edit Category")} - ${t("panel.Your Menuriom Panel")}` });

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
        .put(`/api/v1/panel/menu-categories/${route.params.id}`, data, {
            headers: { brand: route.params.brandID },
            onUploadProgress: (event) => (percentage.value = parseInt(Math.round((event.loaded / event.total) * 100))),
        })
        .then((response) => {
            toast.info(t(`panel.menu.Category has been updated`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
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
            // LOGGER : log errors in sentry type thing
        })
        .finally(() => (saving.value = false));
};
// -------------------------------------------------

const handleErrors = (err) => {
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // LOGGER : log errors in sentry type thing
};

// getCategoryInfo -------------------------------------------------
const getCategoryInfo_results = await useLazyAsyncData(() => getCategoryInfo(route.params.id, route.params.brandID));
const loadingInfo = computed(() => getCategoryInfo_results.pending.value);

if (getCategoryInfo_results.error.value) handleErrors(getCategoryInfo_results.error.value);
watch(getCategoryInfo_results.error, (err) => handleErrors(err));

const handleCategoryInfo_results = (data) => {
    if (!data) return;
    logoBlob.value = data._info.icon;
    name.values = data._info.name;
    selectedBranches.list = [...data._info.branches.map((branch) => ({ name: branch.name, value: branch._id }))];
    showAsNew.value = data._info.showAsNew;
    hide.value = data._info.hide;
};
watch(getCategoryInfo_results.data, (val) => handleCategoryInfo_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

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
    if (!data) return;
    branches.list = data._records.map((record) => {
        return { name: record.name, value: record._id };
    });
};
watch(getBranchList_results.data, (val) => handleBranchList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
