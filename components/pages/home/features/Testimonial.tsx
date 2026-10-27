import { nbsp } from "@/utils/nbsp";

type TestimonialProps = {
  quote: string;
  author: string;
  project: string;
};

export function Testimonial({ quote, author, project }: TestimonialProps) {
  return (
    <figure data-reveal className="mx-auto mt-16 max-w-3xl text-center md:mt-20">
      <blockquote className="font-heading text-xl leading-relaxed font-light text-balance text-dark sm:text-2xl">
        <p>„{nbsp(quote)}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-center gap-3 text-sm text-dark/60">
        <span aria-hidden="true" className="h-px w-6 bg-dark/30" />
        <span>
          {author} <span aria-hidden="true">·</span> {project}
        </span>
      </figcaption>
    </figure>
  );
}
