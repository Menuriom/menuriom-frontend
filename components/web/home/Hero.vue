<style scoped>
.gradient {
    background-image: linear-gradient(90deg, theme("colors.baby-blue") 0%, theme("colors.violet") 100%);
}

@media (min-width: 768px) {
    .big-text {
        line-height: 5rem;
    }
}
</style>

<template>
    <div class="gradient relative flex justify-center items-end w-screen max-w-screen-lg xl:max-w-screen-2xl rounded-lg p-1.5">
        <section
            class="flex flex-col 1.5xl:flex-row items-center xl:items-start sm:gap-10 xl:gap-0 w-full p-4 lg:p-10 py-10 lg:py-20 bg-pencil-tip rounded-md"
            title="Hero"
        >
            <div class="relative flex flex-col items-center xl:items-start gap-6 md:gap-8 text-white w-full max-w-3xl z-2">
                <div class="flex items-end gap-0.5 xl:w-full -mb-4 md:-mb-6 xl:mb-0">
                    <span class="text-xs xl:text-base text-center">Creating a digital menu has never been easier.</span>
                    <span class="hidden xl:flex flex-grow bg-white h-0.5 mb-1.5"></span>
                </div>
                <div class="flex items-center">
                    <h1 class="big-text flex flex-col items-center xl:items-start text-4xl 2sm:text-5xl md:text-6xl font-bold">
                        <span class="f-inter text-center">The Best Way To Create</span>
                        <div class="flex items-center gap-4">
                            <span class="gradient-text f-inter">QR Menus</span>
                            <img class="hidden sm:flex w-14 xl:w-18 mt-2 border-4 border-gray-300 bg-white p-0.5 rounded-md" src="/qr.svg" alt="QR" />
                        </div>
                    </h1>
                </div>
                <p class="text-center xl:text-start text-sm md:text-xl opacity-80">
                    Any good restaurant needs a good menu.
                    <br />
                    With Menuriom build and manage your restaurant menu with ease.
                </p>
                <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-4">
                    <!-- TODO : chnage the button when user is logged in to "head to dashboard" and "help center or how to start your first menu" -->
                    <Button class="" type="primary" linkTo="/authenticate" v-if="!user.email.value">
                        <span class="text-lg font-bold">Try It For Free</span>
                    </Button>
                    <Button class="" type="primary" linkTo="/brand-panel" v-else>
                        <span class="text-lg font-bold">Head To Dashboard</span>
                    </Button>
                    OR
                    <Button class="border-2 sm:py-3.5 border-white" type="secondary" linkTo="/demo" v-if="!user.email.value">
                        <span class="text-lg font-bold">Check The Demo</span>
                    </Button>
                    <Button class="border-2 sm:py-3.5 border-white" type="secondary" linkTo="/help-center" v-else>
                        <span class="text-lg font-bold">Learn How To Create</span>
                    </Button>
                </div>
            </div>
            <HeroImage />
        </section>
        <div class="xl:absolute hidden xl:flex items-center justify-center w-32 h-32 rounded-full -mb-20 bg-white">
            <img class="absolute top-4" src="~/assets/images/scroll-down.svg" alt="scroll-down" />
            <img class="down-pop" src="~/assets/images/arrow-down.png" alt="arrow-down" />
        </div>
    </div>
</template>

<script setup>
import HeroImage from "~/components/web/home/HeroImage.vue";
import Button from "~/components/web/Button.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const user = storeToRefs(userStore);
</script>
