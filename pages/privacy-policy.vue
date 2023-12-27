<style scoped></style>

<template>
    <div class="p-4">
        <Head>
            <Title> {{ $t("meta.privacyPolicyTitle") }} </Title>
            <Meta name="description" :content="$t('meta.privacyPolicyDesc')" />
        </Head>
        <section class="flex flex-col gap-6 w-full max-w-6xl mx-auto bg-bgAccent rounded-3xl p-6 md:p-14 mt-12">
            <header class="relative w-full mb-4">
                <img class="absolute -top-14 md:-top-20 -start-10 opacity-50 mix-blend-screen" src="~/assets/images/line-wave.svg" alt="" />
                <h1 class="text-5xl font-bold">{{ $t("auth.Privacy Policy") }}.</h1>
            </header>
            <div class="flex flex-col items-start gap-4">
                <p class="text-base/normal opacity-80">
                    برای باز کردن يک اکانت در سايت منوریوم، بايد نام، نام خانوادگی، شماره تلفن و آدرس ايميل را وارد کنيد. در وارد کردن اين اطلاعات دقت کنيد چرا
                    که منوریوم اطلاعات وارد شده را بررسی و از صحت آنها اطمينان حاصل می‌کند. همچنین هنگام ساخت برند رستوران خود اطلاعات مربوط به نام و آدرس و
                    شماره تماس شعبات رستوران شما درخواست میشود.
                </p>
                <b class="text-base/normal opacity-80">این اطلاعات به صورت بازه ای ممکن است توسط منوریوم صحت سنجی شود</b>
                <p class="text-base/normal opacity-80">
                    اطلاعات شخصی فرد صاحب حساب به طور کامل نزد منوریوم محفوظ میماند و در هیچ قسمت از منوی شما قابل نمایش نیست.
                </p>
                <p class="text-base/normal opacity-80">
                    تمامی اطلاعت شخصی، محتوای متنی و فایل های عکس که توسط کاربر بارگذاری و ارائه میشود از طریق پنل مدیریتی و حساب کاربری فرد قابل مشاهده، ویرایش
                    و حذف خواهد بود
                </p>
                <b class="text-base/normal opacity-80">
                    اطلاعاتی که کاربر آن را حذف میکند به طور کامل از سرورهای منوریوم حذف شده و هیچ نسخه بکاپ از اطلاعات حذف شده توسط کاربر نزد ما باقی نمیماند
                </b>
                <p class="text-base/normal opacity-80">
                    در صورت بروز هرگونه مشکل حریم شخصی برای شما، میتوانید از طریق ارسال ایمیل به <a href="mailto:info@menuriom.com">info@menuriom.com</a> یا از
                    طریق بخش <nuxt-link :to="localePath('/contact-us')">تماس با ما</nuxt-link> مشکل خود را با پشتیبانی منوریوم در تمس بگذارید
                </p>

                <img class="w-auto h-16 mix-blend-difference mt-10" src="~/assets/images/signature.png" alt="" />
            </div>
        </section>
    </div>
</template>

<script setup>
definePageMeta({ layout: "default" });

const localePath = useLocalePath();
</script>
