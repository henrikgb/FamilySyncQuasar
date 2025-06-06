import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { API_BASE_PUBLIC_HOLIDAYS } from 'src/constants/api';
import { getAccessToken } from 'src/utils/getAccessToken';
import { computed, unref } from 'vue';
import type { Ref } from 'vue';
import { ref } from 'vue';

const fetchedPublicHolidayYears = ref<number[]>([])

export function usePublicHolidays(
  countryCode: string,
  year: Ref<number, number>,
) {
  const currentYear = computed(() => unref(year));
  const key = computed(() => ['publicHolidays', countryCode, year.value])
  const shouldFetch = computed(() => {
    return !fetchedPublicHolidayYears.value.includes(currentYear.value);
  });

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const res = await axios.get(`${API_BASE_PUBLIC_HOLIDAYS}/${currentYear.value}/${countryCode}`)
      fetchedPublicHolidayYears.value.push(currentYear.value);
      return res.data;
    },
    enabled: shouldFetch
  });
}
