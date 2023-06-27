<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/plate-utensils-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.menu.New Menu Item") }}</h1>
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
                    <span>{{ $t("panel.menu.New Menu Item") }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-25" />
        <section class="flex flex-wrap-reverse lg:flex-nowrap items-start justify-center gap-4 w-full">
            <div class="flex flex-col gap-4 w-full max-w-4xl p-4 rounded-lg bg-pencil-tip text-white shadow-nr35" ref="form">
                <div class="flex flex-wrap items-center gap-2">
                    <div class="flex flex-wrap items-center gap-2 w-full max-w-max p-2 rounded-lg bg-neutral-800">
                        <Icon class="w-4 h-4 gradient-re" name="eye-slash.svg" folder="icons/light" size="16px" />
                        <span class="text-sm">{{ $t("panel.menu.Hide this item") }}</span>
                        <small class="flex items-center gap-1 text-purple-300 text-xs" v-if="hidden"> {{ $t(`panel.menu.Item is hidden`) }} </small>
                        <Switch class="ms-2" v-model:value="hidden" />
                    </div>
                    <div
                        class="flex flex-wrap items-center gap-2 w-full max-w-max p-2 rounded-lg bg-neutral-800"
                        v-if="checkLimitations([['item-highlighting', true]], brand)"
                    >
                        <Icon class="w-4 h-4 gradient-re -rotate-45" name="thumbtack.svg" folder="icons/light" size="16px" />
                        <span class="text-sm">{{ $t("panel.menu.Pin to the top of category") }}</span>
                        <small class="flex items-center gap-1 text-purple-300 text-xs" v-if="pinned"> {{ $t(`panel.menu.Item is pinned`) }} </small>
                        <Switch class="ms-2" v-model:value="pinned" />
                    </div>
                </div>

                <hr class="w-full opacity-20" />

                <div class="flex flex-col gap-1">
                    <h3 class="flex items-center gap-2 text-lg font-bold">
                        <Icon class="w-5 h-5 gradient-re" name="images.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.menu.Item Images") }}
                        <small class="px-2 rounded-md bg-zinc-800 font-normal opacity-75">{{ $t("panel.up to n", { number: 3 }) }}</small>
                    </h3>
                    <small class="text-xs opacity-75">{{ $t("panel.Images must be less than nMB", { size: 2 }) }}</small>
                </div>
                <ul class="flex flex-wrap items-center gap-4">
                    <li class="relative w-40 h-28 border-2 border-zinc-400 bg-neutral-100 rounded-md" v-for="(image, i) in gallery" :key="i">
                        <img class="w-full h-full object-contain" :src="image.blob" alt="" />
                        <button class="absolute top-1 start-1 p-1.5 hover:border border-red-500 rounded-md bg-dolphin cursor-pointer" @click="removeImage(i)">
                            <Icon class="w-5 h-5 bg-rose-300" name="trash-can.svg" folder="icons/light" size="20px" />
                        </button>
                    </li>
                    <li class="relative flex items-center justify-center w-40 h-28 rounded-lg border-2 border-dashed border-neutral-400 hover:border-violet">
                        <div class="flex flex-col items-center gap-2">
                            <Icon class="w-4 h-4 bg-purple-300" name="plus.svg" folder="icons" size="16px" />
                            <small class="text-purple-300">{{ $t("panel.menu.Add Image") }}</small>
                        </div>
                        <form class="absolute inset-0 opacity-0 cursor-pointer" @submit.prevent="" ref="fileInputForm">
                            <input class="absolute inset-0" ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.webp" multiple @input="addImages()" />
                        </form>
                    </li>
                </ul>
                <small class="text-xs opacity-75">{{ $t("panel.The first image will be the main image") }}</small>

                <hr class="w-full opacity-20" />
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <h3 class="flex items-center gap-2 text-lg font-bold">
                        <Icon class="w-5 h-5 gradient-re" name="newspaper.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.menu.General Info") }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-2 w-full max-w-max p-2 rounded-lg bg-neutral-800">
                        <small class="text-sm">{{ $t("panel.menu.Mark as sold out") }}</small>
                        <Switch v-model:value="soldOut" />
                    </div>
                </div>
                <div class="flex flex-wrap md:flex-nowrap items-start gap-4 w-full">
                    <Input
                        class="w-full grow"
                        :label="$t('panel.menu.Item Name')"
                        :required="formLang == 'default'"
                        v-model="name.values[formLang]"
                        :error="errorField == `name.${formLang}` ? responseMessage : ''"
                    />
                    <Input
                        class="w-full md:w-56 shrink-0"
                        :label="$t('panel.menu.Price')"
                        :required="true"
                        v-model="price"
                        mask="###########"
                        :unit="$t('pricing.Toman')"
                        :error="errorField == `price` ? responseMessage : ''"
                    />
                </div>
                <Input
                    :label="$t('panel.menu.Description')"
                    :required="formLang == 'default'"
                    v-model="description.values[formLang]"
                    :error="errorField == `description.${formLang}` ? responseMessage : ''"
                />
                <SelectDropDown
                    :required="true"
                    :formHtmlObject="form"
                    :label="$t('panel.menu.Category')"
                    :options="categories.list"
                    v-slot="{ option }"
                    v-model:selected-option="selectedCategory.option"
                    :error="errorField == 'selectedCategory' ? responseMessage : ''"
                >
                    <span class="flex items-center gap-2" :value="option.value"><img class="w-5" :src="option.icon" /> {{ option.name }}</span>
                </SelectDropDown>
                <hr class="w-full opacity-20" />
                <small> {{ $t("panel.menu.You can select specific branches for this item") }} </small>
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
                    {{ $t("panel.menu.If you dont select any branches this item will be available for all of your branches that its category allows") }}
                </small>
                <hr class="w-full opacity-20" />
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex flex-col gap-2">
                        <h3 class="flex items-center gap-2 text-lg font-bold">
                            <Icon class="w-5 h-5 gradient-re" name="falafel.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.menu.Item Variants") }}
                        </h3>
                        <small class="flex flex-col gap-1">
                            {{ $t("panel.menu.You can add different variants of this item with different price points") }}
                            <span class="text-xs opacity-75">({{ $t("panel.menu.VariantExamples") }})</span>
                        </small>
                    </div>
                    <button
                        class="btn flex items-center justify-center gap-2 p-2.5 text-xs rounded-md border-2 text-purple-300 border-neutral-300"
                        @click="addNewVariant()"
                        type="button"
                    >
                        <Icon class="w-3 h-3 bg-purple-300" name="plus.svg" folder="icons" size="12px" />
                    </button>
                </div>
                <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!saving && errorField === 'variants' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <ul class="flex flex-col gap-4">
                    <li class="flex flex-wrap md:flex-nowrap items-center gap-2" v-for="(variant, i) in variants" :key="i">
                        <Input :label="$t('panel.menu.Variant Name')" class="w-full flex-grow" v-model="variants[i].name.values[formLang]" />
                        <Input
                            class="w-full md:w-44 shrink-0"
                            :label="$t('panel.menu.Price')"
                            mask="###########"
                            :unit="$t('pricing.Toman')"
                            v-model="variants[i].price"
                        />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-rose-500 hover:bg-opacity-10 text-red-300 cursor-pointer flex-shrink-0"
                            @click="variants.splice(i, 1)"
                        >
                            <Icon class="w-4 h-4 bg-red-300" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.Delete") }}</small>
                        </button>
                    </li>
                </ul>
                <hr class="w-full opacity-20" />
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="tag.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.Tags And Highlighting") }}
                </h3>
                <!-- TODO : add custom tags (3 at max) : user can fill custom text tags -->
                <div
                    class="flex flex-wrap items-center gap-2 w-full max-w-max p-2 rounded-lg bg-neutral-800"
                    v-if="checkLimitations([['menu-tag-option', true]], brand)"
                >
                    <Icon class="w-6 h-6 gradient-re" name="new.svg" folder="icons/light" size="24px" />
                    <span class="text-sm">{{ $t("panel.menu.Show as new item") }}</span>
                    <Switch class="ms-2" v-model:value="showAsNew" />
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-4 w-full">
                    <div class="flex flex-col gap-4 w-full p-4 rounded-md bg-neutral-800 shadow-nr10">
                        <div class="flex flex-wrap items-start justify-between gap-2">
                            <h3 class="flex items-center gap-2">
                                <Icon class="w-4 h-4 bg-white" name="badge-percent.svg" folder="icons/light" size="16px" />
                                {{ $t("panel.menu.Item Discount Tag") }}
                            </h3>
                            <!-- :label="$t('panel.menu.Activate Discount')" -->
                            <Switch v-model:value="discountActive" v-if="checkLimitations([['item-highlighting', true]], brand)" />
                        </div>
                        <small class="opacity-75 -mt-2"> {{ $t("panel.menu.When activated discount will be calculated and shown for this item") }} </small>
                        <hr class="w-full opacity-20" />
                        <Input
                            class="w-full shrink-0"
                            :placeholder="$t('panel.menu.between 0 and 99')"
                            :label="$t('panel.menu.Discount')"
                            mask="##"
                            unit="%"
                            v-model="discountPercentage"
                            :error="errorField == 'discountPercentage' ? responseMessage : ''"
                            v-if="checkLimitations([['item-highlighting', true]], brand)"
                        />
                        <small class="flex flex-wrap gap-0.5 w-full max-w-max p-2 rounded-md border border-neutral-600 bg-pencil-tip" v-else>
                            <span class="opacity-75">{{ $t("panel.This feature is for the standard plan and above only") }}.</span>
                            <nuxt-link class="text-purple-300 underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                                {{ $t("panel.Upgrade your plan to get this feature") }}.
                            </nuxt-link>
                        </small>
                    </div>
                    <div class="flex flex-col gap-4 w-full p-4 rounded-md bg-neutral-800 shadow-nr10">
                        <div class="flex flex-wrap items-start justify-between gap-2">
                            <h3 class="flex items-center gap-2">
                                <Icon class="w-4 h-4 bg-white" name="calendar-range.svg" folder="icons/light" size="16px" />
                                {{ $t("panel.menu.Special Of The Day Tag") }}
                            </h3>
                            <!-- :label="$t('panel.menu.Activate Special Tag')" -->
                            <Switch v-model:value="specialDaysActive" v-if="checkLimitations([['item-highlighting', true]], brand)" />
                        </div>
                        <small class="opacity-75 -mt-2">
                            {{ $t("panel.menu.Select which days you want this item to be available with a special of the day tag") }}
                        </small>
                        <hr class="w-full opacity-20" />
                        <ul
                            class="grid gap-2 w-full"
                            style="grid-template-columns: repeat(auto-fill, minmax(110px, 1fr))"
                            v-if="checkLimitations([['item-highlighting', true]], brand)"
                        >
                            <li
                                class="flex items-center gap-1 me-2 text-sm select-none cursor-pointer"
                                v-for="day in ['Saturdays', 'Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays']"
                                @click="specialDaysList.has(day) ? specialDaysList.delete(day) : specialDaysList.add(day)"
                            >
                                <span
                                    class="flex items-center justify-center w-4 h-4 border-2 rounded transition-all shrink-0"
                                    :class="[specialDaysList.has(day) ? 'border-baby-blue bg-baby-blue shadow-xl shadow-baby-blue' : 'border-zinc-500']"
                                >
                                    <Icon class="w-4 h-4 bg-pencil-tip" name="Check.svg" folder="icons/basil" size="22px" />
                                </span>
                                {{ $t(day) }}
                            </li>
                        </ul>
                        <small class="flex flex-wrap gap-0.5 w-full max-w-max p-2 rounded-md border border-neutral-600 bg-pencil-tip" v-else>
                            <span class="opacity-75">{{ $t("panel.This feature is for the standard plan and above only") }}.</span>
                            <nuxt-link class="text-purple-300 underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                                {{ $t("panel.Upgrade your plan to get this feature") }}.
                            </nuxt-link>
                        </small>
                    </div>
                </div>
                <hr class="w-full opacity-20" />
                <SideItemsList v-model:sideItemList="sideItemList" />
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
                        @click="save()"
                    >
                        <span class="flex items-center gap-2" v-if="!saving">
                            <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                            {{ $t("panel.menu.Create New Item") }}
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
import SelectDropDown from "~/components/form/SelectDropDown.vue";
import MultiSelectDropDown from "~/components/form/MultiSelectDropDown.vue";
import FormLangList from "~/components/panel/FormLangList.vue";
import Loading from "~/components/Loading.vue";
const SideItemsList = defineAsyncComponent(() => import("~/components/panel/menu/SideItemsList.vue"));
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

