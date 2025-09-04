import { SettingsForm } from "@/components/form/settings-form";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/hooks";

export async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: { id: id },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

export default async function SettingsPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <SettingsForm
      email={data.email}
      fullName={data.name as string}
      profileImage={data.image as string}
    />
  );
}
