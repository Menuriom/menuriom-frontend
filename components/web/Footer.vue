<style scoped>
.insta-gradient {
    position: relative;
    z-index: 1;
    background-image: linear-gradient(87.28deg, #e2d55a -2.39%, #cb30e5 36.32%, rgba(248, 65, 163, 0.88) 75.04%, rgba(235, 97, 97, 0.94) 109.79%);
}
.insta-gradient::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    background: linear-gradient(270.28deg, #e2d55a -2.39%, #cb30e5 36.32%, rgba(248, 65, 163, 0.88) 75.04%, rgba(235, 97, 97, 0.94) 109.79%);
    opacity: 0;
    transition: opacity 0.4s;
    z-index: -1;
}
.insta-gradient:hover::before {
    opacity: 1;
}
/* .insta-gradient:hover {
    background-size: 300% 200%;
    animation: gradient-wave 15s ease infinite;
} */

.box {
    background-image: linear-gradient(90deg, rgba(159, 116, 205, 0.7) 0%, rgba(126, 207, 225, 0.7) 100%);
    backdrop-filter: blur(25px);
    border: 0.65rem solid theme("colors.neutral.700");
    border-radius: 1.25rem;
}
</style>

<template>
    <footer class="relative flex flex-col items-center gap-12 p-2 px-6 md:px-8 w-full bg-neutral-700">
        <div
            class="box relative flex flex-col items-center justify-center gap-4 w-full max-w-4xl p-10 sm:p-16 sm:py-10 -mt-40 lg:-mt-56 overflow-hidden"
            v-if="route.path == '/features'"
        >
            <img src="~/assets/images/icons/light.png" alt="light" />
            <h4 class="f-inter font-extrabold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-start">
                {{ $t("footer.Looking For A Feature You Can’t Find?") }}
            </h4>
            <p class="md:text-lg text-center">
                {{ $t("footer.Tell us what you want, we will get to work on implementing it") }}
            </p>
            <Button class="border-4 border-black px-1 py-3 mt-4" type="primary" :linkTo="localePath('/request-feature')">
                <span class="text-white text-sm sm:text-lg font-bold whitespace-nowrap">
                    {{ $t("footer.Submit A Feature Request") }}
                </span>
            </Button>
        </div>
        <div
            class="box relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 w-full max-w-4xl p-10 sm:p-16 lg:py-2 -mt-40 lg:-mt-56 overflow-hidden"
            v-else
        >
            <div class="flex flex-col gap-6 items-center lg:items-start w-full max-w-md">
                <h4 class="f-inter font-extrabold text-2xl sm:text-3xl lg:text-4xl/[3rem] text-center lg:text-start">
                    {{ $t("footer.Start Building Your First Menu For Free") }}
                </h4>
                <Button class="border-4 border-black px-1 py-3" type="primary" linkTo="">
                    <span class="text-white text-sm sm:text-lg font-bold whitespace-nowrap">
                        {{ $t("footer.Sign Up Now For Free") }}
                    </span>
                </Button>
            </div>
            <img class="w-40 lg:w-auto -mb-16 md:-mb-24 lg:-mb-2" src="~/assets/images/iPhone.webp" alt="iPhone" />
        </div>
        <div class="flex flex-wrap items-center justify-center lg:justify-between gap-16 w-full max-w-screen-xl">
            <div class="flex flex-col items-start gap-6">
                <div class="flex flex-wrap justify-center items-center gap-4">
                    <div class="gradient-re flex items-center justify-center p-1 rounded-md">
                        <img class="w-20 h-20 -ml-0.5" src="/logo.svg" alt="Menuriom" />
                    </div>
                    <div class="flex flex-col items-start">
                        <img class="h-18" src="/logo-text-white.svg" alt="Menuriom" v-if="locale == 'en'" />
                        <img class="h-18" src="/logo-text-white-fa.svg" alt="منوریوم" v-if="locale == 'fa'" />
                        <small class="text-white text-xs -mt-1.5" :class="{ 'ms-10': locale == 'fa' }">
                            {{ $t("footer.The Best Way To Create Online Menus") }}
                        </small>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center items-center gap-6">
                    <a class="insta-gradient flex items-center gap-2 rounded-xl p-2" href="" title="Follow Us On Instagram">
                        <Icon class="w-8 h-8 bg-white" name="instagram.svg" folder="icons" size="32px" />
                        <small class="text-white">{{ $t("footer.Follow Us On Instagram") }}</small>
                    </a>
                    <a class="flex items-center gap-2" href="mailto:menuriom@gmail.com" title="menuriom email address">
                        <Icon class="w-4 h-4 bg-white" name="envelop.svg" folder="icons" size="16px" />
                        <span class="text-white">Menuriom@gmail.com</span>
                    </a>
                </div>
            </div>
            <nav class="flex flex-col sm:flex-row flex-wrap items-center gap-10 md:gap-16">
                <ul class="flex flex-col items-center md:items-start gap-3 sm:gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/pricing')">{{ $t("footer.Pricing") }}</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/faqs')">{{ $t("footer.Faqs") }}</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/about')">{{ $t("footer.About") }}</nuxt-link>
                    </li>
                </ul>
                <ul class="flex flex-col items-center md:items-start gap-3 sm:gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/request-feature')">
                            {{ $t("footer.Request Feature") }}
                        </nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/contact')">{{ $t("footer.Contact Us") }}</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/help-center')">{{ $t("footer.Help Center") }}</nuxt-link>
                    </li>
                </ul>
                <ul class="flex flex-col items-center md:items-start gap-3 sm:gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/privacy-policy')">
                            {{ $t("footer.Privacy Policy") }}
                        </nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" :to="localePath('/terms')">{{ $t("footer.Term Of Service") }}</nuxt-link>
                    </li>
                    <LangSwitch :showText="true" textColor="white" />
                </ul>
            </nav>
        </div>
        <hr class="gradient-re w-full max-w-screen-xl h-0.5 border-0 -my-4 -mb-8" />
        <div class="flex flex-col items-center gap-2 mb-2">
            <span class="f-inter text-xs sm:text-sm text-center text-white"> Menuriom.com © {{ year }} - {{ $t("footer.copyright") }} </span>
            <!-- <small class="text-white text-xs">Made With <b class="text-rose-400">❤</b> by the 2Idiots</small> -->
        </div>
    </footer>
</template>

<script setup>
import Icon from "~/components/Icon.vue";
import LangSwitch from "~/components/LangSwitch.vue";
import Button from "~/components/web/Button.vue";

const route = useRoute();
const localePath = useLocalePath();
const { locale } = useI18n();

const year = new Date(Date.now()).getFullYear();
</script>
