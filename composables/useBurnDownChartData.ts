import type { DataRecord } from "~/types/metrics";

export const useBurnDownChartData = () => {
  const fetchExpensesBurnDown = (budget_id: number, startDate: string, endDate: string) => {
   return useFetch("/api/metrics/expensesBurnDown", {
      query: {
        initial_date: startDate,
        final_date: endDate,
        budget_id,
      },
      key: `expensesBurnDown`,
    });
  };

  const expensesBurnDown = computed(() => {
    const { data } = useNuxtData<{expensesBurnDown: DataRecord[]}>("expensesBurnDown");
    return data.value;
  });
  return {
    fetchExpensesBurnDown,
    expensesBurnDown,
  };
}
