import type { ReactNode } from "react";
type EditorialPageIntroProps = { eyebrow: string; title: ReactNode; description: string };

export function EditorialPageIntro({ eyebrow, title, description }: EditorialPageIntroProps) {
  return <section className="editorial-page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></section>;
}
