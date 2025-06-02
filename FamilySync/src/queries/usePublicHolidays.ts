import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { API_BASE_PUBLIC_HOLIDAYS } from 'src/constants/api';
import { getAccessToken } from 'src/utils/getAccessToken';

export function usePublicHolidays( countryCode: string, year: number ) {
  return useQuery({
    queryKey: ['publicHolidays', countryCode, year],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }
      const res = await axios.get(`${API_BASE_PUBLIC_HOLIDAYS}/${year}/${countryCode}`);
      return res.data;
    },
  });
}
