<style scoped>
.btn {
    transition: all 0.2s;
    box-shadow: 3px 3px 1px 1px rgba(255, 255, 255, 15%);
    cursor: pointer;
}
.btn:hover {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 1px 1px rgba(255, 255, 255, 15%);
}
</style>

<template>
    <!-- TODO : refactor the stage 3 business size to be a check box rather than a simple user input -->
    <div class="flex flex-col items-center justify-center gap-4">
        <div class="flex flex-col items-center gap-6 w-full md:w-max max-w-md p-6 md:p-8 bg-pencil-tip rounded-lg shadow-2xl overflow-hidden">
            <div class="gradient-re flex items-center justify-center w-max p-1 rounded-md">
                <img class="w-16 h-16 -ml-0.5" src="/logo.svg" alt="Menuriom" />
            </div>
            <transition name="slide-left" mode="out-in">
                <section class="flex flex-col items-center justify-center gap-6 w-full text-white" page="1" v-if="page == 1">
                    <div class="flex flex-col items-center gap-2 w-full">
                        <h1 class="f-inter text-3xl font-semibold">{{ $t("auth.welcome") }}</h1>
                        <h2 class="text-sm font-thin opacity-60">{{ $t("auth.Login or signup with your email") }}</h2>
                    </div>
                    <button
                        class="flex items-center justify-center gap-2 p-3 w-full border-2 border-white hover:bg-white hover:text-pencil-tip rounded transition-colors"
                        @click="continueWithGoogle()"
                    >
                        <img src="~/assets/images/G.png" alt="G" />
                        <span>{{ $t("auth.Continue with Google") }}</span>
                    </button>
                    <div class="flex items-center gap-2 w-full">
                        <hr class="gradient w-1 h-1 border-0 flex-grow" />
                        {{ $t("auth.OR") }}
                        <hr class="gradient-re w-1 h-1 border-0 flex-grow" />
                    </div>
                    <form class="flex flex-col gap-4 w-full" @submit.prevent="sendVerificationCode()">
                        <Input
                            name="email"
                            iconName="envelop.svg"
                            :required="true"
                            type="email"
                            :placeholder="$t('auth.Email Address')"
                            v-model="email"
                            :error="errorField == 'email' ? responseMessage : ''"
                        />
                        <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                        </small>
                        <button
                            class="btn flex items-center justify-center w-full p-3 rounded bg-violet"
                            :class="{ 'opacity-75 cursor-not-allowed': loading }"
                            :disabled="loading"
                        >
                            <span v-if="!loading"> {{ $t("auth.Continue") }} </span>
                            <Loading class="" v-else />
                        </button>
                    </form>
                    <small
                        class="text-xs font-thin opacity-50"
                        v-html="
                            $t('auth.sign up term agreement message', {
                                PrivacyPolicy: `<a class='underline' href='/privacy-policy'>${$t('auth.Privacy Policy')}</a>`,
                                TermsOfService: `<a class='underline' href='/terms'>${$t('auth.Terms of Service')}</a>`,
                            })
                        "
                    />
                </section>
                <section class="flex flex-col items-center justify-center gap-6 w-full text-white" page="2" v-else-if="page == 2">
                    <div class="flex flex-col items-center gap-2 w-full">
                        <h1 class="f-inter text-3xl font-semibold">{{ $t("auth.Check Your Email") }}</h1>
                        <h2 class="text-sm font-thin text-center" v-html="$t('auth.sent code message', { email: email })" />
                    </div>
                    <form class="flex flex-col gap-4 w-full" @submit.prevent="checkVerificationCode()">
                        <Input
                            name="code"
                            iconName="code.svg"
                            :required="true"
                            type="text"
                            :placeholder="$t('auth.Verfication Code')"
                            v-model="code"
                            :error="errorField == 'code' ? responseMessage : ''"
                        />
                        <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                        </small>
                        <button class="btn w-full p-3 rounded bg-violet" :class="{ 'opacity-75 cursor-not-allowed': loading }" :disabled="loading">
                            <span v-if="!loading"> {{ $t("auth.Continue") }} </span>
                            <Loading class="" v-else />
                        </button>
                    </form>
                    <button
                        class="text-xs font-thin opacity-90 underline"
                        type="button"
                        @click="resendCode()"
                        :class="{ 'opacity-50 cursor-not-allowed': !canResend }"
                        :disabled="!canResend"
                    >
                        {{ $t("auth.Resend Code") }}
                        <span v-if="timeLeft">{{ new Date(timeLeft * 1000).toISOString().substring(14, 19) }}</span>
                    </button>
                </section>
                <section class="flex flex-col items-center justify-center gap-6 w-full text-white" page="3" v-else-if="page == 3">
                    <div class="flex flex-col items-center gap-2 w-full">
                        <h1 class="f-inter text-3xl font-semibold">{{ $t("auth.Almost Done") }}</h1>
                        <h2 class="text-sm font-thin text-center">
                            <span class="opacity-60"> {{ $t("auth.complete signup message") }} </span>
                        </h2>
                    </div>
                    <form class="flex flex-col gap-4 w-full" @submit.prevent="completeSignup()">
                        <div class="flex items-center gap-4">
                            <Input
                                name="name"
                                :required="true"
                                type="text"
                                :placeholder="$t('auth.First Name')"
                                v-model="name"
                                :error="errorField == 'name' ? responseMessage : ''"
                            />
                            <Input
                                name="family"
                                :required="true"
                                type="text"
                                :placeholder="$t('auth.Last Name')"
                                v-model="family"
                                :error="errorField == 'family' ? responseMessage : ''"
                            />
                        </div>
                        <MobileInput
                            name="mobile"
                            :required="true"
                            type="text"
                            iconName="Mobile-phone.svg"
                            :placeholder="$t('auth.Phone Number')"
                            v-model="mobile"
                            :error="errorField == 'mobile' ? responseMessage : ''"
                        />
                        <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                            <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                        </small>
                        <button class="btn w-full p-3 rounded bg-violet" :class="{ 'opacity-75 cursor-not-allowed': loading }" :disabled="loading">
                            <span v-if="!loading"> {{ $t("auth.Signup") }} </span>
                            <Loading class="" v-else />
                        </button>
                    </form>
                </section>
            </transition>
        </div>
        <nav>
            <ul class="flex flex-wrap items-center justify-center gap-2 p-2 text-white">
                <li>
                    <nuxt-link class="hover:underline text-xs" :to="localePath('/')">{{ $t("auth.MenuriomDotCom") }}</nuxt-link>
                </li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li>
                    <nuxt-link class="hover:underline text-xs" :to="localePath('/pricing')">{{ $t("auth.Pricing") }}</nuxt-link>
                </li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li>
                    <nuxt-link class="hover:underline text-xs" :to="localePath('/help-center')">{{ $t("auth.Help Center") }}</nuxt-link>
                </li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li>
                    <nuxt-link class="hover:underline text-xs" :to="localePath('/faqs')">{{ $t("auth.Faqs") }}</nuxt-link>
                </li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li>
                    <nuxt-link class="hover:underline text-xs" :to="localePath('/privacy-policy')">{{ $t("auth.Privacy Policy") }}</nuxt-link>
                </li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li><LangSwitch textColor="white" /></li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import MobileInput from "~/components/form/MobileInput.vue";
