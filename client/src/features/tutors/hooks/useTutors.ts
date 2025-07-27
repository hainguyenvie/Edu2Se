import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/constants';
import { Tutor, SearchFilters } from '@shared/types';

export function useTutors(filters?: SearchFilters) {
  return useQuery({
    queryKey: [API_ENDPOINTS.TUTORS, filters],
    queryFn: async (): Promise<Tutor[]> => {
      const params = new URLSearchParams();
      
      if (filters?.subject) params.append('subject', filters.subject);
      if (filters?.courseType) params.append('courseType', filters.courseType);
      if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters?.timeSlots) params.append('timeSlots', filters.timeSlots.join(','));
      if (filters?.keywords) params.append('keywords', filters.keywords);
      
      const queryString = params.toString();
      const url = queryString ? `${API_ENDPOINTS.TUTORS}?${queryString}` : API_ENDPOINTS.TUTORS;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch tutors');
      return response.json();
    },
  });
}

export function useTutor(id: string) {
  return useQuery({
    queryKey: [API_ENDPOINTS.TUTORS, id],
    queryFn: async (): Promise<Tutor> => {
      const response = await fetch(`${API_ENDPOINTS.TUTORS}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch tutor');
      return response.json();
    },
    enabled: !!id,
  });
}