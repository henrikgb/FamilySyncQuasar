<template>
  <PageLayout>
    <HeaderText :title="t('settingsPage.title')" />

    <ContentContainer>
      <AuthButton />
    </ContentContainer>

    <ContentContainer>
      <p class="text-h5 q-mb-xs">{{ t('settingsPage.selectLanguage') }}:</p>
      <q-select
        v-model="selectedLanguage"
        :options="languageOptions"
        label="Select Language"
        @update:model-value="changeLanguage"
      />
    </ContentContainer>
  </PageLayout>
</template>

<script setup lang="ts">
import AuthButton from 'src/components/AuthButton.vue'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import HeaderText from 'src/components/pageLayoutBuildingBlocks/HeaderText.vue';
import PageLayout from 'src/components/pageLayoutBuildingBlocks/PageLayout.vue';
import ContentContainer from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue';
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
