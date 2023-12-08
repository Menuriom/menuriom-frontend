<style scoped></style>

<template>
    <section class="relative flex flex-col items-center gap-10 w-full p-4 md:p-8" title="Faqs">
        <div class="relative flex flex-col items-center gap-2">
            <h2 class="f-inter text-3xl font-bold text-fgPrimary">{{ $t("faqs.Frequently Asked Questions") }}.</h2>
        </div>
        <ul class="relative flex flex-col items-center gap-6 px-4 w-screen max-w-screen-lg text-fgPrimary">
            <li
                class="flex flex-col gap-4 p-6 w-full rounded-xl bg-bgAccent shadow-mr10 select-none cursor-pointer"
                v-for="(item, i) in faqs.list"
                :key="i"
                @click="toggleQuestion(i)"
            >
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <strong class="f-inter md:text-xl">{{ item.q }}</strong>
                    <Icon
                        class="relative w-5 h-5 bg-secondary transition-transform"
                        :class="[item.opened ? 'rotate-45' : '']"
                        name="plus.svg"
                        folder="icons"
                        size="20px"
                    />
                </div>
                <div class="grid transition-all" :class="{ '-mb-4': !item.opened }" :style="`grid-template-rows: ${item.opened ? 1 : 0}fr;`">
                    <div class="flex flex-col gap-4 w-full overflow-hidden">
                        <hr class="border-bgSecondary w-full opacity-70" />
                        <p class="text-sm md:text-base opacity-90 font-extralight">{{ item.a }}</p>
                    </div>
                </div>
            </li>
        </ul>
        <nuxt-link class="hover:bg-fgPrimary hover:text-bgSecondary transition-all text-sm p-4 border-2 border-bgSecondary rounded-2xl" to="/faqs">
            {{ $t("faqs.View More") }}
        </nuxt-link>
    </section>
</template>

<script setup>
defineProps({
    blobPosition: { type: String, default: "right" },
});

const { t } = useI18n();

const faqs = reactive({
    list: [
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
});

const toggleQuestion = (index) => {
    faqs.list[index].opened = !faqs.list[index].opened;
};
</script>
