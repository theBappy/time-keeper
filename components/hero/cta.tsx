import { AuthModal } from "../auth-modal/auth-modal";

export function CTA() {
  return (
    <section className="my-20 relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:border sm:shadow-sm">
      <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
        Start TimeKeeper Today!
      </h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-sm mx-auto">
        Saves time to schedule a meeting with your client and blazing fast
        manage every meeting in one app!
      </p>
      <div className="mt-6">
        <AuthModal />
      </div>
    </section>
  );
}
