import { getCategories } from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery } from 'react-query';

export const useCategories = () => {
  const {
    data: categories,
    status,
    error,
  } = useQuery<CategoriesDataFromServer, unknown, CategoryType[]>(
    QUERY_KEY.categories,
    getCategories,
    {
      select: (data) => data.data,
      staleTime: Infinity,
    },
  );

  return { categories, status, error };
};
