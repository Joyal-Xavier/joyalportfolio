import type { Metadata } from "next";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { Achievements } from "@/components/Achievements";

export const metadata: Metadata = {
  title: "About — Joyal Xavier A",
  description: "Background, skills, experience, education, and certifications.",
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <About />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
    </main>
  );
}
