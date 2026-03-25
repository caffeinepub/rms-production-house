import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      projectType: string;
      budget: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitForm({
        name: data.name,
        email: data.email,
        projectType: data.projectType,
        budget: data.budget,
        message: data.message,
        timestamp: 0n,
      });
    },
  });
}
