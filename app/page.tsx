import About from "@/components/About";
import { Experience } from "@/components/Experience";
import Hero from "@/components/Hero";
import HeroImageSection from "@/components/HeroImageSection";
import Skills from "@/components/Skills";
import UpNavbar from "@/components/UpNavbar";

export default function Page() {
  return (
    <>
      <UpNavbar />
      <Hero />

      <section className="h-[100vh] bg-black">
        <HeroImageSection />
      </section>

      <section className="bg-black">
        <Skills />
      </section>

      <section className="bg-black">
        <Experience />
      </section>


      <About />

      {/* <main className="w-screen px-[5vw] py-16 space-y-24">
        <section id="work" className="min-h-[60vh]">
          <h2 className="text-3xl font-bold mb-6">Work</h2>
          <div className="h-64 rounded-xl bg-neutral-100" />
        </section>

        <section id="about" className="min-h-[60vh]">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <div className="h-64 rounded-xl bg-neutral-100" />
        </section>

        <section id="contact" className="min-h-[60vh]">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <div className="h-64 rounded-xl bg-neutral-100" />
        </section>
      </main> */}
    </>
  );
}
