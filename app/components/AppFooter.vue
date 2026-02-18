<template>
  <USeparator class="h-px" />

  <UFooter>
    <UContainer class="py-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-60">

        <!-- LEFT : ADDRESS -->
        <div class="flex gap-3">

          <!-- Text -->
          <div class="space-y-3 text-sm">

            <h3 class="font-semibold text-base">
              Kementerian Pekerjaan Umum
            </h3>

            <p class="text-muted leading-relaxed">
              Lt. 7 Gedung Utama, Jl. Pattimura No.20,
              Rt.2/RW/1. <br />
              Selong, Kebayoran Baru, Kota Jakarta Selatan,
              Jakarta 12110, Indonesia.
            </p>

            <!-- Phone -->
            <div class="flex items-center gap-2 pt-2">
              <UIcon name="i-lucide-phone" />
              <span>(021) 739-6783</span>
            </div>

          </div>
        </div>

        <!-- RIGHT : SOCIAL MEDIA -->
        <div class="lg:text-right space-y-4">

          <h3 class="font-semibold text-lg">
            Temukan Kami :
          </h3>

          <div class="flex lg:justify-end gap-4">

            <UButton
              icon="i-simple-icons-instagram"
              color="neutral"
              variant="ghost"
              to="#"
              aria-label="Instagram"
            />

            <UButton
              icon="i-simple-icons-facebook"
              color="neutral"
              variant="ghost"
              to="#"
              aria-label="Facebook"
            />

            <UButton
              icon="i-simple-icons-youtube"
              color="neutral"
              variant="ghost"
              to="#"
              aria-label="YouTube"
            />

          </div>

        </div>

      </div>
    </UContainer>

  </UFooter>
</template>
