import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
export const metadata: Metadata = { title: "About" };
const description = "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.";
const steps = [
  { title: "Brainstorming", text: "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated" },
  { title: "Analysing", text: "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line solely on the bottom line." },
  { title: "News Publishing", text: description },
];
export default function AboutPage() {
  return <main id="main-content" className="about-page">
    <Reveal className="container page-intro"><p className="eyebrow">ABOUT US</p><h1>Creative Blog Writting and publishing site</h1><p>{description}</p></Reveal>
    <Reveal className="container about-image"><Image src="/images/figma-d1a94df89820.jpg" alt="Four members of a creative team collaborating around a laptop" width={2464} height={1611} sizes="86vw" preload /></Reveal>
    <Reveal className="container work-section"><div className="work-heading"><div><p className="eyebrow">HOW WE WORK</p><h2>I will show you how our team works</h2></div><p>Bring to the table win-win market strategies to ensure perfect articles.</p></div><div className="work-grid">{steps.map((step, i) => <article className={`work-card ${i === 0 ? "work-card-featured" : ""}`} key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p>{i === 0 && <Link href="/blog">Learn More</Link>}</article>)}</div></Reveal>
  </main>;
}
