import { UserPlus, Zap, ShieldCheck, Settings } from "lucide-react";

const features = [
  {
    name: "Sign up for free",
    description:
      "Get started instantly with no upfront cost. Create your account in seconds and start scheduling right away.",
    icon: UserPlus,
  },
  {
    name: "Blazing Fast",
    description:
      "Experience a smooth and lightning-fast scheduling process designed to save you time and effort.",
    icon: Zap,
  },
  {
    name: "Secured with Nylas",
    description:
      "Your calendar data is fully encrypted and secured through Nylas, ensuring privacy and reliability.",
    icon: ShieldCheck,
  },
  {
    name: "Easy to Use & Manage",
    description:
      "Intuitive design with powerful tools that make it simple to create, edit, and manage your meetings.",
    icon: Settings,
  },
];

export function Features() {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule meetings in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With TimeKeeper you can schedule your meetings and save your precious
          time. Meetings are easy to manage and scheduled or cancelled any time.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div className="relative pl-16" key={feature.name}>
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white dark:invert" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