import Button from "~/components/web/Button.vue";
import LangSwitch from "~/components/LangSwitch.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";

useHead({ title: `Login | Signup - Menuriom` });
definePageMeta({ layout: "auth", middleware: ["guest-gate"] });

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const localePath = useLocalePath();
const { locale, t } = useI18n();

const error = route.query.error;

const page = ref("1");
const loading = ref(false);

const email = ref("");

const code = ref("");
const canResend = ref(false);
const timeLeft = ref(300);

const name = ref("");
const family = ref("");
const mobile = ref(null);

const errorField = ref("");
const responseMessage = ref("");

onMounted(() => {
    setInterval(() => {
        if (timeLeft.value) {
            timeLeft.value = Math.max(0, timeLeft.value - 1);
            canResend.value = false;
        } else canResend.value = true;
    }, 1000);

    switch (error) {
        case "1":
            responseMessage.value = t("auth.error1");
            break;
        case "2":
            responseMessage.value = t("auth.error2");
            break;
    }
});

const continueWithGoogle = async () => {
    const response_type = "code";
    const redirect_uri = `${config.public.BASE_URL}/auth/login/google/callback`;
    const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    window.location.href = encodeURI(
        `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${config.public.GOOGLE_LOGIN_CLIENT_ID}` +
            `&response_type=${response_type}` +
            `&redirect_uri=${redirect_uri}` +
            `&scope=${scope}`
    );
};

const sendVerificationCode = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/auth/send-code`, { username: useNumbersToEnglish(email.value.toLowerCase()) })
        .then((response) => {
            page.value = 2;
            timeLeft.value = response.data.expireIn;
        })
        .catch((e) => {
            if (typeof e.response !== "undefined" && e.response.data) {
                const errors = e.response.data.errors || e.response.data.message;
                responseMessage.value = errors[0].errors[0];
                errorField.value = errors[0].property;
            }
        })
        .finally(() => (loading.value = false));
};

const checkVerificationCode = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/auth/verify-code`, {
            username: useNumbersToEnglish(email.value.toLowerCase()),
            code: useNumbersToEnglish(code.value),
        })
        .then((response) => {
            if (response.data.register) {
                page.value = 3;
                name.value = family.value = mobile.value = size.value = "";
            } else {
                userStore.setRefreshInterval();
                router.push(localePath("/brand-panel"));
            }
        })
        .catch((e) => {
            if (typeof e.response !== "undefined" && e.response.data) {
                const errors = e.response.data.errors || e.response.data.message;
                responseMessage.value = errors[0].errors[0];
                errorField.value = errors[0].property;
                // TODO
                // if the property is "" then make a global error either on top of the continue button or as a toast message
            }
        })
        .finally(() => (loading.value = false));
};

const resendCode = () => {
    if (!canResend.value) return;
    sendVerificationCode();
};

const completeSignup = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/auth/complete-info`, {
            username: useNumbersToEnglish(email.value.toLowerCase()),
            code: useNumbersToEnglish(code.value),
            name: name.value,
            family: family.value,
            mobile: mobile.value,
        })
        .then((response) => {
            userStore.setRefreshInterval();
            router.push(localePath("/brand-panel"));
        })
        .catch((e) => {
            if (typeof e.response !== "undefined" && e.response.data) {
                const errors = e.response.data.errors || e.response.data.message;
                responseMessage.value = errors[0].errors[0];
                errorField.value = errors[0].property;
            }
        })
        .finally(() => (loading.value = false));
};
</script>
