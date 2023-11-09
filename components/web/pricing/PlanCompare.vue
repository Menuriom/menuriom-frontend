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
                    :class="[item.highlight ? 'gradient p-1' : 'bg-neutral-300 sm:p-1']"
                    v-for="(item, i) in pricing.list"
                    :key="i"
                >
                    <div class="flex flex-col gap-3 p-2 sm:p-3 md:p-4 w-full rounded-2xl bg-pencil-tip text-fgPrimary">
                        <div class="hidden lg:flex flex-col sm:flex-row items-center gap-2">
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
                            <small class="text-[10px]">{{ $t("pricing.Always") }}</small>
                        </div>

                        <a
                            class="flex items-center justify-center w-full p-2 mt-auto lg:mt-0 bg-primary text-fgPrimary rounded-lg hover:translate-y-0.5 transition-transform"
                            href="#"
                        >
                            <small class="text-center">{{ $t("pricing.Get Started") }}</small>
                        </a>
                    </div>
                </div>
            </header>
            <ul class="flex flex-col gap-1 lg:gap-0 w-full">
                <ul class="sticky top-18 lg:hidden flex items-center justify-center gap-4 2sm:gap-8 px-2 mx-auto w-full z-10">
                    <li
                        class="lg:hidden flex flex-col items-center gap-2 w-28 text-center text-fgPrimary text-xs p-2 py-6 rounded-lg bg-bgAccent"
                        v-for="item in pricing.list"
                    >
                        <img class="w-5" :src="item.icon" :alt="item.title" />
                        <b>{{ item.title }}</b>
                    </li>
                </ul>
                <li
                    class="flex flex-col lg:flex-row items-center lg:items-stretch gap-1 w-full py-2 lg:py-0 rounded-2xl lg:odd:bg-bgAccent group"
                    v-for="(item, i) in features"
                    :key="i"
                >
                    <div class="flex flex-col items-center lg:items-start gap-1.5 grow p-1 lg:p-3 w-full">
                        <h4 class="flex items-center gap-2 text-center w-full">
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-500 bg-opacity-20"></span>
                            <span class="px-2 lg:px-0 group-even:opacity-70"> {{ item.title[locale] }} </span>
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-500 bg-opacity-20"></span>
                        </h4>
                        <div class="flex items-start gap-1.5 text-xs opacity-60" v-if="item.desc && item.desc !== ''">
                            <Icon class="relative w-3 h-3 bg-primary" name="info.svg" folder="icons" size="12px" v-if="item.desc && item.desc !== ''" />
                            <span class="-mt-0.5">{{ item.desc }}</span>
                        </div>
                    </div>
                    <div class="flex justify-center gap-2 2sm:gap-4 w-full">
                        <div
                            class="relative list_checks flex flex-col items-center justify-center p-2 lg:p-3 sm:bg-bgAccent rounded-md lg:rounded-none group-first:rounded-t-lg group-last:rounded-b-lg shadow-mr25"
                            v-for="(mark, j) in item.marks"
                            :key="j"
                        >
                            <!-- <span class="lg:hidden text-fgPrimary text-xs p-2 rounded-lg bg-bgAccent">{{ pricing.list[j].title }}</span> -->
                            <Icon class="relative w-6 h-6 bg-secondary" name="Check.svg" folder="icons/basil" size="24px" v-if="mark === true" />
                            <Icon class="relative w-6 h-6 bg-neutral-500" name="Cross.svg" folder="icons/basil" size="24px" v-else-if="mark === false" />
                            <span class="text-fgPrimary text-sm py-1" v-else>{{ mark }}</span>
                            <span class="absolute bottom-0 w-3/4 h-0.5 bg-bgSecondary hidden lg:flex group-last:hidden"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    plans: { type: Object },
});

const { locale, t } = useI18n();

const pricing = reactive({
    list: [
        { highlight: false, icon: "/pricing/basic-g.png", title: "Basic", monthlyPrice: 0 },
        { highlight: true, icon: "/pricing/standard-g.png", title: "Standard", monthlyPrice: 150000 },
        { highlight: false, icon: "/pricing/pro-g.png", title: "Pro", monthlyPrice: 3600000 },
    ],
});

const features = ref({
    "qr-scan-limit": {
        title: { en: "QR code scan limit", fa: "میزان اسکن کد QR" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "category-limit": {
        title: { en: "Menu category limit", fa: "محدودیت ساخت دسته بندی منو" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "menu-item-limit": {
        title: { en: "Menu item creation limit", fa: "محدودیت ساخت ایتم منو" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "brand-details-in-menu": {
        title: { en: "Brand details page in menu", fa: "صفحه جزئیات داخل منو" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "multiple-language-limit": {
        title: { en: "Multiple languages", fa: "تعداد زبان های انتخابی" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "ticket-and-support": {
        title: { en: "Ticket & support", fa: "تیکت و پشتیبانی" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "menu-templates": {
        title: { en: "Menutemplates", fa: "قالب های منو" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "branch-limit-count": {
        title: { en: "Branch creation limit", fa: "محدودیت ساخت شعبه" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "staff-limit-count": {
        title: { en: "Staff limit", fa: "دعوت اعضای خدمه" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "customize-qr": {
        title: { en: "Customizable QR codes", fa: "قابلیت شخصی سازی کد های QR" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    // "restaurant-detailed-info": {
    //     title: { en: "", fa: "" },
    //     desc: "",
    //     marks: [true, false, "Unlimited"],
    // },
    "menu-item-like": {
        title: { en: "Menu item like option", fa: "گزینه علاقه مندی ایتم ها" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    analytics: {
        title: { en: "Menu views and purchases analytics", fa: "آمار بازدید و فروش" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "item-highlighting": {
        title: { en: "Item highlighting", fa: "هایلایت کردن ایتم ها" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "ordering-system": {
        title: { en: "Ordering & order managment system", fa: "سیستم سفارش گیری و مدیریت سفارشات" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "server-call-button": {
        title: { en: "Server call option", fa: "گزینه درخواست گارسون" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "logo-in-qr": {
        title: { en: "Brand logo option in QR code", fa: "افزودن لوگوی برند به کد QR" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "menu-item-coupling": {
        title: { en: "Menu items coupling", fa: "قابلیت جفت کردن ایتم های منو" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "menu-tag-option": {
        title: { en: "Menu custom tags option", fa: "تگ های خاص برای ایتم ها" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "customizable-category-logo": {
        title: { en: "Customizable menu category logos", fa: "شخصی سازی عکس دسته بندی ها" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
    "customer-review": {
        title: { en: "Customer review option", fa: "امکان دریافت بازخورد مشتریان" },
        desc: "",
        marks: [true, false, "Unlimited"],
    },
});

for (let i = 0; i < props.plans.length; i++) {
    const plan = props.plans[i];
    pricing.list[i].title = plan.translation?.[locale.value]?.name || plan.name;
    pricing.list[i].monthlyPrice = plan.monthlyPrice;

    for (const limitation of plan.limitations) {
        if (!features.value[limitation.limit]) continue;
        features.value[limitation.limit].marks[i] = limitation.value === null ? t("Unlimited") : limitation.value;
    }
}
</script>
