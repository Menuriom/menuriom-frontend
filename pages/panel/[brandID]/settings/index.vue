<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <!-- <h2 class="flex items-center gap-2 text-2xl font-bold">
            <img class="w-6" src="~/assets/images/panel-icons/pen-dark.png" alt="" />
            {{ $t("panel.brands.General Info") }}
        </h2> -->
        <section class="flex flex-wrap-reverse lg:flex-nowrap items-start gap-4 w-full">
            <div class="flex flex-col gap-4 w-full lg:max-w-screen-md p-4 rounded-lg bg-pencil-tip text-white">
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="fork-knife.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.brands.Brand Details") }}
                </h3>
                <div class="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4">
                    <div class="relative flex flex-col items-start justify-center gap-2 w-32 h-32 rounded-full hover:border-2 border-primary bg-white shrink-0">
                        <img class="w-full h-full rounded-full object-contain" :src="logoBlob" v-if="logoBlob" />
                        <div class="flex flex-col items-center justify-center gap-2 w-full" v-else>
                            <img class="w-10" src="~/assets/images/panel-icons/knife-fork.svg" alt="" />
                            <span class="text-sm text-pencil-tip opacity-90">{{ $t("panel.brands.Select Logo") }}</span>
                        </div>
                        <form class="absolute inset-0 opacity-0 cursor-pointer" @submit.prevent="" ref="fileInputForm">
                            <input class="absolute inset-0" ref="logo" type="file" accept=".jpg,.jpeg,.png,.webp" @change="selectLogoImage()" />
                        </form>
                        <button
                            class="absolute top-1 start-1 p-1.5 hover:border border-red-500 rounded-md bg-dolphin cursor-pointer"
                            v-if="logoBlob != ogLogo"
                            @click="logoBlob = ogLogo"
                        >
                            <Icon class="w-5 h-5 bg-rose-300" name="trash-can.svg" folder="icons/light" size="20px" />
                        </button>
                    </div>
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex flex-wrap @3xl:flex-nowrap items-start gap-4 w-full">
                            <Input
                                class="w-full flex-grow"
                                :label="$t('panel.brands.Brand Name')"
                                :required="formLang == 'default'"
                                v-model="name.values[formLang]"
                                :error="errorField == `name.${formLang}` ? responseMessage : ''"
                            />
                            <Input
                                class="w-full flex-grow"
                                :label="$t('panel.brands.Brand Username')"
                                :placeholder="$t('panel.brands.Only english numbers and letters')"
                                icon-name="at.svg"
                                icon-folder="icons"
                                :required="true"
                                v-model="username"
                                :error="errorField == `username` ? responseMessage : ''"
                            />
                        </div>
                        <Input
                            class="w-full flex-grow"
                            :label="$t('panel.brands.Brand Slogan')"
                            v-model="slogan.values[formLang]"
                            :error="errorField == `slogan.${formLang}` ? responseMessage : ''"
                        />
                    </div>
                </div>
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === 'logo' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <hr class="w-full opacity-25" />
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="newspaper.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.Socials") }}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <Input
                        class="w-full flex-grow"
                        label="Instagram"
                        placeholder="@instagram-handle"
                        iconName="instagram.svg"
                        iconFolder="icons/brands"
                        v-model="socials.instagram"
                        :error="errorField == 'socials_instagram' ? responseMessage : ''"
                    />
                    <Input
                        class="w-full flex-grow"
                        label="Twitter"
                        placeholder="@twitter-handle"
                        iconName="twitter.svg"
                        iconFolder="icons/brands"
                        v-model="socials.twitter"
                        :error="errorField == 'socials_twitter' ? responseMessage : ''"
                    />
                    <Input
                        class="w-full flex-grow"
                        label="Telegram"
                        placeholder="@telegram-username"
                        iconName="telegram.svg"
                        iconFolder="icons/brands"
                        v-model="socials.telegram"
                        :error="errorField == 'socials_telegram' ? responseMessage : ''"
                    />
                    <Input
                        class="w-full flex-grow"
                        label="Whatsapp"
                        placeholder="09-- --- ----"
                        mask="09#########"
                        iconName="whatsapp.svg"
                        iconFolder="icons/brands"
                        v-model="socials.whatsapp"
                        :error="errorField == 'socials_whatsapp' ? responseMessage : ''"
                    />
                </div>
                <hr class="w-full opacity-25" />
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <button class="btn w-max p-3 rounded-lg bg-primary" :class="{ 'opacity-75 cursor-not-allowed': saving }" :disabled="saving" @click="save()">
                    <span v-if="!saving"> {{ $t("panel.brands.Update Brand Info") }} </span>
                    <Loading v-else />
                </button>
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
import Loading from "~/components/Loading.vue";
import FormLangList from "~/components/panel/FormLangList.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { localeProperties, t } = useI18n();
const route = useRoute();
const toast = useToast();
const userStore = useUserStore();
const { brands } = storeToRefs(userStore);

