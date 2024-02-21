"use client";

import { useState } from "react";

import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { EmailAuthSchema } from "@acme/validators";

export function EmailForm(params: { signInEmail: (email: string) => void }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    schema: EmailAuthSchema,
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-2xl flex-col gap-4"
        onSubmit={form.handleSubmit(
          async (data) => {
            params.signInEmail(data.email);
          },
          () => {
            setLoading(false);
          },
        )}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={() => {
            setLoading(true);
          }}
        >
          {!loading ? "Sign in" : "Loading..."}
        </Button>
      </form>
    </Form>
  );
}
