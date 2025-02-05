<style scoped></style>

<template>
    <div class="flex flex-col items-start gap-4 w-full max-w-screen-md mx-auto border border-bgSecondary border-opacity-50 rounded-3xl p-4 md:p-6">
        <header class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex flex-col items-start gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/brand.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.brands.Create New Brand") }}</h1>
                </div>
                <p class="text-sm opacity-75">
                    {{ $t("panel.account-setup.Start by setting up your brand info") }}
                </p>
            </div>
        </header>
        <!-- <hr class="w-full border-gray-300 opacity-50" /> -->
        <div class="flex flex-col gap-4 w-full">
            <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgAccent shadow-mr15">
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="fork-knife.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.brands.Brand Details") }}
                </h3>
                <div class="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4">
                    <div
                        class="relative flex flex-col items-start justify-center gap-2 w-32 h-32 rounded-full hover:border-2 border-secondary bg-bgSecondary shrink-0"
                    >
                        <img class="w-full h-full rounded-full object-contain" :src="logoBlob" v-if="logoBlob" />
                        <div class="flex flex-col items-center justify-center gap-2 w-full" v-else>
                            <img class="w-10" src="~/assets/images/panel-icons/knife-fork.svg" alt="" />
                            <span class="text-sm text-secondary opacity-90">{{ $t("panel.brands.Select Logo") }}</span>
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
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex flex-wrap @3xl:flex-nowrap items-start gap-4 w-full">
                            <Input
                                class="w-full flex-grow"
                                :required="true"
                                :label="$t('panel.brands.Brand Name')"
                                v-model="name"
                                :error="errorField == 'name' ? responseMessage : ''"
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
                            v-model="slogan"
                            :error="errorField == 'slogan' ? responseMessage : ''"
                        />
                    </div>
                </div>
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === 'logo' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
            </div>
            <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgAccent shadow-mr15">
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="store.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.brands.How many branches does your business have?") }}
                </h3>
                <RangeSlider v-model="branchSize" :label="$t('panel.brands.Branch')" :min="1" :max="20" />
            </div>
            <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgAccent shadow-mr15">
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="newspaper.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.brands.Your main branch info") }}
                </h3>
                <Input
                    :required="true"
                    :label="$t('panel.brands.Main Branch Address')"
                    v-model="address"
                    :error="errorField == 'address' ? responseMessage : ''"
                />
                <Input
                    :required="true"
                    :label="$t('panel.brands.Main Branch Telephone Number')"
                    mask="0##-########"
                    v-model="tel"
                    :error="errorField == 'tel' ? responseMessage : ''"
                />
            </div>
            <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <div class="flex gap-2 w-full">
                <nuxt-link class="btn flex items-center gap-2 p-3 px-6 hover:px-8 text-sm rounded-xl bg-bgSecondary" :to="localePath(`/panel`)">
                    <Icon
                        class="w-3 h-3 py-2 bg-fgPrimary"
                        :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                        name="arrow-angle.svg"
                        folder="icons"
                        size="12px"
                    />
                    {{ $t("panel.Go Back") }}
                </nuxt-link>
                <button
                    class="btn p-3 px-6 hover:px-8 rounded-xl text-sm bg-primary"
                    :class="{ 'opacity-75 cursor-not-allowed': saving }"
                    :disabled="saving"
                    @click="save()"
                >
                    <span v-if="!saving"> {{ $t("panel.brands.Create New Brand") }} </span>
                    <Loading v-else />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import RangeSlider from "~/components/form/RangeSlider.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, localeProperties, t } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.branches.Branch Creation")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.branches.Branch Creation")} - ${t("panel.Your Menuriom Panel")}` });

const errorField = ref("");
const responseMessage = ref("");

const logo = ref(""); // Dom Ref
const logoBlob = ref(null);

const username = ref("");
const name = ref("");
const slogan = ref("");
const branchSize = ref(1);
const address = ref("");
const tel = ref("");

const selectLogoImage = () => {
    if (!logo.value.files[0]) return;
    logoBlob.value = URL.createObjectURL(logo.value.files[0]);
};

// saving ----------------------------------------
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    username.value = username.value.replaceAll(" ", "");

    const data = new FormData();
    if (logo.value.files[0]) {
        if (logo.value.files[0].size > 1_048_576) {
            responseMessage.value = t("panel.Images must be less than nMB", { size: 1 });
            saving.value = false;
            return;
        }
        data.append("logo", logo.value.files[0]);
    }
    data.append("username", username.value);
    data.append("name", name.value);
    if (slogan.value) data.append("slogan", slogan.value);
    data.append("branchSize", branchSize.value);
    data.append("address", address.value);
    data.append("tel", tel.value);

    await axios
        .post(`/api/v1/account/setup-brand`, data)
        .then((response) => {
            // inject brand into brand list
            userStore.injectNewBrand(response.data.brand);

            //  select new brand as current brand
            panelStore.setSelectedBrand(Object.keys(response.data.brand)[0]);
            router.push(localePath(`/panel/${response.data.newId}`));

            panelStore.openPopUp("brand-creation-success");
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
// ----------------------------------------
</script>
