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
    <div class="flex flex-col items-center justify-center gap-4">
        <div class="flex flex-col items-center gap-6 w-full md:w-max max-w-md p-6 md:p-8 bg-pencil-tip rounded-lg shadow-2xl overflow-hidden">
            <div class="gradient-re flex items-center justify-center w-max p-1 rounded-md">
                <img class="w-16 h-16 -ml-0.5" src="/logo.svg" alt="Menuriom" />
            </div>
            <transition name="slide-left" mode="out-in">
                <section class="flex flex-col items-center justify-center gap-6 w-full text-white" page="1" v-if="page == 1">
                    <div class="flex flex-col items-center gap-1 w-full">
                        <h1 class="f-inter text-3xl font-semibold">Welcome to Menuriom</h1>
                        <h2 class="text-sm font-thin opacity-60">Login or signup with your email</h2>
                    </div>
                    <button
                        class="flex items-center justify-center gap-2 p-3 w-full border-2 border-white hover:bg-white hover:text-pencil-tip rounded transition-colors"
                    >
                        <img src="~/assets/images/G.png" alt="G" />
                        <span>Continue with Google</span>
                    </button>
                    <div class="flex items-center gap-2 w-full">
                        <hr class="gradient w-1 h-1 border-0 flex-grow" />
                        OR
                        <hr class="gradient-re w-1 h-1 border-0 flex-grow" />
                    </div>
                    <form class="flex flex-col gap-4 w-full" @submit.prevent="sendVerificationCode()">
                        <Input
                            name="email"
                            iconName="envelop.svg"
                            :required="true"
                            type="email"
                            placeholder="Email Address"
                            v-model="email"
                            :error="errorField == 'email' ? responseMessage : ''"
                        />
                        <button
                            class="btn flex items-center justify-center w-full p-3 rounded bg-violet"
                            :class="{ 'opacity-75 cursor-not-allowed': loading }"
                            :disabled="loading"
                        >
                            <span v-if="!loading"> Continue </span>
                            <Loading class="" v-else />
                        </button>
                    </form>
                    <small class="text-xs font-thin opacity-50">
                        By signing up, you agree to the Menuriom <a class="underline" href="/privacy-policy">Privacy Policy</a> and
                        <a class="underline" href="/terms">Terms of Service</a>.
                    </small>
                </section>
                <section class="flex flex-col items-center justify-center gap-6 w-full text-white" page="2" v-else-if="page == 2">
                    <div class="flex flex-col items-center gap-1 w-full">
                        <h1 class="f-inter text-3xl font-semibold">Check Your Email</h1>
                        <h2 class="text-sm font-thin text-center">
                            <span class="opacity-60">we sent</span> <span class="underline opacity-90">{{ email }}</span>
                            <span class="opacity-60"> a verfication code. Type or paste it below to continue.</span>
                        </h2>
                    </div>
                    <form class="flex flex-col gap-4 w-full" @submit.prevent="checkVerificationCode()">
                        <Input
                            name="code"
                            iconName="code.svg"
                            :required="true"
                            type="text"
                            placeholder="Verfication Code"
                            v-model="code"
                            :error="errorField == 'code' ? responseMessage : ''"
                        />
                        <button class="btn w-full p-3 rounded bg-violet" :class="{ 'opacity-75 cursor-not-allowed': loading }" :disabled="loading">
                            <span v-if="!loading"> Continue </span>
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
                        Resend Code
                        <span v-if="timeLeft">{{ new Date(timeLeft * 1000).toISOString().substring(14, 19) }}</span>
                    </button>
                </section>
                <section class="flex flex-col items-center justify-center gap-6 w-full text-white" page="2" v-else-if="page == 3">
                    <div class="flex flex-col items-center gap-1 w-full">
                        <h1 class="f-inter text-3xl font-semibold">Almost Done</h1>
                        <h2 class="text-sm font-thin text-center">
                            <span class="opacity-60">
                                Please complete your profile infor to <br />
                                finish up the signup
                            </span>
                        </h2>
                    </div>
                    <form class="flex flex-col gap-4 w-full" @submit.prevent="completeSignup()">
                        <div class="flex items-center gap-4">
                            <Input
                                name="name"
                                :required="true"
                                type="text"
                                placeholder="First Name"
                                v-model="name"
                                :error="errorField == 'name' ? responseMessage : ''"
                            />
                            <Input
                                name="family"
                                :required="true"
                                type="text"
                                placeholder="Last Name"
                                v-model="family"
                                :error="errorField == 'family' ? responseMessage : ''"
                            />
                        </div>
                        <MobileInput
                            name="mobile"
                            :required="true"
                            type="text"
                            iconName="Mobile-phone.svg"
                            placeholder="Phone Number"
                            v-model="mobile"
                            :error="errorField == 'mobile' ? responseMessage : ''"
                        />
                        <Input
                            name="size"
                            iconName="Stack.svg"
                            type="number"
                            placeholder="Business Size"
                            v-model="size"
                            :error="errorField == 'size' ? responseMessage : ''"
                        />
                        <button class="btn w-full p-3 rounded bg-violet" :class="{ 'opacity-75 cursor-not-allowed': loading }" :disabled="loading">
                            <span v-if="!loading"> Signup </span>
                            <Loading class="" v-else />
                        </button>
                    </form>
                </section>
            </transition>
        </div>
        <nav>
            <ul class="flex flex-wrap items-center justify-center gap-2 p-2 text-white">
                <li><nuxt-link class="hover:underline text-xs" to="/">Menuriom.com</nuxt-link></li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li><nuxt-link class="hover:underline text-xs" to="/pricing">Pricing</nuxt-link></li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li><nuxt-link class="hover:underline text-xs" to="/help-center">Help Center</nuxt-link></li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li><nuxt-link class="hover:underline text-xs" to="/faqs">Faqs</nuxt-link></li>
                <span class="w-1 h-1 bg-baby-blue rounded-full"></span>
                <li><nuxt-link class="hover:underline text-xs" to="/privacy-policy">Privacy Policy</nuxt-link></li>
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
import { useUserStore } from "@/stores/user";
import axios from "axios";

