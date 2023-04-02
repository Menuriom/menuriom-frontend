<style scoped>
header {
    width: calc(100vw - 2rem);
    backdrop-filter: blur(8px);
}

.link {
    transition: all 0.2s ease-in;
}
</style>

<template>
    <header
        ref="header"
        class="fixed flex items-center justify-between border-2 border-gray-100 rounded-lg mt-4 p-3 max-w-screen-2xl h-14 lg:h-16 bg-white bg-opacity-90 shadow-nr5 z-20"
    >
        <nuxt-link class="flex items-center gap-3 h-7 md:h-9 overflow-hidden" to="/">
            <img class="relative h-7 md:h-9" src="/logo.svg" title="Menuriom" alt="Menuriom" />
            <img class="h-6 md:h-8" src="/logo-text.svg" title="Menuriom" alt="Menuriom" />
        </nuxt-link>

        <nav>
            <ul class="flex items-center gap-8">
                <li class="flex items-center gap-1"><span>Features</span> <img src="/icons/arrow.svg" alt=">" /></li>
                <li class="flex items-center gap-1 hover:underline"><span>Demo</span></li>
                <li class="flex items-center gap-1 hover:underline"><nuxt-link to="/pricing">Pricing</nuxt-link></li>
                <li class="flex items-center gap-1 hover:underline"><span>How It Works</span></li>
                <li class="flex items-center gap-1 hover:underline"><span>Contact Us</span></li>
            </ul>
        </nav>

        <div class="flex items-center gap-4">
            <LangSwitch textColor="black" />
            <span class="text-gray-400">|</span>
            <nuxt-link class="link text-sm p-2 hover:px-3 rounded-md" to="/authenticate" title="Login into user panel">Login</nuxt-link>
            <nuxt-link
                class="link text-sm p-2 hover:px-3 rounded-md bg-violet border-2 border-black text-white shadow-md"
                to="/authenticate"
                title="Try it for free"
            >
                Try It For Free
            </nuxt-link>
        </div>
    </header>
</template>

<script setup>
import LangSwitch from "~/components/LangSwitch.vue";
</script>
