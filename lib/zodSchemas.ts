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

export const eventTypeSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(150, { message: "Title cannot exceed 150 characters." }),
  duration: z
    .number()
    .min(15, { message: "Duration must be at least 15 minutes." })
    .max(60, { message: "Duration cannot be longer than 60 minutes." }),
  url: z
    .string()
    .min(3, { message: "URL slug must be at least 3 characters long." })
    .max(150, { message: "URL slug cannot exceed 150 characters." }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." })
    .max(300, { message: "Description cannot exceed 300 characters." }),
  videoCallSoftware: z
    .string()
    .min(3, { message: "Please select a valid video call provider." }),
});