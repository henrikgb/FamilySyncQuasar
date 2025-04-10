import { ref } from 'vue';

export interface ScheduleItem {
  date: string;
  description: string;
}

export const calendarSchedule = ref<ScheduleItem[]>([
  {
    date: '2025/04/01',
    description: "TEST 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/01',
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/05',
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/06',
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/05/01',
    description: "Fridag. 1.mai. Dra op tur med Lerke og familien. Dra til fjells og ha det moro. Ta med mat og drikke. Ha det gøy sammen."
  },
  {
    date: '2025/05/16',
    description: "Eirik har bursdag"
  },
  {
    date: '2025/05/17',
    description: "Nasjonaldagen! Feire 17. mai med familien. Dra til byen og se på barnetoget. Ha med flagg og matpakke. Ha det moro sammen."
  },
  {
    date: '2025/06/20',
    description: "Siste arbeidsdag før ferien :)"
  }
]);
