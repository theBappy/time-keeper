import { conformZodMessage } from "@conform-to/zod/v4";
import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters" })
    .max(150, { message: "Full name must be at most 150 characters" }),

  userName: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" })
    .max(150, { message: "Username must be at most 150 characters" })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contain letters, numbers, and dashes (-)",
    }),
});

export function onboardingSchemaValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(5, { message: "Username must be at least 5 characters" })
      .max(150, { message: "Username must be at most 150 characters" })
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can only contain letters, numbers, and dashes (-)",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "This username is already taken",
              });
            }
          });
        })
      ),
    fullName: z
      .string()
      .min(5, { message: "Full name must be at least 5 characters" })
      .max(150, { message: "Full name must be at most 150 characters" }),
  });
}

export const settingsSchema = z.object({
  fullName: z.string().min(5).max(150),
  profileImage: z.string(),
});