// TODO
// pinned items style can be different than normal items
// items can have max 3 tags with whatever text user inputs (pro - menu-tag-option)

const { localeProperties, t } = useI18n();
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const toast = useToast();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.menu.New Menu Item")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const form = ref(""); // DOM ref
const fileInput = ref(""); // DOM ref
const fileInputForm = ref(""); // DOM ref

const formLang = ref("default");
const errorField = ref("");
const responseMessage = ref("");

const gallery = ref([]);
const name = reactive({ values: { default: "" } });
const description = reactive({ values: { default: "" } });
const selectedCategory = reactive({ option: { name: "", value: "" } });
const selectedBranches = reactive({ list: [] });
const price = ref("");
const discountActive = ref(false);
const discountPercentage = ref("");
const specialDaysActive = ref(false);
const specialDaysList = ref(new Set());
const hidden = ref(false);
const pinned = ref(false);
const soldOut = ref(false);
const showAsNew = ref(false);
const variants = ref([{ name: { values: { default: "" } }, price: "" }]);
const sideItemList = ref(new Map());

const addImages = () => {
    const files = [...fileInput.value.files];
    fileInputForm.value.reset();

    // limit user to upload at max 3 images
    if (files.length + gallery.value.length > 3) {
        toast.error(t(`panel.max file count is n`, { count: 3 }), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 2 * 1_048_576) {
            toast.success(t(`panel.Some of files that you select was over the nMB size limit`, { size: 2 }), {
                timeout: 3000,
                rtl: localeProperties.value.dir == "rtl",
            });
            continue;
        }
        gallery.value.push({ blob: URL.createObjectURL(file), file: file });
    }
};
const removeImage = (index) => gallery.value.splice(index, 1);

