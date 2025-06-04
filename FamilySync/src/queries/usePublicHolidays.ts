import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { API_BASE_PUBLIC_HOLIDAYS } from 'src/constants/api';
import { getAccessToken } from 'src/utils/getAccessToken';
import { computed, unref } from 'vue';
import type { Ref } from 'vue';

export function usePublicHolidays( countryCode: string, year: Ref<number, number> ) {
  const key = computed(() => ['publicHolidays', countryCode, year.value])
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const currentYear = unref(year.value)
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }
      console.log(`Fetching public holidays for ${countryCode} in ${currentYear}`);
      const res = await axios.get(`${API_BASE_PUBLIC_HOLIDAYS}/${currentYear}/${countryCode}`)
      return res.data;
    },
    enabled: () => true
  });
}
