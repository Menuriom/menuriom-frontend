<style scoped>
.list_heads,
.list_checks {
    width: 8rem;
}

@media (min-width: 1024px) {
    .list_heads,
    .list_checks {
        width: 12rem;
    }
}
</style>

<template>
    <section class="flex flex-col-reverse lg:flex-col items-center gap-4 w-full max-w-screen-xl p-8" title="Plan Compression">
        <header class="lg:sticky top-24 hidden sm:flex justify-center lg:items-end gap-1 md:gap-4 w-full z-2">
            <div class="hidden lg:flex flex-grow-0 lg:flex-grow"></div>
            <div
                class="list_heads flex justify-center rounded-lg shadow-nr35"
                :class="[item.highlight ? 'gradient-re p-1.5' : 'bg-pencil-tip']"
                v-for="(item, i) in pricing.list"
                :key="i"
            >
                <div class="flex flex-col gap-1 p-2.5 w-full rounded-md bg-pencil-tip text-white">
                    <div class="flex items-center gap-2 mb-2">
                        <img class="w-5" :src="item.icon" :alt="item.title" />
                        <h3 class="f-inter text-sm lg:text-lg font-extrabold">{{ item.title }}</h3>
                    </div>
                    <div class="flex flex-col lg:flex-row justify-start items-baseline md:gap-1" v-if="item.monthlyPrice > 0">
                        <b class="f-inter text-base md:text-lg">{{ item.monthlyPrice / 1000 }}<span class="text-xs">,000</span></b>
                        <div class="flex items-baseline gap-1">
                            <b class="f-inter text-sm text-baby-blue">Toman</b>
                            <small class="text-[10px]">/month</small>
                        </div>
                    </div>
                    <b class="f-inter text-lg text-baby-blue" v-else>Free</b>
                    <span class="flex w-full h-0.5 bg-neutral-600 mb-4 lg:mb-0"></span>
                    <a
                        class="flex items-center justify-center w-full p-1.5 mt-auto lg:mt-0 text-white rounded hover:translate-y-0.5 transition-transform"
                        :class="[item.highlight ? 'gradient-re' : 'bg-violet']"
                        href="#"
                    >
                        <small>Get Started</small>
                    </a>
                </div>
            </div>
        </header>
        <ul class="flex flex-col w-full">
            <li
                class="flex flex-col lg:flex-row lg:items-center lg:gap-0 w-full py-2 lg:py-0 odd:bg-neutral-100 group"
                v-for="(item, i) in features.list"
                :key="i"
            >
                <h4 class="flex items-center gap-2 flex-grow p-1 lg:p-3 w-full text-center">
                    <span class="lg:hidden flex-grow h-0.5 bg-neutral-400"></span>
                    {{ item.title }} <span class="lg:hidden flex-grow h-0.5 bg-neutral-400"></span>
                </h4>
                <div class="flex items-center justify-center gap-1 md:gap-4 w-full">
                    <div
                        class="relative list_checks flex flex-col items-center justify-center p-2 lg:p-3 bg-pencil-tip rounded-md lg:rounded-none group-first:rounded-t-lg group-last:rounded-b-lg"
                        v-for="(mark, j) in item.marks"
                        :key="j"
                    >
                        <span class="lg:hidden text-white text-xs">{{ pricing.list[j].title }}</span>
                        <Icon class="relative w-6 h-6 bg-baby-blue" name="Check.svg" folder="icons/basil" size="24px" v-if="mark == true" />
                        <Icon class="relative w-6 h-6 bg-neutral-500" name="Cross.svg" folder="icons/basil" size="24px" v-else-if="mark == false" />
                        <span class="text-baby-blue text-sm py-0.5" v-else>{{ mark }}</span>
                        <span class="absolute bottom-0 w-3/4 h-0.5 bg-neutral-600 group-last:hidden"></span>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const pricing = reactive({
    list: [
        { highlight: false, icon: "/pricing/basic.webp", title: "Basic", monthlyPrice: 0 },
        { highlight: true, icon: "/pricing/standard.webp", title: "Standard", monthlyPrice: 50000 },
        { highlight: false, icon: "/pricing/pro.webp", title: "Pro", monthlyPrice: 100000 },
    ],
});

const features = reactive({
    list: [
        { title: "File Limit", desc: "For individuals or small restaurants and small coffee shops", marks: [true, false, "Unlimited"] },
        { title: "QR View Limit", desc: "", marks: [true, false, "Unlimited"] },
        { title: "File Limit", desc: "", marks: [true, false, "Unlimited"] },
        { title: "File Limit", desc: "", marks: [true, false, "Unlimited"] },
    ],
});
</script>
