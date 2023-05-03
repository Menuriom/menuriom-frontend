<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full max-w-screen-md p-4 rounded-lg bg-pencil-tip text-white shadow-nr35">
        <h3 class="flex items-center gap-2 text-lg">
            <Icon class="w-5 h-5 bg-white" name="fork-knife.svg" folder="icons/light" size="20px" />
            {{ $t("panel.brands.Brand Details") }}
        </h3>
        <div class="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4">
            <div class="relative flex flex-col items-start justify-center gap-2 w-32 h-32 rounded-full hover:border-2 border-violet bg-white flex-shrink-0">
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
                <Input
                    class="w-full flex-grow"
                    :required="true"
                    :label="$t('panel.brands.Brand Name')"
                    v-model="name"
                    :error="errorField == 'name' ? responseMessage : ''"
                />
                <Input
                    class="w-full flex-grow"
                    :label="$t('panel.brands.Brand Slogan')"
                    v-model="slogan"
                    :error="errorField == 'slogan' ? responseMessage : ''"
                />
            </div>
        </div>
        <small class="flex items-start text-xs text-rose-300" v-if="errorField === 'logo' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small>
        <hr class="w-full opacity-25" />
        <h3 class="flex items-center gap-2 text-lg">
            <Icon class="w-5 h-5 bg-white" name="newspaper.svg" folder="icons/light" size="20px" />
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
                :error="errorField == 'socials.instagram' ? responseMessage : ''"
            />
            <Input
                class="w-full flex-grow"
                label="Twitter"
                placeholder="@twitter-handle"
                iconName="twitter.svg"
                iconFolder="icons/brands"
                v-model="socials.twitter"
                :error="errorField == 'socials.twitter' ? responseMessage : ''"
            />
            <Input
                class="w-full flex-grow"
                label="Telegram"
                placeholder="@telegram-username"
                iconName="telegram.svg"
                iconFolder="icons/brands"
                v-model="socials.telegram"
                :error="errorField == 'socials.telegram' ? responseMessage : ''"
            />
            <Input
                class="w-full flex-grow"
                label="Whatsapp"
                placeholder="09-- --- ----"
                mask="09#########"
                iconName="whatsapp.svg"
                iconFolder="icons/brands"
                v-model="socials.whatsapp"
                :error="errorField == 'socials.whatsapp' ? responseMessage : ''"
            />
        </div>
        <hr class="w-full opacity-25" />
        <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small>
        <div class="flex gap-4 w-full">
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-3 py-2.5 text-sm rounded-lg border-2 border-neutral-300 flex-shrink-0"
                :to="localePath(`/panel`)"
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
            <button class="btn p-3 rounded-lg bg-violet" :class="{ 'opacity-75 cursor-not-allowed': saving }" :disabled="saving" @click="save()">
                <span v-if="!saving"> {{ $t("panel.brands.Update Brand Info") }} </span>
                <Loading v-else />
            </button>
        </div>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { localeProperties, t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const userStore = useUserStore();
const { brands } = storeToRefs(userStore);

const title = computed(() => `${t("panel.brands.General Info")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const errorField = ref("");
const responseMessage = ref("");

const fileInputForm = ref(""); // Dom Ref
const logo = ref(""); // Dom Ref
const logoFile = ref(null);
const logoBlob = ref(null);
const ogLogo = ref(null);

const name = ref("");
const slogan = ref("");
const socials = reactive({
    instagram: "",
    twitter: "",
    telegram: "",
    whatsapp: "",
});

const selectLogoImage = () => {
    if (!logo.value.files[0]) return;
    logoBlob.value = URL.createObjectURL(logo.value.files[0]);
    logoFile.value = logo.value.files[0];

    fileInputForm.value.reset();
};

// saving ----------------------------------------
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const data = new FormData();
    if (logoFile.value) {
        if (logoFile.value.size > 1_048_576) {
            responseMessage.value = t("panel.Images must be less than nMB", { size: 1 });
            saving.value = false;
            return;
        }
        data.append("logo", logoFile.value);
    }
    data.append("name", name.value);
    if (slogan.value) data.append("slogan", slogan.value);
    if (socials.instagram) data.append("socials_instagram", socials.instagram);
    if (socials.twitter) data.append("socials_twitter", socials.twitter);
    if (socials.telegram) data.append("socials_telegram", socials.telegram);
    if (socials.whatsapp) data.append("socials_whatsapp", socials.whatsapp);

    await axios
        .put(`/api/v1/panel/brands/${route.params.id}`, data)
        .then((response) => {
            // update brand details in store
            brands.value.list[route.params.id].logo = response.data.logo;
            brands.value.list[route.params.id].name = response.data.name;
            brands.value.list[route.params.id].slogan = response.data.slogan;

            // TODO : make toast to inform user that brand details is updated
        })
        .catch((e) => {
            if (typeof e.response !== "undefined" && e.response.data) {
                const errors = e.response.data.errors || e.response.data.message;
                responseMessage.value = errors[0].errors[0];
                errorField.value = errors[0].property;
            }
            console.log({ e });
        })
        .finally(() => (saving.value = false));
};
// ----------------------------------------

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    // TODO : log errors in sentry type thing
    if (process.server) console.log({ err });
};

// getBrandInfo -------------------------------------------------
const loadingInfo = ref(true);
const getBrandInfo_results = await useLazyAsyncData(() => getBrandInfo(route.params.id));

if (getBrandInfo_results.error.value) handleErrors(getBrandInfo_results.error.value);
watch(getBrandInfo_results.error, (err) => handleErrors(err));

const handleBrandInfo_results = (data) => {
    logoBlob.value = ogLogo.value = data._info.logo;
    name.value = data._info.name;
    slogan.value = data._info.slogan;
    socials.instagram = data._info.socials.instagram || "";
    socials.telegram = data._info.socials.telegram || "";
    socials.twitter = data._info.socials.twitter || "";
    socials.whatsapp = data._info.socials.whatsapp || "";
    loadingInfo.value = false;
};
if (getBrandInfo_results.data.value) handleBrandInfo_results(getBrandInfo_results.data.value);
watch(getBrandInfo_results.data, (val) => handleBrandInfo_results(val));
// -------------------------------------------------
</script>
