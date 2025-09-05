"use server";

import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import {
  onboardingSchemaValidation,
  settingsSchema,
  eventTypeSchema,
} from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod/v4";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function OnboardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      scheduled: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromTime: "10:00",
              tillTime: "16:00",
            },
            {
              day: "Tuesday",
              fromTime: "10:00",
              tillTime: "16:00",
            },
            {
              day: "Wednesday",
              fromTime: "10:00",
              tillTime: "16:00",
            },
            {
              day: "Thursday",
              fromTime: "10:00",
              tillTime: "16:00",
            },
            {
              day: "Friday",
              fromTime: "10:00",
              tillTime: "16:00",
            },
            {
              day: "Saturday",
              fromTime: "10:00",
              tillTime: "16:00",
            },
            {
              day: "Sunday",
              fromTime: "10:00",
              tillTime: "16:00",
            },
          ],
        },
      },
    },
  });
  return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const user = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });

  return redirect("/dashboard");
}

export async function updateScheduledAction(formData: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formData.entries());

  const scheduledData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");

      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      scheduledData.map((item) =>
        prisma.scheduled.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/scheduled");
  } catch (error) {
    console.log(error);
  }
}

export async function CreateEventTypeAction(
  prevState: any,
  formData: FormData
) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: session.user?.id,
    },
  });

  return redirect("/dashboard");
}
