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
        <div class="flex flex-col items-center gap-6 w-full md:w-max max-w-md p-6 md:p-8 bg-pencil-tip rounded-lg shadow-2xl">
            <div class="gradient-re flex items-center justify-center w-max p-1 rounded-md">
                <img class="w-16 h-16 -ml-0.5" src="/logo.svg" alt="Menuriom" />
            </div>
            <section class="flex flex-col items-center justify-center gap-6 w-full text-white" page="1">
                <div class="flex flex-col items-center gap-1 w-full">
                    <h1 class="f-inter text-3xl font-semibold">Welcome to Menuriom</h1>
                    <h2 class="text-sm font-thin opacity-60">Login or register with your email</h2>
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
                <form class="flex flex-col gap-4 w-full" @submit="sendVerificationCode()">
                    <Input
                        name="email"
                        iconName="envelop.svg"
                        :required="true"
                        type="email"
                        placeholder="Email Address"
                        v-model="email"
                        :error="errorField == 'email' ? responseMessage : ''"
                    />
                    <button class="btn w-full p-3 rounded bg-violet">Continue</button>
                </form>
                <small class="text-xs font-thin opacity-50">
                    By signing up, you agree to the Menuriom <a class="underline" href="/privacy-policy">Privacy Policy</a> and
                    <a class="underline" href="/terms">Terms of Service</a>.
                </small>
            </section>
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
import Button from "~/components/web/Button.vue";
import LangSwitch from "~/components/LangSwitch.vue";

useHead({ title: `Login | Signup` });
definePageMeta({ layout: "auth" });

const email = ref("");

const errorField = ref("");
const responseMessage = ref("");

const sendVerificationCode = () => {};
</script>
