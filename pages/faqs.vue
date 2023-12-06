<style scoped></style>

<template>
    <section class="flex flex-col items-center gap-14 w-full max-w-screen-xl mx-auto p-4">
        <Head>
            <Title> {{ $t("meta.faqsTitle") }} </Title>
            <Meta name="description" :content="$t('meta.faqsDesc')" />
        </Head>

        <header class="relative flex flex-col items-center w-full p-3 md:p-10 bg-bgAccent rounded-3xl overflow-hidden isolate">
            <!-- <img class="absolute -z-10 opacity-75" src="~/assets/images/tiles.webp" alt="tiles" /> -->
            <NuxtImg class="absolute inset-0 w-full h-full opacity-50 rounded-3xl object-cover" src="/img/restaurant3.jpg" sizes="100% 1280px" loading="lazy" />
            <div
                class="flex flex-col items-center gap-2 w-full max-w-3xl mt-12 p-10 pb-16 bg-fgPrimary bg-opacity-60 text-bgPrimary backdrop-blur-sm rounded-2xl"
            >
                <h1 class="text-4xl font-extrabold text-center">{{ $t("faqs.Frequently Asked Questions") }}.</h1>
                <span class="text-xl opacity-80">{{ $t("faqs.Ask what you dont know") }}</span>
            </div>
            <div class="flex items-center gap-1 w-full max-w-xl px-2.5 mb-6 md:mb-16 -mt-8 bg-fgPrimary text-bgPrimary rounded-full z-2">
                <input class="w-full h-14 px-2.5 my-0.5 outline-0 bg-transparent" type="text" name="search" :placeholder="$t('panel.Search')" id="" />
                <button class="p-3 hover:px-6 rounded-full bg-primary hover:shadow-nr35 transition-all">
                    <Icon class="w-5 h-5 bg-fgPrimary" name="search.svg" folder="icons/tabler" size="20px" />
                </button>
            </div>
        </header>
        <ul class="relative flex items-center gap-2 sm:gap-6 md:gap-10  md:-mt-28">
            <li
                class="flex items-center justify-center w-28 sm:w-44 lg:w-64 aspect-square rounded-3xl sm:rounded-4xl overflow-hidden transition-all cursor-pointer"
                :class="[topic == item ? 'gradient p-1.5 sm:p-3' : 'p-0']"
                @click="topic = item"
                v-for="item in topics"
            >
                <div class="flex flex-col items-center justify-center gap-2 sm:gap-4 lg:gap-6 w-full p-3 sm:p-5 lg:p-11 rounded-2xl sm:rounded-3xl bg-bgAccent">
                    <img class="w-12 sm:w-16 lg:w-22" :src="`/faqs/${item}.png`" :alt="item" />
                    <h3 class="text-sm sm:text-xl lg:text-3xl font-bold">{{ $t(`faqs.${item}`) }}</h3>
                </div>
            </li>
        </ul>
        <ul class="relative flex flex-col items-center gap-6 w-full max-w-screen-lg text-white">
            <li
                class="flex flex-col gap-4 p-6 w-full rounded-xl bg-bgAccent shadow-mr10 select-none"
                v-for="(item, i) in faqs.list"
                :key="i"
                @click="toggleQuestion(i)"
            >
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <strong class="f-inter text-xl">{{ item.q }}</strong>
                    <Icon
                        class="relative w-5 h-5 bg-secondary transition-transform"
                        :class="[item.opened ? 'rotate-45' : '']"
                        name="plus.svg"
                        folder="icons"
                        size="20px"
                    />
                </div>
                <div class="flex flex-col gap-4 w-full" v-show="item.opened">
                    <hr class="border-bgSecondary w-full opacity-70" />
                    <p class="text-sm opacity-90 font-extralight">{{ item.a }}</p>
                </div>
            </li>
        </ul>
        <button class="p-3 hover:px-6 rounded-xl border border-bgSecondary hover:shadow-mr25 transition-all">{{ $t("panel.Load More") }}</button>
    </section>
</template>

<script setup>
useHead({ title: `Frequently Asked Questions - Menuriom` });
definePageMeta({ layout: "default" });

const topic = ref("sells");
const topics = ref(["sells", "accounts", "support"]);

const faqs = reactive({
    list: [
        {
            q: "How does the pricing work?",
            a: "You can change your subscription recurrence from monthly to yearly in your account settings. You’ll be billed for the yearly price when your current billing period ends.",
            opened: true,
        },
        {
            q: "What if I don’t want use the system anymore?",
            a: "You can change your subscription recurrence from monthly to yearly in your account settings. You’ll be billed for the yearly price when your current billing period ends.",
            opened: false,
        },
        {
            q: "Can I change my plan at anytime?",
            a: "You can change your subscription recurrence from monthly to yearly in your account settings. You’ll be billed for the yearly price when your current billing period ends.",
            opened: false,
        },
    ],
});
const toggleQuestion = (index) => {
    faqs.list[index].opened = !faqs.list[index].opened;
};
</script>