useHead({ title: `Login | Signup - Menuriom` });
definePageMeta({ layout: "auth", middleware: ["guest-gate"] });

const user = useUserStore();
const router = useRouter();

const page = ref("1");
const loading = ref(false);

const email = ref("");

const code = ref("");
const canResend = ref(false);
const timeLeft = ref(300);

const name = ref("");
const family = ref("");
const mobile = ref(null);
const size = ref(null);

const errorField = ref("");
const responseMessage = ref("");

onMounted(() => {
    setInterval(() => {
        if (timeLeft.value) {
            timeLeft.value = Math.max(0, timeLeft.value - 1);
            canResend.value = false;
        } else canResend.value = true;
    }, 1000);
});

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
                if (typeof e.response.data.message === "object") {
                    responseMessage.value = e.response.data.message[0].errors[0];
                    errorField.value = e.response.data.message[0].property;
                }
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
        .then(async (response) => {
            if (response.data.register) {
                page.value = 3;
                name.value = family.value = mobile.value = size.value = "";
            } else {
                await Promise.all([user.getUserInfo(), user.setRefreshInterval()]);
                // base on user's role redirect to admin or user panel
                switch (user.info.role) {
                    case "admin":
                        await router.push("/admin-panel");
                        break;
                    case "user":
                        await router.push("/user-panel");
                        break;
                }
            }
        })
        .catch((e) => {
            if (typeof e.response !== "undefined" && e.response.data) {
                if (typeof e.response.data.message === "object") {
                    responseMessage.value = e.response.data.message[0].errors[0];
                    errorField.value = e.response.data.message[0].property;
                }
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
            size: size.value,
        })
        .then(async (response) => {
            await Promise.all([user.getUserInfo(), user.setRefreshInterval()]);
            await router.push("/user-panel");
        })
        .catch((e) => {
            if (typeof e.response !== "undefined" && e.response.data) {
                if (typeof e.response.data.message === "object") {
                    responseMessage.value = e.response.data.message[0].errors[0];
                    errorField.value = e.response.data.message[0].property;
                }
            }
        })
        .finally(() => (loading.value = false));
};
</script>
