import { useQuery } from "@tanstack/react-query";

interface UseDadosProps<T> {
  nameDate: string;
  queryFn: () => Promise<T>;
}

export const useDados = <T>({ nameDate, queryFn }: UseDadosProps<T>) => {
  return useQuery({
    queryKey: [`${nameDate}`],
    queryFn: queryFn,
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });
};
