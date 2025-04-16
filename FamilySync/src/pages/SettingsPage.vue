<template>
  <q-page class="column items-center q-pt-xl q-px-md">
    <div class="w-full">
      <p class="text-h5 q-mb-xs">SELECT LANGUAGE</p>
      <q-select
        v-model="selectedLanguage"
        :options="languageOptions"
        label="Select Language"
        @update:model-value="changeLanguage"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
