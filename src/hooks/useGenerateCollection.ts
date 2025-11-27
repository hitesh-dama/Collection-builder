import { useMutation } from '@tanstack/react-query';
import { mockGenerateCollection } from '../api/mock-server';
import type { GenerateCollectionRequest, GenerateCollectionResponse } from '../types';

export const useGenerateCollection = () => {
  return useMutation<GenerateCollectionResponse, Error, GenerateCollectionRequest>({
    mutationFn: mockGenerateCollection,
  });
};
