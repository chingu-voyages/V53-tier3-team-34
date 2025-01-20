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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address!" }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long!",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const { email, password, confirmPassword } = data;
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const result = await response.json();

      if (result.ok) {
        alert("User Created Sucessfully");
        router.push("/signin");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong!");
    }
  }
  return (
    <Card>
      <CardHeader>
        <h1>Sign Up</h1>
      </CardHeader>

      <CardContent>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Sign Up</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="mt-5 text-center">
          Already have an account? <span className="font-bold">LogIn</span>
        </p>
      </CardFooter>
    </Card>
  );
}
