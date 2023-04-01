<style scoped>
.gradient {
    background-image: linear-gradient(90deg, theme("colors.baby-blue") 0%, theme("colors.violet") 100%);
}

.big-text {
    line-height: 5rem;
}
</style>

<template>
    <div class="gradient relative flex justify-center items-end w-screen max-w-screen-2xl rounded-lg p-1.5">
        <section class="flex items-start w-full p-10 py-20 bg-pencil-tip rounded-md" title="Hero">
            <div class="flex flex-col gap-8 text-white w-full max-w-3xl">
                <div class="flex items-end gap-0.5 w-full">
                    <span class="">Creating a digital menu has never been easier.</span>
                    <span class="flex-grow bg-white h-0.5 mb-1.5"></span>
                </div>
                <div class="flex items-center">
                    <h1 class="big-text text-6xl font-bold">
                        <span class="f-inter">The Best Way To Create</span>
                        <div class="flex items-center gap-4">
                            <span class="gradient-text f-inter">QR Menus</span>
                            <img class="w-18 mt-2 border-4 border-gray-300 bg-white p-0.5 rounded-md" src="/qr.svg" alt="QR" />
                        </div>
                    </h1>
                </div>
                <p class="text-xl opacity-80">
                    Any good restaurant needs a good menu.
                    <br />
                    With Menuriom build and manage your restaurant menu with ease.
                </p>
                <div class="flex items-center gap-5 mt-4">
                    <Button class="" type="primary" linkTo="/authenticate"><span class="text-lg font-bold">Try It For Free</span></Button>
                    OR
                    <Button class="border-2 py-3.5 border-white" type="secondary" linkTo="/demo"><span class="text-lg font-bold">Check The Demo</span></Button>
                </div>
            </div>
            <div class="absolute -top-6 right-0">
                <div class="flex items-end justify-start gap-4 -rotate-45">
                    <div class="gradient absolute -top-4 left-0 w-screen max-w-2xl h-20 rounded-lg shadow-nr10"></div>
                    <img class="relative shadow-nr25" src="~/assets/images/menus/1.png" alt="menu1" />
                    <img class="relative shadow-nr25" src="~/assets/images/menus/2.png" alt="menu2" />
                    <img class="relative -mb-60 shadow-nr25" src="~/assets/images/menus/3.png" alt="menu3" />
                </div>
                <img class="absolute -mt-20 right-16 rotate-45" src="~/assets/images/menus/4.png" alt="menu4" />
                <ul class="absolute top-1/4 right-1/3 w-96 h-96 flex flex-col z-10">
                    <li
                        class="absolute top-0 -right-10 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
                    >
                        <img src="/icons/checked-box.png" alt="checked-box" />
                        <span>Multilingual</span>
                    </li>
                    <li
                        class="absolute top-20 left-0 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
                    >
                        <img src="/icons/checked-box.png" alt="checked-box" />
                        <span>Ordering System</span>
                    </li>
                    <li
                        class="absolute top-40 -right-32 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
                    >
                        <img src="/icons/checked-box.png" alt="checked-box" />
                        <span>User Friendly Interface</span>
                    </li>
                    <li
                        class="absolute top-60 left-20 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
                    >
                        <img src="/icons/checked-box.png" alt="checked-box" />
                        <span>Customizable</span>
                    </li>
                    <li
                        class="absolute top-96 right-0 flex items-center gap-2 p-2 rounded-md border-2 border-zinc-300 bg-white bg-opacity-90 backdrop-blur-sm shadow-nr25"
                    >
                        <img src="/icons/checked-box.png" alt="checked-box" />
                        <span>Responsive Design</span>
                    </li>
                </ul>
            </div>
        </section>
        <div class="absolute flex items-center justify-center w-32 h-32 rounded-full -mb-20 bg-white">
            <img class="absolute top-4" src="~/assets/images/scroll-down.svg" alt="scroll-down" />
            <img class="down-pop" src="~/assets/images/arrow-down.png" alt="arrow-down" />
        </div>
    </div>
</template>

<script setup>
import Button from "~/components/web/Button.vue";
</script>
