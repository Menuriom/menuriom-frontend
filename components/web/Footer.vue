<style scoped>
.insta-gradient {
    position: relative;
    z-index: 1;
    background-image: linear-gradient(45.28deg, #e2d55a 1.39%, rgba(235, 97, 97, 0.94) 36.32%, rgba(248, 65, 163, 0.88) 75.04%, #cb30e5 109.79%);
}
.insta-gradient::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    background: linear-gradient(220.28deg, #e2d55a 2.39%, rgba(235, 97, 97, 0.94) 36.32%, rgba(248, 65, 163, 0.88) 75.04%, #cb30e5 109.79%);
    opacity: 0;
    transition: opacity 0.4s;
    z-index: -1;
}
.insta-gradient:hover::before {
    opacity: 1;
}

.box {
    background-image: linear-gradient(90deg, rgba(152, 199, 208, 0.8) 0%, rgba(156, 133, 178, 0.8) 100%);
    backdrop-filter: blur(25px);
    border: 0.65rem solid theme("colors.bgAccent");
    border-radius: 2rem;
}

.wrapper {
    display: grid;
    grid-template-columns: auto 0fr;
    transition: all 0.3s;
}
@media (min-width: 720px) {
    .wrapper:hover {
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
    }
}
</style>

<template>
    <footer class="relative flex flex-col items-center gap-12 p-2 px-6 md:px-8 w-full bg-bgAccent">
        <div class="box flex flex-wrap lg:flex-nowrap items-end justify-center gap-4 w-full max-w-4xl p-10 px-16 -mt-40 lg:-mt-56">
            <div class="flex flex-col gap-6 items-center lg:items-start w-full max-w-md self-center">
                <h4 class="f-inter font-extrabold text-2xl sm:text-3xl lg:text-4xl/[3rem] text-center lg:text-start">
                    {{ $t("footer.Start Building Your First Menu For Free") }}
                </h4>
                <button
                    class="bg-fgPrimary text-bgPrimary p-4 px-6 hover:px-10 text-xl font-bold rounded-xl hover:shadow-mr15 transition-all"
                    :to="localePath('/authenticate')"
                >
                    {{ $t("footer.Sign Up Now For Free") }}
                </button>
            </div>
            <img class="w-64 lg:w-auto lg:-mt-28 -mb-10" src="~/assets/images/iPhone.webp" alt="iPhone" />
        </div>
        <div class="flex flex-wrap items-center justify-start lg:justify-between gap-16 w-full max-w-screen-xl">
            <div class="flex flex-col items-start gap-10">
                <div class="flex flex-wrap justify-center items-center gap-4">
                    <div class="rounded-xl p-2 bg-gradient-to-t from-primary to-secondary">
                        <img class="w-16 md:w-20 aspect-square" src="/logos/logo9-dark.webp" alt="Menuriom" />
                    </div>
                    <div class="flex flex-col items-start gap-2">
                        <img class="h-12" src="/logos/logo-text-en-light.svg" alt="Menuriom" v-if="locale == 'en'" />
                        <img class="h-12" src="/logos/logo-text-fa-light.svg" alt="منوریوم" v-if="locale == 'fa'" />
                        <small class="text-fgPrimary text-xs opacity-75">
                            {{ $t("footer.The Best Way To Manage Orders") }}
                        </small>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center items-center gap-4">
                    <a class="insta-gradient wrapper items-center rounded-xl p-2 overflow-hidden group" href="" title="Follow Us On Instagram">
                        <span class="drop-shadow-md">
                            <Icon class="w-8 h-8 bg-fgPrimary shrink-0" name="instagram.svg" folder="icons" size="32px" />
                        </span>
                        <small class="text-fgPrimary whitespace-nowrap overflow-hidden">
                            {{ $t("footer.Follow Us On Instagram") }}
                        </small>
                    </a>
                    <a class="wrapper flex items-center rounded-xl p-2 bg-sky-400" href="" title="Message Us On Telegram">
                        <span class="drop-shadow-md">
                            <Icon class="w-8 h-8 bg-fgPrimary" name="telegram.svg" folder="icons" size="32px" />
                        </span>
                        <small class="text-fgPrimary whitespace-nowrap overflow-hidden">
                            {{ $t("footer.Message Us On Telegram") }}
                        </small>
                    </a>
                    <a
                        class="relative flex items-center gap-3 border border-neutral-500 border-opacity-25 p-3 rounded-xl overflow-hidden isolate group"
                        href="mailto:menuriom@gmail.com"
                        title="menuriom email address"
                    >
                        <span class="absolute inset-0 bg-secondary scale-0 group-hover:scale-100 rounded-xl transition-all -z-10"></span>
                        <Icon class="w-5 h-5 bg-fgPrimary group-hover:bg-bgSecondary" name="envelop.svg" folder="icons" size="20px" />
                        <span class="text-fgPrimary group-hover:text-bgSecondary">Menuriom@gmail.com</span>
                    </a>
                </div>
            </div>
            <nav class="flex flex-wrap items-start gap-10 md:gap-16">
                <ul class="flex flex-col items-start gap-3 sm:gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" :to="localePath('/pricing')">{{ $t("footer.Pricing") }}</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" :to="localePath('/faqs')">{{ $t("footer.Faqs") }}</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" to="http://localhost:3002">{{ $t("footer.Demo") }}</nuxt-link>
                    </li>
                </ul>
                <ul class="flex flex-col items-start gap-3 sm:gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" :to="localePath('/contact-us')">
                            {{ $t("footer.Request Feature") }}
                        </nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" :to="localePath('/contact-us')">
                            {{ $t("footer.Contact Us") }}
                        </nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" to="http://localhost:3003/welcome-to-help-center">
                            {{ $t("footer.Help Center") }}
                        </nuxt-link>
                    </li>
                </ul>
                <ul class="flex flex-col items-start gap-3 sm:gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" :to="localePath('/privacy-policy')">
                            {{ $t("footer.Privacy Policy") }}
                        </nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-primary group">
                        <nuxt-link class="text-fgPrimary group-hover:text-purple-300" :to="localePath('/terms-of-service')">
                            {{ $t("footer.Term Of Service") }}
                        </nuxt-link>
                    </li>
                    <LangSwitch :showText="true" textColor="white" />
                </ul>
            </nav>
        </div>
        <hr class="gradient-re w-full max-w-screen-xl h-0.5 border-0 opacity-50 -my-4 -mb-8" />
        <div class="flex flex-col items-center gap-1 mb-2">
            <span class="f-inter text-xs sm:text-sm text-center text-fgPrimary"> Menuriom.com © {{ year }} - {{ $t("footer.copyright") }} </span>
            <small class="text-fgPrimary text-xs opacity-75">Made With <b class="gradient-text">❤</b> by the Default°Studio</small>
        </div>
    </footer>
</template>

<script setup>
import LangSwitch from "~/components/LangSwitch.vue";

const localePath = useLocalePath();
const { locale } = useI18n();

const year = new Date(Date.now()).getFullYear();
</script>
