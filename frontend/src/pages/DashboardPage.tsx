/**
 * DashboardPage — Main dashboard (The Stoa)
 */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GreekCard, GreekCardHeader, GreekCardFooter, GreekButton, StreakBadge, FrequencyBadge } from '@/components/ui';
import { Flame, Plus, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

const mockPractices = [
  { id: '1', name: 'Morning Meditation', frequency: 'DAILY' as const, streak: 12, completed: true },
  { id: '2', name: 'Evening Journal', frequency: 'DAILY' as const, streak: 7, completed: true },
  { id: '3', name: 'Physical Training', frequency: 'DAILY' as const, streak: 5, completed: false },
  { id: '4', name: 'Stoic Reading', frequency: 'WEEKLY' as const, streak: 3, completed: false },
];

const mockQuote = {
  text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
  author: "Marcus Aurelius"
};

export function DashboardPage() {
  const navigate = useNavigate();
  const completedCount = mockPractices.filter(p => p.completed).length;
  const totalCount = mockPractices.length;

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-heading text-3xl uppercase tracking-wider text-ink">
          Welcome back, Marcus
        </h1>
        <p className="mt-2 font-body italic text-stone">
          The Stoa awaits your daily examination.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <GreekCard variant="default" className="flex items-center gap-4">
          <div className="rounded-full bg-gold-pale p-3">
            <Flame className="h-6 w-6 text-gold" />
          </div>
          <div>
            <p className="font-heading text-sm uppercase tracking-wide text-stone">Overall Streak</p>
            <p className="font-heading text-2xl text-gold">12 Days</p>
          </div>
        </GreekCard>

        <GreekCard variant="default" className="flex items-center gap-4">
          <div className="rounded-full bg-success/10 p-3">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="font-heading text-sm uppercase tracking-wide text-stone">Today&apos;s Progress</p>
            <p className="font-heading text-2xl text-ink">{completedCount}/{totalCount}</p>
          </div>
        </GreekCard>

        <GreekCard variant="default" className="flex items-center gap-4">
          <div className="rounded-full bg-greek-red/10 p-3">
            <BookOpen className="h-6 w-6 text-greek-red" />
          </div>
          <div>
            <p className="font-heading text-sm uppercase tracking-wide text-stone">Active Practices</p>
            <p className="font-heading text-2xl text-ink">{totalCount}</p>
          </div>
        </GreekCard>
      </motion.div>

      {/* Today's practices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GreekCard variant="default">
          <GreekCardHeader
            title="Today's Examination"
            subtitle="Ἔλεγχος — What have you practiced today?"
            action={
              <GreekButton
                size="sm"
                onClick={() => navigate('/stoa/practices/new')}
                leftIcon={<Plus className="h-4 w-4" />}
              >
                New Practice
              </GreekButton>
            }
          />

          <div className="space-y-3">
            {mockPractices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`flex items-center justify-between rounded-lg border-2 p-4 transition-colors ${
                  practice.completed
                    ? 'border-success/30 bg-success/5'
                    : 'border-marble-border bg-marble hover:border-greek-red/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-2 ${
                    practice.completed ? 'bg-success/10' : 'bg-marble'
                  }`}>
                    {practice.completed ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-stone" />
                    )}
                  </div>
                  <div>
                    <p className={`font-heading text-sm uppercase tracking-wide ${
                      practice.completed ? 'text-success line-through' : 'text-ink'
                    }`}>
                      {practice.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <FrequencyBadge frequency={practice.frequency} size="sm" />
                      <StreakBadge count={practice.streak} size="sm" />
                    </div>
                  </div>
                </div>

                {!practice.completed && (
                  <GreekButton
                    size="sm"
                    variant="secondary"
                    onClick={() => {}}
                  >
                    Complete
                  </GreekButton>
                )}
              </motion.div>
            ))}
          </div>

          <GreekCardFooter>
            <GreekButton
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => navigate('/stoa/checkin')}
            >
              View All Practices
            </GreekButton>
          </GreekCardFooter>
        </GreekCard>
      </motion.div>

      {/* Daily quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GreekCard variant="outlined" className="text-center">
          <p className="font-body text-lg italic text-ink">
            &quot;{mockQuote.text}&quot;
          </p>
          <p className="mt-3 font-heading text-sm uppercase tracking-wider text-stone">
            — {mockQuote.author}
          </p>
        </GreekCard>
      </motion.div>
    </div>
  );
}
