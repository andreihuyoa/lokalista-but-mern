import React, { useState } from "react";

import { handleRegistration } from "@/services/authService";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ArrowRight } from "lucide-react";
import computerguy from "../../assets/images/computerguy.svg";

const formSchema = z
  .object({
    first_name: z.string().min(2, { message: "First name is required" }).max(20),
    last_name: z.string().min(2, { message: "Last name is required" }).max(20),
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters long" })
      .max(25)
      .nullable()
      .optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(200),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

const RegisterPage = () => {
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (values) => {
    try {
      const userData = { ...values, role };

      if(!userData.username || userData.username.trim() === "") {
        delete userData.username;
      }

      const response = await handleRegistration(userData);
      setSuccessMessage("Registration successful!");
      form.reset(); //resets the form, but ideally it should login the user and redirect sa dashboard, or to make them login instead of redirecting
      console.log("Form Submitted:", values);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Form error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-10">
        {/* Image */}
        <div className="w-full md:w-auto">
          <img src={computerguy} alt="mew" />
          {/* Form */}
        </div>

        {/* Form */}
        <Card className="w-1/3">
          <CardHeader className="font-TanPearl text-center text-5xl">
            <CardTitle>Signup</CardTitle>
          </CardHeader>

          <CardContent className="pb-0">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-red-500">{successMessage}</p>}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mx-auto max-w-3xl space-y-8 py-2"
              >
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    {/* First Name */}
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormDescription>This is your public display name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Role */}
                  <div className="col-span-6">
                    <Button
                      asChild
                      type="button"
                      variant={role === "client" ? "default" : "outline"}
                      onClick={() => handleRoleSelection("client")}
                      className="w-full cursor-pointer justify-between py-10"
                    >
                      <div className="flex flex-row">
                        <div className="flex flex-col">
                          <h3 className="font-ObjectSans tracking-wider">Client</h3>
                          <p className="font-SFProDisplay text-xs">start managing a team.</p>
                        </div>

                        {/* Icon */}
                        <ArrowRight className="h-16 w-16 items-center justify-center" />
                      </div>
                    </Button>
                  </div>

                  <div className="col-span-6">
                    {/* Role */}
                    <Button
                      asChild
                      type="button"
                      variant={role === "freelance" ? "default" : "outline"}
                      onClick={() => handleRoleSelection("freelance")}
                      className="w-full cursor-pointer justify-between py-10"
                    >
                      <div className="flex flex-row">
                        <div className="flex flex-col">
                          <h3 className="font-ObjectSans tracking-wider">Freelance</h3>
                          <p className="font-SFProDisplay text-xs">start looking for a team.</p>
                        </div>

                        {/* Icon */}
                        <ArrowRight className="h-16 w-16 items-center justify-center" />
                      </div>
                    </Button>
                  </div>

                  {/* Email */}
                  <div className="col-span-12">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Username */}
                  <div className="col-span-12">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your username" type="text" {...field} />
                          </FormControl>
                          <FormDescription>
                            You can use this as your alternative login method.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password */}
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Confirm your password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {/* Submit */}
                <CardFooter>
                  <Button type="submit" className="w-full py-0">
                    Register
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

export default RegisterPage;
