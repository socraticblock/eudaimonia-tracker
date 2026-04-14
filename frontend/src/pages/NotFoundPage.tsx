import { Link } from 'react-router-dom';
import { GreekButton } from '@/components/ui';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-parchment px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <h1 className="font-heading text-8xl uppercase tracking-wider text-greek-red">
          404
        </h1>
        <p className="mt-4 font-heading text-xl uppercase tracking-wide text-ink">
          Page Not Found
        </p>
        <p className="mt-2 font-body italic text-stone">
          The path you seek does not exist in this realm.
        </p>
        <div className="mt-8">
          <Link to="/">
            <GreekButton>Return to the Entrance</GreekButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
