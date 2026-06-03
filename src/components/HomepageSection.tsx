import type React from "react";
import { kebabCase } from "es-toolkit";

type HomepageSectionProps = {
  title: string;
};

const Root = ({ title, children }: React.PropsWithChildren<HomepageSectionProps>) => {
  const id = kebabCase(title);
  return (
    <section id={id}>
      <h2>{title}</h2>
      <div className="content text-balance text-hero text-center text-foreground line-height-2">
        {children}
      </div>
    </section>
  );
};

const Paragraph = ({ children }: React.PropsWithChildren) => {
  return <p className="max-w-[32em] mx-auto mb-[0.25lh]">{children}</p>;
};

const Note = ({ children }: React.PropsWithChildren) => {
  return <p className="max-w-[32em] text-2xl mx-auto text-muted-foreground">{children}</p>;
};

export const HomepageSection = Object.assign(Root, {
  displayName: "HomepageSection",
  Paragraph,
  Note,
});
