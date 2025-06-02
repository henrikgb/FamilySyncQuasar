<template>
  <PageLayout>
    <HeaderText :title="t('settingsPage.title')" />

    <ContentContainer>
      <UserInformation />
      <AuthButton />
    </ContentContainer>

    <ContentContainer>
      <SelectLanguage />
    </ContentContainer>
  </PageLayout>
</template>

<script setup lang="ts">
import AuthButton from 'src/components/AuthButton.vue'
import { useI18n } from 'vue-i18n';
import HeaderText from 'src/components/pageLayoutBuildingBlocks/HeaderText.vue';
import PageLayout from 'src/components/pageLayoutBuildingBlocks/PageLayout.vue';
import ContentContainer from 'src/components/pageLayoutBuildingBlocks/ContentContainer.vue';
import UserInformation from './UserInformation.vue';
import SelectLanguage from './SelectLanguage.vue';
const { t } = useI18n()

</script>
