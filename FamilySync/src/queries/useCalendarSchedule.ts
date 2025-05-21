import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { API_BASE } from 'src/constants/api';
import type { CalendarScheduleItemDTO } from 'src/dto/CalendarScheduleDTO';
import { getAccessToken } from 'src/utils/getAccessToken';

export function useCalendarSchedule() {
  return useQuery({
    queryKey: ['calendarSchedule'],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const res = await axios.get(`${API_BASE}/CalendarSchedule`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res.data;
    },
  });
}

export function useUpdateCalendarSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedSchedule: CalendarScheduleItemDTO[]) => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      await axios.post(`${API_BASE}/CalendarSchedule`, updatedSchedule, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['calendarSchedule'] });
    },
  });
}
