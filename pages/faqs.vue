<style scoped></style>

<template>
    <section class="flex flex-col items-center gap-14 w-full max-w-screen-xl mx-auto p-4">
        <Head>
            <Title> {{ $t("meta.faqsTitle") }} </Title>
            <Meta name="description" :content="$t('meta.faqsDesc')" />
        </Head>

        <header class="relative flex flex-col items-center w-full p-3 md:p-10 bg-bgAccent rounded-3xl overflow-hidden isolate">
            <NuxtImg
                class="absolute inset-0 w-full h-full opacity-50 rounded-3xl object-cover"
                src="/img/restaurant3.jpg"
                format="webp"
                sizes="100% lg:1024px"
                quality="50"
                loading="lazy"
            />
            <div
                class="flex flex-col items-center gap-2 w-full max-w-3xl mt-12 p-10 pb-16 bg-fgPrimary bg-opacity-60 text-bgPrimary backdrop-blur-sm rounded-2xl"
            >
                <h1 class="text-4xl font-extrabold text-center">{{ $t("faqs.Frequently Asked Questions") }}.</h1>
                <span class="text-xl opacity-80">{{ $t("faqs.Ask what you dont know") }}</span>
            </div>
            <form
                @submit.prevent="search()"
                class="flex items-center gap-1 w-full max-w-xl px-2.5 mb-6 md:mb-16 -mt-8 bg-fgPrimary text-bgPrimary rounded-full z-2"
            >
                <input
                    class="w-full h-14 px-2.5 my-0.5 outline-0 bg-transparent"
                    v-model="searchQuery"
                    type="text"
                    name="search"
                    :placeholder="$t('panel.Search')"
                    id=""
                />
                <button class="p-3 hover:px-6 rounded-full bg-primary hover:shadow-nr35 transition-all">
                    <Icon class="w-5 h-5 bg-fgPrimary" name="search.svg" folder="icons/tabler" size="20px" />
                </button>
            </form>
        </header>
        <!-- <ul class="relative flex items-center gap-2 sm:gap-6 md:gap-10  md:-mt-28">
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
        </ul> -->
        <div class="flex flex-col gap-6" v-for="(faqG, i) in faqsFiltered">
            <div class="flex items-center gap-2 w-full px-4">
                <img class="w-16" :src="`/faqs/${faqG.group}.png`" :alt="faqG.group" />
                <h2 class="text-xl/normal md:text-4xl/normal font-extrabold gradient-text">{{ $t(`faqs.${faqG.group}`) }}</h2>
                <span class="w-0.5 h-0.5 mt-5 bg-bgSecondary opacity-50 grow"></span>
            </div>
            <ul class="relative flex flex-col items-center gap-6 px-4 w-screen max-w-4xl text-white">
                <li
                    class="flex flex-col gap-4 p-6 w-full rounded-xl bg-bgAccent shadow-mr10 select-none"
                    v-for="(question, j) in faqG.questions"
                    :key="j"
                    @click="toggleQuestion(i, j)"
                >
                    <div class="flex flex-wrap items-center justify-between gap-4 cursor-pointer">
                        <strong class="f-inter md:text-xl">{{ question.q }}</strong>
                        <Icon
                            class="relative w-5 h-5 bg-secondary transition-transform"
                            :class="[question.opened ? 'rotate-45' : '']"
                            name="plus.svg"
                            folder="icons"
                            size="20px"
                        />
                    </div>
                    <div class="grid transition-all" :class="{ '-mb-4': !question.opened }" :style="`grid-template-rows: ${question.opened ? 1 : 0}fr;`">
                        <div class="flex flex-col gap-4 w-full overflow-hidden">
                            <hr class="border-bgSecondary w-full opacity-70" />
                            <p class="text-sm md:text-base opacity-90 font-extralight">{{ question.a }}</p>
                        </div>
                    </div>
                </li>
                <li class=" w-full rounded-full text-center text-bgPrimary bg-primary bg-opacity-25" v-if="!faqG.questions.length">•••</li>
            </ul>
        </div>
    </section>
</template>

<script setup>
definePageMeta({ layout: "default" });

const { t } = useI18n();

const topic = ref("sells");
const topics = ref(["sells", "accounts", "support"]);

const faqs = ref([
    {
        group: "sells",
        questions: [
            {
                q: t("faqs.Is there a free trail?"),
                a: t("faqs.a1"),
                opened: true,
            },
            {
                q: t("faqs.Is there any fee other than the subscription fee?"),
                a: t("faqs.a2"),
                opened: false,
            },
            {
                q: t("faqs.Can I change my plan at anytime?"),
                a: t("faqs.a3"),
                opened: false,
            },
        ],
    },
    {
        group: "accounts",
        questions: [
            {
                q: t("faqs.How can I build an account?"),
                a: t("faqs.a4"),
                opened: true,
            },
            {
                q: t("faqs.After I signed up how can I build a menu?"),
                a: t("faqs.a5"),
                opened: false,
            },
            {
                q: t("faqs.Can I build multiple brands with a single account?"),
                a: t("faqs.a6"),
                opened: false,
            },
            {
                q: t("faqs.How can I add another user to help me manage my restaurant?"),
                a: t("faqs.a7"),
                opened: false,
            },
            {
                q: t("faqs.Can I change the restaurant username at any time?"),
                a: t("faqs.a8"),
                opened: false,
            },
        ],
    },
    {
        group: "support",
        questions: [
            {
                q: t("faqs.How can I access the menu I created?"),
                a: t("faqs.a9"),
                opened: false,
            },
            {
                q: t("faqs.How can I change the looks of my restaurant menu?"),
                a: t("faqs.a10"),
                opened: false,
            },
            {
                q: t("faqs.How can I change the content of my restaurant menu?"),
                a: t("faqs.a11"),
                opened: false,
            },
        ],
    },
]);
const toggleQuestion = (i, j) => (faqs.value[i].questions[j].opened = !faqs.value[i].questions[j].opened);

const faqsFiltered = ref(faqs.value);
const searchQuery = ref("");
const search = () => {
    const aCopy = structuredClone(toRaw(faqs.value));

    if (!searchQuery.value) faqsFiltered.value = faqs.value;
    faqsFiltered.value = aCopy.map((item) => {
        item.questions = item.questions.filter((question) => question.a.includes(searchQuery.value) || question.q.includes(searchQuery.value));
        return item;
    });
};
</script>
