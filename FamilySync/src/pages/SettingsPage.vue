<template>
  <q-page class="column items-center q-pt-sm">
    <q-layout class="q-px-lg q-py-lg">
      <div class="text-center q-mb-lg">
        <p class="text-h2 q-mb-xs">{{ t('settingsPage.title') }}</p>
      </div>

      <div class="w-full bg-yellow-3 q-mt-md q-px-md q-py-sm rounded-borders">
        <p class="text-h5 q-mb-xs">{{ t('settingsPage.login') }}:</p>
        <AuthButton />
      </div>

      <div class="w-full bg-yellow-3 q-mt-md q-px-md q-py-sm rounded-borders">
        <p class="text-h5 q-mb-xs">{{ t('settingsPage.selectLanguage') }}:</p>
        <q-select
          v-model="selectedLanguage"
          :options="languageOptions"
          label="Select Language"
          @update:model-value="changeLanguage"
        />
      </div>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import AuthButton from 'src/components/AuthButton.vue'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const { locale } = useI18n();

const selectedLanguage = ref(locale.value);
const languageOptions = [
  { label: 'English', value: 'en-US' },
  { label: 'Norwegian', value: 'nb-NO' }
];

function changeLanguage(newLanguage: string | { label: string; value: string }) {
  const languageCode = typeof newLanguage === 'string' ? newLanguage : newLanguage.value;
  locale.value = languageCode;
}
</script>
