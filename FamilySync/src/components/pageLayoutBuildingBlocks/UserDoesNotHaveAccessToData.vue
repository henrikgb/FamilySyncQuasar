<template>
  <ContentContainer :definedBackgroundColor="'bg-red-4'" class="text-amber-1">
    <p class="q-mb-sm">{{ t('hello') }}, {{ userName }}!</p>
    <p class="q-mb-sm">{{ t('userDoesNotHaveAccessToData') }}</p>
  </ContentContainer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ContentContainer from './ContentContainer.vue';
import { useAuth } from 'src/composables/useAuth';

const { activeAccount } = useAuth();
const { t } = useI18n();
const userName = activeAccount.value?.name || 'User';

</script>
