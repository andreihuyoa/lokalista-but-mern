import React, { useState } from "react";

import { handleLogin } from "@/services/authService";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email_or_username: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email_or_username: "",
      password: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setError("");
      setIsLoading(true);

      const response = await handleLogin({
        identifier: data.email_or_username,
        password: data.password,
      });

      //Redirect to based on role
      switch (response.role) {
        case "client":
          navigate("../client/dashboard");
          break;
        case "freelance":
          navigate("../freelancer/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-10">
        {/* Lokalista Text */}
        <h1 className="font-TanPearl text-lh2 my-16 flex justify-center text-black dark:text-slate-200">
          Lokal<span className="text-primary dark:text-primary">i</span>sta
        </h1>

        {/* Form */}
        <Card className="w-1/3">
          <CardHeader className="font-TanPearl text-center text-5xl">
            <CardTitle>Login</CardTitle>
          </CardHeader>

          <CardContent className="pb-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mx-auto max-w-3xl space-y-8 py-2"
              >
                {/* Email or Username */}
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="email_or_username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email or Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your email or username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Submit */}
                <CardFooter className="flex flex-col items-end px-0">
                  <Button type="submit" disabled={isLoading} className="w-2/4 py-0">
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <Button variant="link" className="text-xs">
                    Already have an account?
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
