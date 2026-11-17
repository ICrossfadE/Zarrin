import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
export const metadata: Metadata = { title: "Contact" };
const contacts = [
  { title: "Office", text: "Victoria Street, London, UK", icon: "office-icon", width: 22, height: 23 },
  { title: "Email", text: "hello@zarrin.com", icon: "email-icon", width: 22, height: 18 },
  { title: "Phone", text: "(001) 2342 3451", icon: "phone-icon", width: 22, height: 22 },
];
export default function ContactPage() {
  return <main id="main-content" className="contact-page">
    <Reveal className="container page-intro"><h1>Get in Touch</h1><p>Contact us to publish your content and show ads to our website and get a good reach.</p></Reveal>
    <Reveal className="container contact-cards">{contacts.map(contact => <article key={contact.title}><span className="contact-icon"><Image src={`/images/${contact.icon}.svg`} alt="" width={contact.width} height={contact.height} /></span><h2>{contact.title}</h2><p>{contact.text}</p></article>)}</Reveal>
    <Reveal className="contact-map"><Image src="/images/figma-29cd27ec56dd.jpg" alt="Illustrated map from the design showing the New York area" width={2930} height={1953} sizes="100vw" /></Reveal>
    <Reveal className="contact-fields-section"><div className="contact-fields" role="group" aria-label="Contact form preview">
      {/* У макеті адреса London, а карта New York: оригінальний ресурс збережено. Поля без form не можуть надіслати введене. */}
      <div className="fields-grid"><label>Name<input type="text" autoComplete="name" /></label><label className="phone-field">Phone<input type="tel" autoComplete="tel" /></label><label className="email-field">Email<input type="email" autoComplete="email" /></label><label className="subject-field">Subject<input type="text" /></label><label className="message-field">Message<textarea rows={5} /></label></div><button className="button" type="button">Send Message</button>
    </div></Reveal>
  </main>;
}
