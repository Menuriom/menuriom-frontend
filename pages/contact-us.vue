<style scoped>
.bar {
    width: 80%;
    top: 10%;
    inset-inline-start: -2%;
    transform-origin: top left;
    rotate: -14deg;
    z-index: -1;
    mix-blend-mode: screen;
}
@media (min-width: 768px) {
    .bar {
        width: 50%;
        top: 13%;
        inset-inline-start: -7%;
    }
}
</style>

<template>
    <div class="relative flex flex-wrap items-start justify-center gap-10 w-full mt-8 md:my-12">
        <section class="relative flex flex-col gap-6 w-full max-w-4xl p-6 md:p-10 bg-bgAccent rounded-3xl shadow-mr5 grow isolate">
            <div class="bar absolute h-24 rounded-2xl bg-gradient-to-r from-primary to-secondary shadow-mr25"></div>
            <header class="flex flex-col gap-2 w-full p-4 md:p-6 rounded-2xl bg-bgSecondary bg-opacity-75 backdrop-blur-lg isolate">
                <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ $t("contact-us.Contact Us") }}.</h1>
                <p class="opacity-60">
                    {{ $t("contact-us.contactDescription") }}
                </p>
                <p class="flex flex-wrap gap-2">
                    <span class="">{{ $t("contact-us.Have a simple question?") }}</span>
                    <nuxt-link class="underline underline-offset-2 text-secondary" :to="localePath(`faqs`)">
                        {{ $t("contact-us.Check out our FAQ") }}.
                    </nuxt-link>
                </p>
            </header>
            <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                <div class="flex flex-col ms-4">
                    <span class="text-2xl">{{ $t("contact-us.Im contacting for") }}...</span>
                    <h3 class="text-sm opacity-60">{{ $t("contact-us.Choose your subject to contact") }}</h3>
                </div>
                <ul class="flex gap-4 max-w-full overflow-auto grow">
                    <li
                        class="flex items-center justify-center rounded-xl transition-all cursor-pointer shrink-0"
                        :class="[subject == 'request-feature' ? 'gradient p-1' : 'p-0 bg-transparent']"
                        @click="subject = 'request-feature'"
                    >
                        <span class="p-3 px-4 rounded-lg bg-bgSecondary bg-opacity-90">{{ $t("contact-us.Request New Feature") }}</span>
                    </li>
                    <li
                        class="flex items-center justify-center rounded-xl transition-all cursor-pointer shrink-0"
                        :class="[subject == 'report-issue' ? 'gradient p-1' : 'p-0 bg-transparent']"
                        @click="subject = 'report-issue'"
                    >
                        <span class="p-3 px-4 rounded-lg bg-bgSecondary bg-opacity-90">{{ $t("contact-us.Reporting An Issue") }}</span>
                    </li>
                    <li
                        class="flex items-center justify-center rounded-xl transition-all cursor-pointer shrink-0"
                        :class="[subject == 'sales' ? 'gradient p-1' : 'p-0 bg-transparent']"
                        @click="subject = 'sales'"
                    >
                        <span class="p-3 px-4 rounded-lg bg-bgSecondary bg-opacity-90">{{ $t("contact-us.Sales") }}</span>
                    </li>
                </ul>
            </div>
            <form class="flex flex-col items-start gap-4 w-full p-4 md:p-6 border border-neutral-500 border-opacity-25 rounded-2xl" @submit.prevent="send()">
                <div class="flex items-center gap-4 w-full">
                    <Input
                        class="w-full"
                        name="name"
                        iconName="user-chef.svg"
                        :required="true"
                        type="text"
                        :label="$t('contact-us.Name & Family')"
                        v-model="name"
                        :error="errorField == 'name' ? responseMessage : ''"
                    />
                    <Input
                        class="w-full"
                        name="email"
                        iconName="envelop.svg"
                        :required="true"
                        type="email"
                        :label="$t('contact-us.Email Address')"
                        v-model="email"
                        :error="errorField == 'email' ? responseMessage : ''"
                    />
                </div>
                <textarea
                    class="w-full bg-bgSecondary bg-opacity-50 text-white p-4 rounded-xl text-sm resize-none"
                    :class="{ 'border-2 border-rose-800': errorField == 'message' }"
                    name="message"
                    :placeholder="$t('contact-us.Your Message')"
                    rows="6"
                    v-model="message"
                ></textarea>
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === 'message' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />
                    {{ responseMessage }}
                </small>
                <button class="flex items-center p-3 px-8 hover:px-12 hover:shadow-mr25 bg-primary rounded-xl transition-all group" type="submit">
                    <span class="flex items-center gap-2" v-if="!sending">
                        <Icon class="w-5 h-5 bg-fgPrimary group-hover:-rotate-12 transition-all" name="paper-plane-top.svg" folder="icons" size="20px" />
                        {{ $t("contact-us.Send") }}
                    </span>
                    <Loading v-else />
                </button>
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />
                    {{ responseMessage }}
                </small>
            </form>
        </section>
        <section class="relative flex flex-col justify-end gap-6 p-6 pt-40 w-full max-w-md rounded-3xl shadow-mr25 overflow-hidden isolate">
            <img class="absolute inset-0 -z-10" src="~/assets/images/phone.webp" alt="phone" />
            <div class="flex flex-col items-start gap-2 w-full p-6 text-bgPrimary bg-fgPrimary bg-opacity-80 backdrop-blur-sm rounded-2xl">
                <h3 class="text-lg/none font-bold opacity-50">{{ $t("contact-us.Send Us An Email") }}</h3>
                <a class="text-xl/none font-bold hover:text-primary transition-all" href="">Info@Menuriom.com</a>
            </div>
            <div class="flex flex-col items-start gap-2 w-full p-6 text-bgPrimary bg-fgPrimary bg-opacity-80 backdrop-blur-sm rounded-2xl">
                <h3 class="text-lg/none font-bold opacity-50">{{ $t("contact-us.Follow Us") }}</h3>
                <ul class="flex items-center gap-2">
                    <li>
                        <a class="" href="#" target="_blank">
                            <Icon class="w-8 h-8 bg-bgSecondary hover:bg-primary transition-all" name="instagram.svg" folder="icons" size="32px" />
                        </a>
                    </li>
                    <li>
                        <a class="" href="#" target="_blank">
                            <Icon class="w-8 h-8 bg-bgSecondary hover:bg-primary transition-all" name="telegram.svg" folder="icons" size="32px" />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

