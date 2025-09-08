import { CTA } from "@/components/hero/cta";
import { Features } from "@/components/hero/features";
import { Hero } from "@/components/hero/hero";
import { Testimonials } from "@/components/hero/testimonials";
import { Logos } from "@/components/logos";
import { Navbar } from "@/components/navbar/navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth()
  if(session?.user){
    return redirect("/dashboard")
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
