"use client";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import FinancialPlaybook from "@/components/FinancialPlaybook";
import { useHomeMode } from "@/context/HomeModeContext";
// import Blogs from "@/components/Blogs";

export default function Main() {
  const { homeMode, setHomeMode } = useHomeMode();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <main>
        <Hero mode={homeMode} onModeChange={setHomeMode} />
        <Services mode={homeMode} />
        {/* <Blogs /> */}     {/* Blog/Insights Section (temporarily hidden) */}
        <Portfolio mode={homeMode} />
        <About mode={homeMode} />
        {homeMode === "financial" && <FinancialPlaybook />}
        <Testimonials mode={homeMode} />
        <Contact mode={homeMode} />
      </main>
    </div>
  );
}
