<style scoped>
.insta-gradient {
    background-image: linear-gradient(87.28deg, #e2d55a -2.39%, #cb30e5 36.32%, rgba(248, 65, 163, 0.88) 75.04%, rgba(235, 97, 97, 0.94) 109.79%);
}

.box {
    background-image: linear-gradient(90deg, rgba(159, 116, 205, 0.7) 0%, rgba(126, 207, 225, 0.7) 100%);
    backdrop-filter: blur(25px);
    border: 0.65rem solid theme("colors.neutral.700");
    border-radius: 1.25rem;
}
</style>

<template>
    <footer class="relative flex flex-col items-center gap-12 p-2 px-6 md:px-8 w-full bg-neutral-700">
        <!-- TODO: make the box a component so it can be change or undisplayed base on routes -->
        <div class="box relative flex flex-wrap items-center justify-between gap-4 w-full max-w-4xl p-16 md:py-2 -mt-56 overflow-hidden">
            <div class="flex flex-col gap-6 items-center md:items-start w-full max-w-md">
                <h4 class="f-inter font-extrabold text-4xl text-center md:text-start">Start Building Your First Menu For Free</h4>
                <Button class="border-4 border-black py-3" type="primary" linkTo=""
                    ><span class="text-white text-lg font-bold">Sign Up Now For Free</span></Button
                >
            </div>
            <img class="hidden md:flex -mb-2" src="~/assets/images/iPhone.webp" alt="iPhone" />
        </div>
        <div class="flex flex-wrap items-center justify-center lg:justify-between gap-16 md:p-0 w-full max-w-screen-xl">
            <div class="flex flex-col items-start gap-6">
                <div class="flex items-center gap-4">
                    <div class="gradient-re flex items-center justify-center p-1 rounded-md">
                        <img class="w-20 h-20 -ml-0.5" src="/logo.svg" alt="Menuriom" />
                    </div>
                    <div class="flex flex-col items-start">
                        <img class="h-18" src="/logo-text-white.svg" alt="Menuriom" />
                        <small class="text-white text-xs -mt-1.5">The Best Way To Create Digital Menus</small>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-6">
                    <a class="insta-gradient flex items-center gap-2 rounded-xl p-2" href="" title="Follow Us On Instagram">
                        <Icon class="w-8 h-8 bg-white" name="instagram.svg" folder="icons" size="32px" />
                        <small class="text-white">Follow Us On Instagram</small>
                    </a>
                    <a class="flex items-center gap-2" href="mailto:menuriom@gmail.com" title="menuriom email address">
                        <Icon class="w-4 h-4 bg-white" name="envelop.svg" folder="icons" size="16px" />
                        <span class="text-white">Menuriom@gmail.com</span>
                    </a>
                </div>
            </div>
            <nav class="flex flex-wrap items-center gap-10 md:gap-16">
                <ul class="flex flex-col items-center md:items-start gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/pricing">Pricing</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/faqs">Faqs</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/about">About</nuxt-link>
                    </li>
                </ul>
                <ul class="flex flex-col items-center md:items-start gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/request-feature">Request Feature</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/contact">Contact Us</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/help-center">Help Center</nuxt-link>
                    </li>
                </ul>
                <ul class="flex flex-col items-center md:items-start gap-5">
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/privacy-policy">Privacy Policy</nuxt-link>
                    </li>
                    <li class="pb-1 w-max border-b-2 border-transparent hover:border-violet group">
                        <nuxt-link class="text-white group-hover:text-purple-300" to="/terms">Term Of Service</nuxt-link>
                    </li>
                    <LangSwitch :showText="true" textColor="white" />
                </ul>
            </nav>
        </div>
        <hr class="gradient-re w-full max-w-screen-xl h-0.5 border-0 -my-4" />
        <div class="flex flex-col items-center gap-2">
            <span class="f-inter text-sm text-white">Default.Co © {{ year }}. All rights reserved.</span>
            <small class="text-white text-xs">Made With <b class="text-rose-400">❤</b> by the 2Idiots</small>
        </div>
    </footer>
</template>

<script setup>
import Icon from "~/components/Icon.vue";
import LangSwitch from "~/components/LangSwitch.vue";
import Button from "~/components/web/Button.vue";

const year = new Date(Date.now()).getFullYear();
</script>
