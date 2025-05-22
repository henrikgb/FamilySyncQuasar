<template>
  <ContentContainer class="text-grey">
    <p class="q-mb-sm">{{ t('auth.dataIsProtected') }}</p>
    <p class="q-mb-sm">{{ t('auth.pleaseLogin') }}</p>
    <q-btn
      :label="goToLoginLabel"
      color="teal"
      to="/settings"
      class="q-mt-md glossy"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ContentContainer from './ContentContainer.vue';
const { t } = useI18n();
const goToLoginLabel = t('auth.goToLogin');
</script>
