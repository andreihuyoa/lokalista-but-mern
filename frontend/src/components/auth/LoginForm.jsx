import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  //rewrite this piece of trash
  const onSubmit = async (data) => {
    try {
      //the port here is wrong this should be the port of the backend server and is not typed but
      const response = await fetch("http://localhost:7002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
      } else {
        const error = await response.json();
        console.error("Login failed", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email / Username */}
        <FormField
          name="identifier"
          control={form.control}
          rules={{ required: "Username or Email is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your email or username"
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          rules={{ required: "Password is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="Enter your password" className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