// const title = computed(() => `${t("panel.brands.General Info")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.brands.General Info")} - ${t("panel.Your Menuriom Panel")}` });

const formLang = ref("default");
const errorField = ref("");
const responseMessage = ref("");

const fileInputForm = ref(""); // Dom Ref
const logo = ref(""); // Dom Ref
const logoFile = ref(null);
const logoBlob = ref(null);
const ogLogo = ref(null);

const username = ref("");
const name = reactive({ values: { default: "" } });
const slogan = reactive({ values: { default: "" } });
const socials = reactive({ instagram: "", twitter: "", telegram: "", whatsapp: "" });

const selectLogoImage = () => {
    if (!logo.value.files[0]) return;
    logoBlob.value = URL.createObjectURL(logo.value.files[0]);
    logoFile.value = logo.value.files[0];
    fileInputForm.value.reset();
};

// TODO : if username is changing then make a confirmation that by changing username qr codes should be updated

// saving ----------------------------------------
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    formLang.value = "default";
    responseMessage.value = "";
    errorField.value = "";

    username.value = username.value.replaceAll(" ", "");

    const data = new FormData();
    if (logoFile.value) {
        if (logoFile.value.size > 1_048_576) {
            responseMessage.value = t("panel.Images must be less than nMB", { size: 1 });
            saving.value = false;
            return;
        }
        data.append("logo", logoFile.value);
    }
    data.append("username", username.value);
    for (const val in name.values) data.append(`name.${val}`, name.values[val]);
    for (const val in slogan.values) data.append(`slogan.${val}`, slogan.values[val]);
    if (socials.instagram) data.append("socials_instagram", socials.instagram);
    if (socials.twitter) data.append("socials_twitter", socials.twitter);
    if (socials.telegram) data.append("socials_telegram", socials.telegram);
    if (socials.whatsapp) data.append("socials_whatsapp", socials.whatsapp);

    await axios
        .put(`/api/v1/panel/brands/${route.params.brandID}`, data, { headers: { brand: route.params.brandID } })
        .then((response) => {
            // update brand details in store
            brands.value.list[route.params.brandID].logo = response.data.logo;
            brands.value.list[route.params.brandID].username = response.data.username;
            brands.value.list[route.params.brandID].name = response.data.name;
            brands.value.list[route.params.brandID].slogan = response.data.slogan;
            logoBlob.value = ogLogo.value = response.data.logo;

            // make toast to inform user that brand details is updated
            toast.info(t(`panel.brands.Brand info has been updated`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
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
// ----------------------------------------

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getBrandInfo -------------------------------------------------
const loadingInfo = ref(true);
const getBrandInfo_results = await useLazyAsyncData(() => getBrandInfo(route.params.brandID));

if (getBrandInfo_results.error.value) handleErrors(getBrandInfo_results.error.value);
watch(getBrandInfo_results.error, (err) => handleErrors(err));

const handleBrandInfo_results = (data) => {
    logoBlob.value = ogLogo.value = data._info.logo;
    username.value = data._info.username;
    name.values = data._info.name;
    slogan.values = data._info.slogan;
    socials.instagram = data._info.socials.instagram || "";
    socials.telegram = data._info.socials.telegram || "";
    socials.twitter = data._info.socials.twitter || "";
    socials.whatsapp = data._info.socials.whatsapp || "";
    loadingInfo.value = false;
};
if (getBrandInfo_results.data.value) handleBrandInfo_results(getBrandInfo_results.data.value);
watch(getBrandInfo_results.data, (val) => handleBrandInfo_results(val));
// -------------------------------------------------

const setLangVariables = (translations) => {
    for (const lang in translations) {
        if (!name.values[lang]) name.values[lang] = "";
        if (!slogan.values[lang]) slogan.values[lang] = "";
    }
};
</script>
