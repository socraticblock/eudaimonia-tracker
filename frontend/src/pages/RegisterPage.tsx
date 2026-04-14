/**
 * RegisterPage — Registration page
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GreekButton, GreekInput, GreekSelect, GreekCard } from '@/components/ui';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password && password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // TODO: Call API
    await new Promise((r) => setTimeout(r, 1000));
    localStorage.setItem('auth_token', 'fake-token');
    navigate('/stoa');
  };

  return (
    <div className="min-h-screen bg-parchment px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl uppercase tracking-wider text-ink">
            Begin Your Journey
          </h1>
          <p className="mt-2 font-body italic text-stone">
            Join the philosophers seeking flourishing.
          </p>
        </div>

        <GreekCard variant="default" className="meander-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <GreekInput
              name="name"
              type="text"
              label="Philosopher Name"
              placeholder="Marcus Aurelius"
              leftIcon={<User className="h-5 w-5" />}
              error={errors.name}
              required
            />

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
              placeholder="At least 8 characters"
              leftIcon={<Lock className="h-5 w-5" />}
              error={errors.password}
              required
            />

            <GreekSelect
              name="school"
              label="School of Philosophy"
              placeholder="Choose your school"
              options={[
                { value: 'STOA', label: 'The Stoa (Stoicism)' },
                { value: 'ACADEMY', label: 'The Academy (Platonism)' },
                { value: 'GARDEN', label: 'The Garden (Epicureanism)' },
              ]}
              error={errors.school}
            />

            <div className="pt-2">
              <GreekButton
                type="submit"
                isLoading={isLoading}
                leftIcon={<UserPlus className="h-5 w-5" />}
                className="w-full"
              >
                Become a Philosopher
              </GreekButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone">
              Already practicing?{' '}
              <Link
                to="/auth/login"
                className="font-heading text-sm uppercase tracking-wide text-greek-red"
              >
                Enter the Stoa
              </Link>
            </p>
          </div>
        </GreekCard>
      </div>
    </div>
  );
}
