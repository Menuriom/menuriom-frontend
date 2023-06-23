<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/store-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.branches.Branch Creation") }}</h1>
                </div>
                <div class="flex items-center gap-1 text-sm ms-2">
                    <nuxt-link :to="localePath(`/panel/${route.params.brandID}`)">
                        <Icon class="w-4 h-4 bg-pencil-tip hover:bg-violet" name="house.svg" folder="icons/light" size="16px" />
                    </nuxt-link>
                    <span>&gt;</span>
                    <nuxt-link class="hover:text-violet" :to="localePath(`/panel/${route.params.brandID}/branches`)">
                        {{ $t("panel.branches.Branches") }}
                    </nuxt-link>
                    <span>&gt;</span>
                    <span>{{ $t("panel.branches.Branch Creation") }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap-reverse lg:flex-nowrap items-start justify-center gap-4 w-full">
            <div class="flex flex-col gap-4 w-full max-w-screen-md p-4 rounded-lg bg-pencil-tip text-white shadow-nr35">
                <div class="flex flex-col gap-1">
                    <h3 class="flex items-center gap-2 text-lg font-bold">
                        <Icon class="w-5 h-5 gradient-re" name="images.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.branches.Branch Images") }}
                        <small class="px-2 rounded-md bg-zinc-800 opacity-75">{{ $t("panel.up to n", { number: 5 }) }}</small>
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
                            <small class="text-purple-300">{{ $t("panel.branches.Add Image") }}</small>
                        </div>
                        <form class="absolute inset-0 opacity-0 cursor-pointer" @submit.prevent="" ref="fileInputForm">
                            <input class="absolute inset-0" ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.webp" multiple @input="addImages()" />
                        </form>
                    </li>
                </ul>
                <hr class="w-full opacity-20" />
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="newspaper.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.branches.General Info") }}
                </h3>
                <Input
                    :label="$t('panel.branches.Branch Name')"
                    :required="formLang == 'default'"
                    v-model="name.values[formLang]"
                    :error="errorField == `name.${formLang}` ? responseMessage : ''"
                />
                <div class="flex flex-wrap md:flex-nowrap items-start gap-4 w-full">
                    <!-- TODO : add little flag icon on the corner of any dual language field showing the current lang -->
                    <Input
                        name="address"
                        class="w-full flex-grow"
                        :label="$t('panel.branches.Branch Address')"
                        :required="formLang == 'default'"
                        v-model="address.values[formLang]"
                        :error="errorField == `address.${formLang}` ? responseMessage : ''"
                    />
                    <Input
                        name="postalCode"
                        :placeholder="$t('panel.branches.10 digit number')"
                        class="w-full md:w-52 flex-shrink-0"
                        :label="$t('panel.branches.Branch Postal Code')"
                        mask="##########"
                        v-model="postalCode"
                        :error="errorField == 'postalCode' ? responseMessage : ''"
                    />
                </div>
                <hr class="w-full opacity-20" />
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <h3 class="flex items-center gap-2 text-lg font-bold">
                        <Icon class="w-5 h-5 gradient-re" name="phone-rotary.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.branches.Phone Numbers") }}
                    </h3>
                    <button
                        class="btn flex items-center justify-center gap-2 p-2.5 text-xs rounded-md border-2 text-purple-300 border-neutral-300"
                        @click="telephoneNumbers.push('')"
                        type="button"
                    >
                        <Icon class="w-3 h-3 bg-purple-300" name="plus.svg" folder="icons" size="12px" />
                        <!-- {{ $t("panel.branches.Add Phone Number") }} -->
                    </button>
                </div>
                <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!saving && errorField === 'telephoneNumbers' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <ul class="flex flex-col gap-4">
                    <li class="flex items-center gap-2" v-for="(number, i) in telephoneNumbers" :key="number">
                        <Input placeholder="021 22334455" name="tel" mask="###########" class="w-full md:w-52 flex-grow" v-model="telephoneNumbers[i]" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-rose-500 hover:bg-opacity-10 text-red-300 cursor-pointer flex-shrink-0"
                            @click="telephoneNumbers.splice(i, 1)"
                        >
                            <Icon class="w-4 h-4 bg-red-300" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.Delete") }}</small>
                        </button>
                    </li>
                </ul>
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
                        :to="localePath(`/panel/${route.params.brandID}/branches`)"
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
                        v-if="checkPermissions(['main-panel.branches.add'], brand)"
                    >
                        <span class="flex items-center gap-2" v-if="!saving">
                            <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                            {{ $t("panel.branches.Create Branch") }}
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
import FormLangList from "~/components/panel/FormLangList.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

// TODO : add map to record the location of branch to show in menu 

const { localeProperties, t } = useI18n();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.branches.Branch Creation")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const fileInput = ref(""); // DOM ref
const fileInputForm = ref(""); // DOM ref

const formLang = ref("default");
const errorField = ref("");
const responseMessage = ref("");

const gallery = ref([]);
const name = reactive({ values: { default: "" } });
const address = reactive({ values: { default: "" } });
const postalCode = ref("");
const telephoneNumbers = ref(["", ""]);

const addImages = () => {
    const files = [...fileInput.value.files];
    fileInputForm.value.reset();

    // limit user to upload at max 5 images
    if (files.length + gallery.value.length > 5) {
        toast.error(t(`panel.max file count is n`, { count: 5 }), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
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
    for (const val in address.values) data.append(`address.${val}`, address.values[val]);
    if (postalCode.value) data.append("postalCode", postalCode.value);
    telephoneNumbers.value.forEach((number) => {
        if (number) data.append("telephoneNumbers[]", number);
    });

    await axios
        .post(`/api/v1/panel/branches/${route.params.brandID}`, data, {
            headers: { brand: route.params.brandID },
            onUploadProgress: (event) => (percentage.value = parseInt(Math.round((event.loaded / event.total) * 100))),
        })
        .then((response) => {
            toast.success(t(`panel.branches.New branch created`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            router.push(localePath(`/panel/${route.params.brandID}/branches`));
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

const setLangVariables = (translations) => {
    for (const lang in translations) {
        if (!name.values[lang]) name.values[lang] = "";
        if (!address.values[lang]) address.values[lang] = "";
    }
};
</script>
