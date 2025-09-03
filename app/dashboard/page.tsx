import { requireUser } from "@/lib/hooks";

export default async function DashboardPage() {
  const session = await requireUser();
  return (
    <div className="">
      <h1 className="">Dashboard Page</h1>
    </div>
  );
}
