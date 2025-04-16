import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { API_BASE } from 'src/constants/api';
import type { CalendarScheduleDTO } from 'src/dto/CalendarScheduleDTO';

export function useCalendarSchedule() {
  return useQuery({
    queryKey: ['calendarSchedule'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/calendarSchedule`);
      return res.data;
    },
  });
}

export function useUpdateCalendarSchedule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updatedSchedule: CalendarScheduleDTO) => {
      await axios.post(`${API_BASE}/calendarSchedule`, updatedSchedule)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['calendarSchedule'] })
    },
  })
}
