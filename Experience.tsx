import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-28 px-6", className)}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 id={`${id}-heading`} className="section-heading">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-2xl text-ink-500 dark:text-ink-300">
              {description}
            </p>
          )}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