useHead({ title: `Contact Us - Menuriom` });
definePageMeta({ layout: "default" });

const toast = useToast();
const { localeProperties, t } = useI18n();
const localePath = useLocalePath();

const timeMargin = 60 * 60 * 1000; // 1 hours in miliseconds

const name = ref("");
const email = ref("");
const subject = ref("request-feature");
const message = ref("");

const errorField = ref("");
const responseMessage = ref("");

const sending = ref(false);
const send = async () => {
    if (sending.value) return;
    sending.value = true;

    responseMessage.value = "";
    errorField.value = "";

    let sendLock = 0;
    try {
        sendLock = localStorage.getItem("ck_S") || Date.now() + timeMargin + 10;
    } catch (e) {}
    if (Date.now() - sendLock + timeMargin > 0) {
        toast.info(t(`contact-us.retryLaterMessage`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        return;
    }

    await axios
        .post("/api/v1/contact-us/send", {
            name: name.value,
            email: useNumbersToEnglish(email.value.toLowerCase()),
            subject: subject.value,
            message: message.value,
        })
        .then((response) => {
            toast.success(t(`contact-us.successSendMessage`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            localStorage.setItem("ck_S", Date.now());
        })
        .catch((err) => {
            if (typeof err.response !== "undefined" && err.response.data) {
                const errors = err.response.data.errors || err.response.data.message;
                if (typeof errors === "object") {
                    responseMessage.value = errors[0].errors[0];
                    errorField.value = errors[0].property;
                }
            } else responseMessage.value = t("Something went wrong!");
            // TODO : log errors in sentry type thing
        })
        .finally(() => (sending.value = false));
};
</script>
