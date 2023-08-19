<style scoped></style>

<template>
    <Dialog name="create-new-brand" :closeable="false">
        <div class="flex flex-col items-center gap-4 md:w-screen max-w-md">
            <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.account-setup.Create Your Brand") }}</h3>
            <p class="text-xs opacity-75 text-center max-w-sm">
                {{ $t("panel.account-setup.Start by setting up your brand info") }}
            </p>
            <ul class="flex items-center gap-2">
                <li class="w-2.5 h-2.5 rounded-full bg-neutral-500"></li>
                <li class="w-5 h-0.5 bg-zinc-500 opacity-50"></li>
                <li class="w-2.5 h-2.5 rounded-full bg-primary"></li>
            </ul>
            <hr class="w-3/4 border-neutral-500 border-opacity-40" />
            <div class="flex flex-col gap-4 w-full">
                <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgPrimary bg-opacity-90 shadow-inner">
                    <h4 class="flex items-center gap-2">
                        <Icon class="w-5 h-5 gradient-re" name="fork-knife.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.brands.Brand Details") }}
                    </h4>
                    <div class="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4">
                        <div
                            class="relative flex flex-col items-start justify-center gap-2 w-32 h-32 rounded-full hover:border-2 border-secondary bg-bgSecondary bg-opacity-50 shrink-0"
                        >
                            <img class="w-full h-full rounded-full object-contain" :src="logoBlob" v-if="logoBlob" />
                            <div class="flex flex-col items-center justify-center gap-2 w-full" v-else>
                                <img class="w-10" src="~/assets/images/panel-icons/knife-fork.svg" alt="" />
                                <span class="text-sm text-secondary opacity-90">{{ $t("panel.brands.Select Logo") }}</span>
                            </div>
                            <input
                                class="absolute w-32 h-32 rounded-full inset-0 opacity-0 cursor-pointer"
                                ref="logo"
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                                @change="selectLogoImage()"
                                :disabled="loading"
                            />
                        </div>
                        <div class="flex flex-col gap-4 w-full">
                            <Input
                                class="w-full flex-grow"
                                :required="true"
                                type="text"
                                :label="$t('panel.brands.Brand Name')"
                                v-model="name"
                                :error="errorField == 'name' ? responseMessage : ''"
                            />
                            <Input
                                class="w-full flex-grow"
                                type="text"
                                :label="$t('panel.brands.Brand Slogan')"
                                v-model="slogan"
                                :error="errorField == 'slogan' ? responseMessage : ''"
                            />
                        </div>
                    </div>
                </div>
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === 'logo' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgPrimary bg-opacity-90 shadow-inner">
                    <h4 class="flex items-center gap-2">
                        <Icon class="w-5 h-5 gradient-re" name="store.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.brands.How many branches does your business have?") }}
                    </h4>
                    <RangeSlider v-model="branchSize" :label="$t('panel.brands.Branch')" :min="1" :max="20" />
                </div>
                <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgPrimary bg-opacity-90 shadow-inner">
                    <h4 class="flex items-center gap-2">
                        <Icon class="w-5 h-5 gradient-re" name="newspaper.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.brands.Your main branch info") }}
                    </h4>
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
                    <button class="btn p-3 px-6 hover:px-10 text-xs rounded-xl bg-bgSecondary" :disabled="loading" @click="back()">
                        <Icon
                            class="w-3 h-3 py-2 bg-white"
                            :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                            name="arrow-angle.svg"
                            folder="icons"
                            size="12px"
                        />
                    </button>
                    <button class="btn p-3 hover:px-6 rounded-xl bg-primary grow" :class="{ 'opacity-75': loading }" :disabled="loading" @click="createBrand()">
                        <span v-if="!loading"> {{ $t("panel.brands.Create New Brand") }} </span>
                        <Loading v-else />
                    </button>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Input from "~/components/form/Input.vue";
import RangeSlider from "~/components/form/RangeSlider.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const panelStore = usePanelStore();
const userStore = useUserStore();

const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

const logo = ref(""); // Dom Ref
const logoBlob = ref(null);

const name = ref("");
const slogan = ref("");
const branchSize = ref(1);
const address = ref("");
const tel = ref("");

const selectLogoImage = () => {
    if (!logo.value.files[0]) return;
    logoBlob.value = URL.createObjectURL(logo.value.files[0]);
};

const back = () => panelStore.openPopUp("select-account-type");

const createBrand = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const data = new FormData();
    if (logo.value.files[0]) {
        if (logo.value.files[0].size > 1_048_576) {
            responseMessage.value = t("panel.Images must be less than nMB", { size: 1 });
            loading.value = false;
            return;
        }
        data.append("logo", logo.value.files[0]);
    }
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
            // TODO : log errors in sentry type thing
        })
        .finally(() => (loading.value = false));
};

// TODO : max brand count that user can create/own is 1 (hard coded) and max that can be staff of is 3
// TODO : every user should only be able to login with 2 sessions at max
</script>
