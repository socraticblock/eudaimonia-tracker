/**
 * HomePage — Landing page for Eudaimonia
 *
 * Public landing page with Greek theming.
 */
import { Link } from 'react-router-dom';
import { GreekButton, GreekCard } from '@/components/ui';
import { ArrowRight, Quote } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <GreekPattern className="h-full w-full" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
          {/* Greek columns icon */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-greek-red/10 p-6">
              <GreekColumnsIcon className="h-16 w-16 text-greek-red" />
            </div>
          </div>

          <h1 className="mb-4 font-heading text-5xl uppercase tracking-wider text-ink">
            Εὐδαιμονία
          </h1>
          <p className="mb-2 font-heading text-2xl uppercase tracking-wide text-stone">
            Eudaimonia
          </p>
          <p className="mx-auto mb-8 max-w-2xl font-body text-xl text-ink-light">
            Flourishing through daily practice. Track your disciplines like the ancient philosophers,
            build unbreakable chains of consistency, and walk the path of virtue.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/auth/register">
              <GreekButton size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Begin Your Journey
              </GreekButton>
            </Link>
            <Link to="/auth/login">
              <GreekButton variant="secondary" size="lg">
                Enter the Stoa
              </GreekButton>
            </Link>
          </div>
        </div>
      </header>

      {/* Meander divider */}
      <div className="mx-auto max-w-4xl px-4">
        <MeanderDivider />
      </div>

      {/* Features Section */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-12 text-center font-heading text-3xl uppercase tracking-wider text-ink">
          The Practice
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            title="The Practices"
            greek="αἱ Πράξεις"
            description="Create daily disciplines with Greek names. Track meditation, journaling, or any virtue you seek to cultivate."
            icon={<ScrollIcon className="h-8 w-8 text-greek-red" />}
          />
          <FeatureCard
            title="The Examination"
            greek="ὁ Ἔλεγχος"
            description="Daily check-ins to examine your progress. One-click completion with optional reflection notes."
            icon={<CheckIcon className="h-8 w-8 text-greek-red" />}
          />
          <FeatureCard
            title="The Chain"
            greek="ἡ Ἀλυσίδα"
            description="Build unbreakable streaks of consistency. Watch your Olympic Fire grow brighter each day."
            icon={<FlameIcon className="h-8 w-8 text-gold" />}
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-marble py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Quote className="mx-auto mb-6 h-10 w-10 text-gold/40" />
          <blockquote className="font-body text-2xl italic text-ink">
            "We suffer more often in imagination than in reality."
          </blockquote>
          <cite className="mt-4 block font-heading text-sm uppercase tracking-wider text-stone">
            — Seneca
          </cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="mb-4 font-heading text-3xl uppercase tracking-wider text-ink">
          Walk the Path of Virtue
        </h2>
        <p className="mb-8 font-body text-lg text-ink-light">
          The philosopher who practices daily builds an unbreakable chain of excellence.
          Begin your journey today.
        </p>
        <Link to="/auth/register">
          <GreekButton size="lg">Start Practicing</GreekButton>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-marble-border py-8 text-center text-sm text-stone">
        <p>Built with the Ancient Greeks in mind.</p>
        <p className="mt-1 font-heading text-xs uppercase tracking-wider">
          Εὐδαιμονία — Eudaimonia
        </p>
      </footer>
    </div>
  );
}

// ---- Feature Card ----
interface FeatureCardProps {
  title: string;
  greek: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, greek, description, icon }: FeatureCardProps) {
  return (
    <GreekCard variant="default" className="text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="mb-1 font-heading text-lg uppercase tracking-wide text-ink">
        {title}
      </h3>
      <p className="mb-3 font-body text-sm italic text-stone">{greek}</p>
      <p className="font-body text-ink-light">{description}</p>
    </GreekCard>
  );
}

// ---- SVG Icons ----
function GreekColumnsIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
      <rect x="18" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
      <path d="M1 4L12 1L23 4V6L12 3L1 6V4Z" fill="currentColor" />
      <rect x="2" y="20" width="20" height="2" fill="currentColor" rx="0.5" />
    </svg>
  );
}

function GreekPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="greek" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#2C2416" />
          <rect x="0" y="18" width="20" height="2" fill="#2C2416" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#greek)" />
    </svg>
  );
}

function ScrollIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}

function CheckIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function FlameIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z" />
      <path d="M12 14C12 14 9 17 9 20C9 21.66 10.34 23 12 23C13.66 23 15 21.66 15 20C15 17 12 14 12 14Z" />
    </svg>
  );
}

function MeanderDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-marble-border" />
      <svg className="h-6 w-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 12h3v9h14v-9h3L12 2zm0 2.84L19.16 12H18v7H6v-7H4.84L12 4.84z" />
      </svg>
      <div className="h-px flex-1 bg-marble-border" />
    </div>
  );
}
