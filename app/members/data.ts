export type Member = {
  name: string;
  alias?: string;
  headline: string;
  bio: string;
  image: string;
  tags: string[];
};

export const members: Member[] = [
  {
    name: "Victor Ukor",
    alias: "Veecii",
    headline: "Music producer, songwriter, talent manager, and entrepreneur",
    bio:
      "Victor is a co-founder of Collab Culture, who is also a music producer, songwriter, talent manager, and entrepreneur known for blending Afrobeats, R&B, and Afro-fusion sounds. With over a decade of experience, he combines creativity, music business expertise, and artist mentorship to empower the next generation of talent. He also holds a Master’s degree in Artificial Intelligence, bringing a unique intersection of technology and music to his work.",
    image: "/members/victor-ukor.jpeg",
    tags: ["Music", "Artist Development", "AI"],
  },
  {
    name: "Mayowa Komolafe",
    alias: "Snow",
    headline: "Multidisciplinary creative, stylist, and brand strategist",
    bio:
      "Mayowa is a co-founder of Collab Culture and a multidisciplinary creative who blends fashion, visual storytelling, brand strategy, and cultural insight. He operates at the intersection of creativity and commercial thinking, combining a stylist’s eye with a strategist’s mindset. His work is rooted in streetwear, brand identity, visual merchandising, and campaign development, with a strong interest in creating immersive experiences that connect emotionally with audiences. He is also the founder of Blacksnow.",
    image: "/members/New-Mayowa-Komolafe.jpeg",
    tags: ["Fashion", "Brand Strategy", "Visual Storytelling"],
  },
  {
    name: "David Muzan",
    headline: "Lawyer turned property strategist and investor",
    bio:
      "David Muzan is a qualified lawyer with a Law degree and a Master’s in International Business Law from a UK university. He left legal practice not because he couldn’t succeed in it, but because property rewards the same core skills: reading risk, structuring agreements, and knowing when a deal truly works in your favour. In under two years, he grew his own Airbnb portfolio from a single unit to fourteen, and now deploys that same methodology for investors and landlords at Insight Pro Properties.",
    image: "/members/david-muzan.jpeg",
    tags: ["Law", "Property", "Strategy"],
  },
  {
    name: "Ilerioluwa Bamidele",
    headline: "Digital artist and founder of Sylphhclothing",
    bio:
      "Ileri is a digital artist and the founder of Sylphhclothing. Through digital art, design, and brand building, Ileri explores unique aesthetic narratives that blend creativity with strategic thinking. His work is driven by a passion for crafting visual experiences, using both traditional creative principles and emerging digital tools to develop distinctive concepts, campaigns, and fashion-focused projects that resonate with modern audiences.",
    image: "/members/ilerioluwa-bamidele.jpeg",
    tags: ["Digital Art", "Fashion", "Brand Building"],
  },
  {
    name: "Olumide Oyewunmi",
    headline: "Creative Director and founder of Midetush",
    bio:
      "Olumide is the Creative Director and Founder of the award-winning Afrocentric fashion brand Midetush, renowned for its bold fusion of African heritage, contemporary design, and innovative craftsmanship. Over the years, he has showcased his collections on prestigious runways across the United Kingdom and the United States, earning recognition for his distinctive creative vision and contribution to the global fashion landscape. His work extends beyond fashion design, positioning him as a cultural tastemaker, entrepreneur, and creative strategist.",
    image: "/members/olumide-oyewunmi.jpeg",
    tags: ["Fashion", "Creative Direction", "Culture"],
  },
];
