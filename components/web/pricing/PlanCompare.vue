<style scoped>
.list_heads,
.list_checks {
    width: 8rem;
}

@media (min-width: 1024px) {
    .list_heads,
    .list_checks {
        width: 13rem;
    }
}
</style>

<template>
    <section class="relative flex flex-col items-center gap-10 w-full max-w-screen-xl p-2 sm:p-4 md:p-8" title="Plan Compression">
        <div class="flex flex-col items-center gap-2 p-2">
            <h2 class="f-inter text-3xl lg:text-5xl font-bold">{{ $t("pricing.Compare Plans") }}.</h2>
            <h4 class="text-lg lg:text-2xl opacity-60 text-center">{{ $t("pricing.Overview of what is included in our different plans") }}.</h4>
        </div>
        <div class="flex flex-col-reverse lg:flex-col items-center gap-8 lg:gap-4 w-full">
            <header class="lg:sticky top-24 flex justify-center lg:items-end gap-1 2sm:gap-4 w-full z-2">
                <div class="hidden lg:flex flex-grow-0 lg:grow"></div>
                <div
                    class="list_heads flex justify-center rounded-[20px] shadow-nr25"
                    :class="[item.highlight ? 'gradient p-1' : 'bg-pencil-tip']"
                    v-for="(item, i) in pricing.list"
                    :key="i"
                >
                    <div class="flex flex-col gap-3 p-3 md:p-4 w-full rounded-2xl bg-pencil-tip text-fgPrimary">
                        <div class="flex flex-col sm:flex-row items-center gap-2">
                            <img class="w-5" :src="item.icon" :alt="item.title" />
                            <h3 class="f-inter text-sm lg:text-lg font-bold">{{ item.title }}</h3>
                        </div>
                        <div class="flex flex-col lg:flex-row justify-start items-center sm:items-baseline md:gap-1" v-if="item.monthlyPrice > 0">
                            <b class="f-inter text-base md:text-lg font-extrabold gradient-text">
                                {{ Intl.NumberFormat().format(item.monthlyPrice / 1000) }}<span class="text-xs">,000</span>
                            </b>
                            <div class="flex flex-col sm:flex-row items-baseline gap-1">
                                <b class="f-inter text-xs sm:text-sm">{{ $t("pricing.Toman") }}</b>
                                <small class="text-[10px]">/{{ $t("pricing.month") }}</small>
                            </div>
                        </div>
                        <div class="flex flex-col lg:flex-row justify-start items-center sm:items-baseline md:gap-1" v-else>
                            <b class="f-inter text-center sm:text-start text-lg text-secondary">{{ $t("pricing.Free") }}</b>
                            <small class="text-[10px]">/{{ $t("pricing.Always") }}</small>
                        </div>

                        <a
                            class="flex items-center justify-center w-full p-2 mt-auto lg:mt-0 bg-fgPrimary text-bgPrimary font-bold rounded-lg hover:translate-y-0.5 transition-transform"
                            href="#"
                        >
                            <small class="text-center">{{ $t("pricing.Get Started") }}</small>
                        </a>
                    </div>
                </div>
            </header>
            <ul class="flex flex-col gap-6 lg:gap-0 w-full">
                <li
                    class="flex flex-col lg:flex-row items-center lg:items-stretch gap-1 w-full py-2 lg:py-0 rounded-2xl lg:odd:bg-bgAccent group"
                    v-for="(item, i) in features.list"
                    :key="i"
                >
                    <div class="flex flex-col items-center lg:items-start gap-1.5 grow p-1 lg:p-3 w-full">
                        <h4 class="flex items-center gap-2 text-center w-full">
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-500 bg-opacity-20"></span>
                            <span class="px-2 lg:px-0"> {{ item.title }} </span>
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-500 bg-opacity-20"></span>
                        </h4>
                        <div class="flex items-start gap-1.5 text-xs opacity-60" v-if="item.desc && item.desc !== ''">
                            <Icon class="relative w-3 h-3 bg-primary" name="info.svg" folder="icons" size="12px" v-if="item.desc && item.desc !== ''" />
                            <span class="-mt-0.5">{{ item.desc }}</span>
                        </div>
                    </div>
                    <div class="flex justify-center gap-1 2sm:gap-4 w-full">
                        <div
                            class="relative list_checks flex flex-col items-center justify-center p-2 lg:p-3 bg-bgAccent rounded-md lg:rounded-none group-first:rounded-t-lg group-last:rounded-b-lg shadow-mr25"
                            v-for="(mark, j) in item.marks"
                            :key="j"
                        >
                            <span class="lg:hidden text-fgPrimary text-xs">{{ pricing.list[j].title }}</span>
                            <Icon class="relative w-6 h-6 bg-secondary" name="Check.svg" folder="icons/basil" size="24px" v-if="mark == true" />
                            <Icon class="relative w-6 h-6 bg-neutral-500" name="Cross.svg" folder="icons/basil" size="24px" v-else-if="mark == false" />
                            <span class="text-secondary text-xs py-1" v-else>{{ mark }}</span>
                            <span class="absolute bottom-0 w-3/4 h-0.5 bg-neutral-600 hidden lg:flex group-last:hidden"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const pricing = reactive({
    list: [
        { highlight: false, icon: "/pricing/basic-g.png", title: "Basic", monthlyPrice: 0 },
        { highlight: true, icon: "/pricing/standard-g.png", title: "Standard", monthlyPrice: 150000 },
        { highlight: false, icon: "/pricing/pro-g.png", title: "Pro", monthlyPrice: 3600000 },
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
