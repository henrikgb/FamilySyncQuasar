import { flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { usePublicHolidays, fetchedPublicHolidayYears } from 'src/queries/usePublicHolidays';
import { getAccessToken } from 'src/utils/getAccessToken';
import type { PublicHolidayDTO } from 'src/dto/PublicHolidayDTO';
import { API_BASE_PUBLIC_HOLIDAYS } from 'src/constants/api';
import { vi } from 'vitest';

// Reset mock-function axiosGetMock before each test
// Empty the chache for fetchedPublicHolidayYears so that each test starts fresh and is not affected by previous tests
beforeEach(() => {
  axiosGetMock.mockReset?.();
  fetchedPublicHolidayYears.value = [];
});

// Mock axios and getAccessToken manually for Vitest
// This does that we dont do real network requests during tests
// getAccessToken returns a fake token to simulate authentication
vi.mock('axios');
vi.mock('src/utils/getAccessToken', () => ({
  getAccessToken: vi.fn(() => Promise.resolve('mock-token'))
}));

// Use vi.fn() to mock axios.get and avoid unbound method issues
// Replace the axios.get method with a mock function vi.fn()
// This allows us to control when and how axios.get is called in our tests, and what it returns
const axiosGetMock = vi.fn();
(axios.get as unknown) = axiosGetMock;

// Mock data for public holidays
// Simulate the API response for different years
// Used as return data when axiosGetMock is called
const mockPublicHolidays: Record<number, PublicHolidayDTO[]> = {
  2025: [{ date: '2025-01-01', localName: 'New Year’s Day' }],
  2026: [{ date: '2026-12-25', localName: 'Christmas Day' }],
  2027: [{ date: '2027-05-17', localName: 'Constitution Day' }],
  2028: [{ date: '2028-04-01', localName: 'April Fools’ Day' }],
  2029: [{ date: '2029-07-20', localName: 'Some Future Holiday' }],
};

// Help-function to use the hook
// Creates an isolate environment to run the hook in
// The hook needs VueQueryPlugin and QueryClient, so this has to be included globally in the test environment
const mountComposable = (yearValue: number) => {
  const year = ref(yearValue);
  const queryClient = new QueryClient();

  mount({
    template: '<div></div>',
    setup() {
      usePublicHolidays('NO', year);
      return {};
    },
  }, {
    global: {
      plugins: [[VueQueryPlugin, { queryClient }]],
    },
  });
};

// Test suite for usePublicHolidays composable
describe('usePublicHolidays', () => {
  beforeEach(() => {
    axiosGetMock.mockReset?.();
  });

  // Test 1: Fetching public holidays for each year that is not cached
  // Runs the hook with each year from 2025 to 2029
  // Simulates the API response for each year
  // Checks that axios.get is called with the correct URL for each year
  it.each([2025, 2026, 2027, 2028, 2029])('fetches data for year %i if not cached', async (year) => {
    axiosGetMock.mockResolvedValueOnce({ data: mockPublicHolidays[year] });

    mountComposable(year);
    await flushPromises();

    expect(axiosGetMock).toHaveBeenCalledWith(`${API_BASE_PUBLIC_HOLIDAYS}/${year}/NO`);
  });

  // Test 2: Do not fetch public holidays data for a year that is already cached
  // The test make sure that the hook does not refetch data for a year that has already been fetched
  // It checks that axios.get is not called again for the same year
  it('does not refetch data for cached year (2026)', async () => {
    axiosGetMock.mockResolvedValueOnce({ data: mockPublicHolidays[2026] });

    mountComposable(2026);
    await flushPromises();
    expect(axiosGetMock).toHaveBeenCalledTimes(1);

    mountComposable(2026);
    await flushPromises();
    expect(axiosGetMock).toHaveBeenCalledTimes(1);
  });

  // Test 3: Do not fetch public holidays data if the user is not authenticated
  // This test checks that the hook does not make an API call if the user is not authenticated
  // Simulates that getAccessToken() returns null, indicating the user is not logged in
  // The hook should not fetch any data in this case
  // The test confirms that axios.get is never called when the user is not authenticated
  it('throws error if not authenticated', async () => {
    const mockedGetAccessToken = getAccessToken as unknown as ReturnType<typeof vi.fn>;
    mockedGetAccessToken.mockResolvedValueOnce(null);

    const queryClient = new QueryClient();
    const year = ref(2027);

    mount({
      template: '<div></div>',
      setup() {
        usePublicHolidays('NO', year);
        return {};
      },
    }, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    await flushPromises();
    expect(axiosGetMock).not.toHaveBeenCalled();
  });
});
