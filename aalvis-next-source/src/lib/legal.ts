import { IM } from "./images";

export const LEGAL_META_KEY: Record<string, string> = {
  "privacy-policy": "privacy",
  "cookies-policy": "cookies",
  "terms-and-conditions": "terms",
  "image-credits": "privacy",
};

export const LEGAL: Record<string, { title: string; sections: [string, string][] }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      ["1. Controller", "The data controller for this website is the AALVIS brand owner. [CLIENT LEGAL ENTITY, REGISTERED ADDRESS AND CONTACT DETAILS TO BE INSERTED BEFORE LAUNCH.]"],
      ["2. Data we collect", "When you send an enquiry we process the data you provide: name, email address, optional phone number, country, preferred language, enquiry subject and message. When you use the WhatsApp button, your message is transferred to WhatsApp (Meta Platforms) under their privacy policy."],
      ["3. Purpose and legal basis", "We process enquiry data to respond to your request (Art. 6(1)(b) GDPR — pre-contractual measures) and, where you consent, to send our newsletter (Art. 6(1)(a) GDPR)."],
      ["4. Storage", "Enquiries are stored only where the brand owner has approved a storage solution and this policy. No enquiry database is active until such approval is documented."],
      ["5. Recipients", "Data is shared only with service providers strictly necessary to answer your enquiry (email/WhatsApp delivery). We never sell personal data."],
      ["6. Your rights", "You may request access, rectification, erasure, restriction, portability and object to processing, and withdraw consent at any time, by contacting us through the channels on this website."],
      ["7. Cookies", "See our Cookie Policy."],
    ],
  },
  "cookies-policy": {
    title: "Cookie Policy",
    sections: [
      ["1. What we use", "This website stores a language preference in your browser (localStorage) so the site remembers the language you chose. The announcement bar dismissal is stored in session storage."],
      ["2. Analytics", "Analytics or marketing cookies are only set if the brand owner configures an analytics provider (e.g. Google Tag Manager). Until then, no tracking cookies are placed."],
      ["3. Third parties", "Fonts are served by the deployment platform; images are loaded from Wikimedia Commons. These services may receive your IP address as part of delivering those assets."],
      ["4. Managing cookies", "You can clear or block cookies and site data in your browser settings at any time."],
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    sections: [
      ["1. Nature of this website", "This website is a brand presentation and enquiry channel. It is not an online shop: no products are sold, no prices are quoted and no orders can be placed through this website."],
      ["2. Content", "All imagery, text and design are the property of the AALVIS brand owner or used under licence (see Image Credits). Reproduction without permission is prohibited."],
      ["3. Enquiries", "Submitting an enquiry does not create a contract. Responses are provided by the client services team subject to availability."],
      ["4. Liability", "The website is provided 'as is'. To the extent permitted by law, the brand owner is not liable for indirect losses arising from use of the website."],
      ["5. Governing law", "[JURISDICTION TO BE INSERTED BY THE CLIENT'S LEGAL ADVISOR BEFORE LAUNCH.]"],
    ],
  },
  "image-credits": {
    title: "Image Credits",
    sections: [
      ["Licenced imagery", "The following photographs are served from Wikimedia Commons under the licences stated. Replace with client-owned campaign photography before commercial launch."],
      ...[IM.hero, IM.gold, IM.diamond, IM.rings, IM.necklaces, IM.earrings, IM.bracelets, IM.aurelia, IM.eclat, IM.lumiere, IM.atelier, IM.craft, IM.campaign, ...IM.gallery].map(
        (v, i) => [`${i + 1}. ${v.title}`, `${v.creator || "Unknown creator"} — ${v.license} — ${v.page}`] as [string, string]
      ),
    ],
  },
};
