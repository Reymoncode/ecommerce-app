import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '../api/products';

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
}

// A 404 is a final answer ("no such item"), so it is not retried.
export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug),
    enabled: Boolean(slug),
    retry: (failureCount, error) => error?.response?.status !== 404 && failureCount < 1,
  });
}

export default useProduct;