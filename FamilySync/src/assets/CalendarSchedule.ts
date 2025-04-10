import { ref } from 'vue';

export interface Schedule {
  date: string;
  text: string;
}

export const calendarSchedule = ref<Schedule[]>([
  {
    date: '2025/04/01',
    text: "TEST 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/01',
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/05',
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/04/06',
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
  },
  {
    date: '2025/05/01',
    text: "Fridag. 1.mai. Dra op tur med Lerke og familien. Dra til fjells og ha det moro. Ta med mat og drikke. Ha det gøy sammen."
  },
  {
    date: '2025/05/16',
    text: "Eirik har bursdag"
  },
  {
    date: '2025/05/17',
    text: "Nasjonaldagen! Feire 17. mai med familien. Dra til byen og se på barnetoget. Ha med flagg og matpakke. Ha det moro sammen."
  },
  {
    date: '2025/06/20',
    text: "Siste arbeidsdag før ferien :)"
  }
]);
