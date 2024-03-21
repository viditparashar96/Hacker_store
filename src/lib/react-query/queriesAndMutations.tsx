import { useMutation } from "@tanstack/react-query";
import { SigninUser } from "../actions/user.actions";

export const useLoginAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => SigninUser(user),
  });
};
