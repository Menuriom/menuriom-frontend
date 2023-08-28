<style scoped></style>

<template>
    <div class="p-4">
        <section class="flex flex-col gap-6 w-full max-w-6xl mx-auto bg-bgAccent rounded-3xl p-6 md:p-14 mt-12">
            <header class="relative w-full mb-4">
                <img class="absolute -top-14 md:-top-20 -start-10 opacity-50" src="~/assets/images/line-wave.svg" alt="" />
                <h1 class="text-5xl font-bold">Privacy Policy.</h1>
            </header>
            <div class="flex flex-col items-start gap-6">
                <p class="text-base/loose opacity-60">
                    You alone are solely responsible for any activity that takes place on the Site or through the Service under your name and password. If you
                    become aware of any unauthorized use of your username and/or password it is your responsibility to notify the Company immediately. It is up
                    to you to maintain the confidentiality of your password and username at all times. You understand that you may receive business-related
                    communications from Company such as Service announcements and account administrative notices, and you agree that these communications are
                    not
                    <b>“unsolicited commercial email advertisements”</b> and thus, subject to all applicable laws, you agree to receive such communications. You
                    may unsubscribe from the receipt of such email communications at any time by sending an email requesting such un-subscription and/or
                    cancellation to an email address that shall be designated specifically for receipt of such requests, however, the fulfillment of this
                    request may affect the functionality of the Service and its ability to perform as intended.
                </p>
                <p class="text-base/loose opacity-60">
                    Additionally, even in the event that you unsubscribe from the marketing emails, if you are registered with an account or have requested that
                    the Company contact you about certain services, you authorize the Company to send you important notices about such services and any pending
                    transactions relating to these services, to any email address you have provided to Company throughout the registration process, or at any
                    other time thereafter.
                </p>
                <p class="text-base/loose opacity-60">
                    It is your sole responsibility to ensure that the email address on file remains up to date to be sure that important emails sent to you are
                    not blocked or re-routed to spam folders. As a user of the Service you also understand and agree that the Service may also include
                    advertisements or links thereto. You agree that such advertisements are not <b>“unsolicited commercial email advertisements”</b> and,
                    subject to all applicable laws, you agree to receive such communications. You understand and agree that your correspondence or business
                    dealings with, or participations in promotions of, advertisers found on or through the Service, including payment and delivery of services,
                    and any other terms, conditions, warranties or representations associated with such dealings, are solely between you and the advertiser, and
                    therefore subject to the advertiser’s terms of service and privacy policy. You agree that the Company shall not be responsible nor liable
                    for any loss or damages incurred or sustained as the result of such dealings or as the result of the presence of such advertisers on the
                    Service.
                </p>
                <strong class="text-base/loose opacity-75">
                    YOU MUST BE AT LEAST 18 YEARS OF AGE TO ACCESS AND USE ANY PORTIONS OF THE SERVICE. IF YOU ARE ABOVE THE AGE OF 13, BUT BELOW THE LEGAL AGE
                    MAJORITY, THIS SERVICE MAY ONLY BE USED WITH THE CONSENT AND SUPERVISION OF A PARENT OR LEGAL GUARDIAN. IF YOU ARE 13 YEARS OR YOUNGER, DO
                    NOT USE THIS SERVICE FOR ANY PURPOSE AS IT IS NOT INTENDED FOR USE BY CHILDREN.
                </strong>
                <img class="w-auto h-16 mix-blend-difference mt-10" src="~/assets/images/signature.png" alt="" />
            </div>
        </section>
    </div>
</template>

<script setup>
useHead({ title: `Privacy Policy - Menuriom` });
definePageMeta({ layout: "default" });
</script>