const addNewVariant = () => {
    variants.value.push({ name: { values: { default: "" } }, price: "" });
    setLangVariables(languageList);
};

let languageList = [];
const setLangVariables = (translations) => {
    languageList = translations;
    for (const lang in translations) {
        if (!name.values[lang]) name.values[lang] = "";
        if (!description.values[lang]) description.values[lang] = "";
        for (const variant of variants.value) {
            if (!variant.name.values[lang]) variant.name.values[lang] = "";
        }
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
    gallery.value.forEach((image) => data.append("gallery", image.file));

    for (const val in name.values) data.append(`name.${val}`, name.values[val]);
    for (const val in description.values) data.append(`description.${val}`, description.values[val]);
    if (selectedCategory.option.value) data.append("selectedCategory", selectedCategory.option.value);
    data.append("price", price.value);

    data.append("discountActive", discountActive.value);
    data.append("discountPercentage", discountPercentage.value || 0);

    data.append("specialDaysActive", specialDaysActive.value);
    specialDaysList.value.forEach((day) => data.append("specialDaysList[]", day.toLowerCase()));

    data.append("hidden", hidden.value);
    data.append("pinned", pinned.value);
    data.append("soldOut", soldOut.value);
    data.append("showAsNew", showAsNew.value);

    variants.value.forEach((variant) => {
        if (variant.name) data.append("variants[]", JSON.stringify(variant));
    });

    sideItemList.value.forEach((item, id) => data.append("sideItemList[]", id));
    selectedBranches.list.forEach((branch) => data.append(`branches[]`, branch.value));

    await axios
        .post(`/api/v1/panel/menu-items`, data, {
            headers: { brand: route.params.brandID },
            onUploadProgress: (event) => (percentage.value = parseInt(Math.round((event.loaded / event.total) * 100))),
        })
        .then((response) => {
            toast.success(t(`panel.menu.New menu item has been created`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
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

// getCategoryList -------------------------------------------------
const categories = reactive({ list: [] });
const getCategoryList_results = await useLazyAsyncData(() => getCategoryList(route.params.brandID));
const loadingCategories = computed(() => getCategoryList_results.pending.value);

if (getCategoryList_results.error.value) handleErrors(getCategoryList_results.error.value);
watch(getCategoryList_results.error, (err) => handleErrors(err));

const handleCategoryList_results = (data) => {
    if (!data) return;
    categories.list = data._categories.map((record) => {
        return { icon: record.icon, name: record.name, value: record._id };
    });
};
watch(getCategoryList_results.data, (val) => handleCategoryList_results(val), { immediate: process.server || nuxtApp.isHydrating });

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
