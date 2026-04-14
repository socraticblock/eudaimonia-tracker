/**
 * LoginPage — Authentication page
 *
 * Styled as an ancient scroll/parchment.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GreekButton, GreekInput, GreekCard } from '@/components/ui';
import { Mail, Lock, LogIn } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate
    if (!email) {
      setErrors({ email: 'Email is required' });
      setIsLoading(false);
      return;
    }
    if (!password) {
      setErrors({ password: 'Password is required' });
      setIsLoading(false);
      return;
    }

    // TODO: Call API
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    localStorage.setItem('auth_token', 'fake-token');
    navigate('/stoa');
  };

  return (
    <div className="min-h-screen bg-parchment px-4 py-16">
      <div className="mx-auto max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-greek-red/10 p-4">
            <svg className="h-12 w-12 text-greek-red" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
              <rect x="18" y="4" width="3" height="16" fill="currentColor" rx="0.5" />
              <path d="M1 4L12 1L23 4V6L12 3L1 6V4Z" fill="currentColor" />
              <rect x="2" y="20" width="20" height="2" fill="currentColor" rx="0.5" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl uppercase tracking-wider text-ink">
            Enter the Stoa
          </h1>
          <p className="mt-2 font-body italic text-stone">
            Welcome back, philosopher.
          </p>
        </div>

        <GreekCard variant="default" className="meander-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <GreekInput
              name="email"
              type="email"
              label="Email"
              placeholder="philosopher@example.com"
              leftIcon={<Mail className="h-5 w-5" />}
              error={errors.email}
              required
            />

            <GreekInput
              name="password"
              type="password"
              label="Password"
              placeholder="Your password"
              leftIcon={<Lock className="h-5 w-5" />}
              error={errors.password}
              required
            />

            <div className="pt-2">
              <GreekButton
                type="submit"
                isLoading={isLoading}
                leftIcon={<LogIn className="h-5 w-5" />}
                className="w-full"
              >
                Enter
              </GreekButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone">
              New to Eudaimonia?{' '}
              <Link
                to="/auth/register"
                className="font-heading text-sm uppercase tracking-wide text-greek-red hover:text-greek-red-dark"
              >
                Begin your journey
              </Link>
            </p>
          </div>
        </GreekCard>

        {/* Greek footer */}
        <p className="mt-8 text-center font-body italic text-sm text-stone">
          "The soul becomes dyed with the color of its thoughts."
        </p>
        <p className="mt-1 text-center font-heading text-xs uppercase tracking-wider text-stone/60">
          — Marcus Aurelius
        </p>
      </div>
    </div>
  );
}
