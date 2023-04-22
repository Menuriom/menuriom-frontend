<style scoped></style>

<template>
    <Dialog name="create-new-brand" :closeable="false">
        <div class="flex flex-col items-center gap-4 w-screen max-w-md">
            <div class="flex flex-col gap-1">
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("user-panel.account-setup.Create Your Brand") }}</h3>
                <p class="text-xs opacity-75 text-center max-w-sm">
                    {{ $t("user-panel.account-setup.Start by setting up your brand info") }}
                </p>
            </div>
            <ul class="flex items-center gap-2">
                <li class="w-2.5 h-2.5 rounded-full bg-neutral-500"></li>
                <li class="w-5 h-0.5 bg-zinc-500 opacity-50"></li>
                <li class="w-2.5 h-2.5 rounded-full bg-neutral-500"></li>
                <li class="w-5 h-0.5 bg-zinc-500 opacity-50"></li>
                <li class="w-2.5 h-2.5 rounded-full bg-violet"></li>
            </ul>
            <hr class="w-full border-0 h-0.5 gradient" />
            <form class="flex flex-col gap-4 w-full" @submit.prevent="createBrand()">
                <h4 class="flex items-center gap-2">
                    <img class="w-5" src="~/assets/images/panel-icons/fork-knife.png" />
                    {{ $t("user-panel.brands.Brand Details") }}
                </h4>
                <div class="flex items-center gap-4">
                    <div
                        class="relative flex flex-col items-start justify-center gap-2 w-32 h-32 rounded-full hover:border-2 border-violet bg-white flex-shrink-0"
                    >
                        <img class="w-full h-full rounded-full object-contain" :src="logoBlob" v-if="logoBlob" />
                        <div class="flex flex-col items-center justify-center gap-2 w-full" v-else>
                            <img class="w-10" src="~/assets/images/panel-icons/knife-fork.svg" alt="" />
                            <span class="text-sm text-pencil-tip opacity-90">Select Logo</span>
                        </div>
                        <input
                            class="absolute inset-0 opacity-0 cursor-pointer"
                            ref="logo"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            @change="selectLogoImage()"
                            :disabled="loading"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <Input
                            class="w-full flex-grow"
                            :required="true"
                            type="text"
                            :placeholder="$t('user-panel.brands.Brand Name')"
                            v-model="name"
                            :error="errorField == 'name' ? responseMessage : ''"
                        />
                        <Input
                            class="w-full flex-grow"
                            type="text"
                            :placeholder="$t('user-panel.brands.Brand Slogan')"
                            v-model="slogan"
                            :error="errorField == 'slogan' ? responseMessage : ''"
                        />
                    </div>
                </div>
                <hr class="w-full opacity-25" />
                <h4 class="flex items-center gap-2">
                    <img class="w-5" src="~/assets/images/panel-icons/store.png" />
                    {{ $t("user-panel.brands.How many branches does your business have?") }}
                </h4>
                <RangeSlider v-model="branchSize" :placeholder="$t('user-panel.brands.Branch')" :min="1" :max="20" />
                <hr class="w-full opacity-25" />
                <h4 class="flex items-center gap-2">
                    <img class="w-5" src="~/assets/images/panel-icons/newspaper.png" />
                    {{ $t("user-panel.brands.Your main branch info") }}
                </h4>
                <Input
                    type="text"
                    :placeholder="$t('user-panel.brands.Main Branch Address')"
                    v-model="address"
                    :error="errorField == 'address' ? responseMessage : ''"
                />
                <Input
                    type="text"
                    :placeholder="$t('user-panel.brands.Main Branch Telephone Number')"
                    mask="0##-########"
                    v-model="tel"
                    :error="errorField == 'tel' ? responseMessage : ''"
                />
                <hr class="w-full opacity-25" />
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <div class="flex items-center gap-2 w-full">
                    <button class="btn w-max p-4 rounded bg-dolphin" :disabled="loading" type="button" @click="back()">
                        <Icon
                            class="w-3 h-3 py-2 bg-white"
                            :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                            name="arrow-angle.svg"
                            folder="icons"
                            size="12px"
                        />
                    </button>
                    <button class="btn w-full p-3 rounded bg-violet" :class="{ 'opacity-75 cursor-not-allowed': loading }" :disabled="loading">
                        <span v-if="!loading"> {{ $t("auth.Continue") }} </span>
                        <Loading class="" v-else />
                    </button>
                </div>
            </form>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/user-panel/Dialog.vue";
import Input from "~/components/form/Input.vue";
import RangeSlider from "~/components/form/RangeSlider.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
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
            responseMessage.value = t("user-panel.brands.Images must be less than 1MB");
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
            panelStore.saveSelectedBrand();

            panelStore.closePopUp();
            // TODO
            // show another pop-up to let user know that brand is created
            // this pop-up must be a general one and must be customizable for diffrent things
            // try to add the convetie party thingy animation too
        })
        .catch((e) => {
            // TODO : make list of errors and show all errors in the form at once
            if (typeof e.response !== "undefined" && e.response.data) {
                if (typeof e.response.data.errors === "object") {
                    responseMessage.value = e.response.data.errors[0].errors[0];
                    errorField.value = e.response.data.errors[0].property;
                }
            }
            console.log({ e });
        })
        .finally(() => (loading.value = false));
};
</script>
