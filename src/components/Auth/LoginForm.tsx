"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address!" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long!",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const response = await signIn("Credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("Sign-in response:", response);

      alert("u");

      if (response?.error) {
        alert(`Login error: ${response.error}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed!");
    }
  }
  return (
    <Card className="flex flex-col space-y-5 items-center p-5">
      <CardHeader>
        <h1>Sign In</h1>
      </CardHeader>

      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Sign In</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col items-center">
        <div className="w-full flex justify-center gap-3 items-center">
          <span className="items-stretch h-1" />
          <p className="items-center">Or SignIn with</p>
          <span className="items-stretch h-1" />
        </div>
        <Button
          onClick={() => {
            signIn();
          }}
        >
          Sign In with google
        </Button>
        <p className="mt-5 text-center">
          Don't have an account yet? <span className="font-bold">Sign Up</span>
        </p>
      </CardFooter>
    </Card>
  );
}
