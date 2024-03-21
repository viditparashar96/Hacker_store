import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginAccount } from "@/lib/react-query/queriesAndMutations";
import { LoginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync: LoginUser, isPending } = useLoginAccount();
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);
    const data = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    try {
      const response = await LoginUser(data);
      console.log("response in loging==>", response);
      if (response) {
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        toast.error(error?.response.data.error);
      }
    }
  }

  return (
    <div className="md:w-5/12  w-10/12">
      <div>
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <p className="text-gray-600 mt-2">
          Enter your email and password to login to your account.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>Test: eve.holt@reqres.in</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Test: pistol</FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
