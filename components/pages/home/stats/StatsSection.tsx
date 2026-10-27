import { StatCounter } from "@/components/pages/home/stats/StatCounter";
import { Reveal } from "@/components/UI/animation/Reveal";
import { Container } from "@/components/UI/Container";
import type { StatsContent } from "@/model/pages/home";
import { cn } from "@/utils/cn";

type StatsSectionProps = {
  content: StatsContent;
};

/** Pas z liczbami w kolorze marki – między wyróżnikami a ofertą. */
export function StatsSection({ content }: StatsSectionProps) {
  return (
    <section aria-label={content.label} className="bg-accent text-white">
      <Reveal>
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {content.items.map((item, index) => (
              <div
                key={item.label}
                data-reveal="fade"
                className={cn(
                  "flex flex-col items-center gap-1.5 py-9 text-center lg:py-11",
                  index % 2 === 1 && "border-l border-white/15",
                  index >= 2 && "border-t border-white/15 lg:border-t-0",
                  index === 2 && "lg:border-l",
                )}
              >
                <dt className="order-2 text-sm text-white/70">{item.label}</dt>
                <dd className="order-1 font-heading text-[2.125rem] leading-none font-semibold tracking-[-0.02em] sm:text-[2.5rem]">
                  <StatCounter value={item.value} suffix={item.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Reveal>
    </section>
  );
}
