/**
 * PracticesPage — List of all practices
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GreekCard, GreekButton, GreekInput, StreakBadge, FrequencyBadge } from '@/components/ui';
import { Plus, Search, Grid, List, Scroll } from 'lucide-react';

const mockPractices = [
  { id: '1', name: 'Morning Meditation', nameGreek: 'Πρωινὸς διαλογισμός', frequency: 'DAILY' as const, streak: 12, isActive: true },
  { id: '2', name: 'Evening Journal', nameGreek: 'Ἑσπερινὸς διαλογισμός', frequency: 'DAILY' as const, streak: 7, isActive: true },
  { id: '3', name: 'Physical Training', nameGreek: 'Γυμνασία', frequency: 'DAILY' as const, streak: 5, isActive: true },
  { id: '4', name: 'Stoic Reading', nameGreek: 'Ἀνάγνωσις', frequency: 'WEEKLY' as const, streak: 3, isActive: true },
  { id: '5', name: 'Cold Bath', nameGreek: 'Ψυχρὸν λουτρόν', frequency: 'DAILY' as const, streak: 0, isActive: false },
];

export function PracticesPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filteredPractices = mockPractices.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.nameGreek?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl uppercase tracking-wider text-ink">
            αἱ Πράξεις
          </h1>
          <p className="mt-1 font-body italic text-stone">
            Your daily practices
          </p>
        </div>

        <GreekButton
          leftIcon={<Plus className="h-5 w-5" />}
          onClick={() => navigate('/stoa/practices/new')}
        >
          New Practice
        </GreekButton>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <GreekInput
            placeholder="Search practices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
          />
        </div>
        <div className="flex gap-2">
          <GreekButton
            variant={view === 'grid' ? 'primary' : 'secondary'}
            onClick={() => setView('grid')}
          >
            <Grid className="h-5 w-5" />
          </GreekButton>
          <GreekButton
            variant={view === 'list' ? 'primary' : 'secondary'}
            onClick={() => setView('list')}
          >
            <List className="h-5 w-5" />
          </GreekButton>
        </div>
      </div>

      {/* Practice grid/list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={view === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-3'}
      >
        {filteredPractices.map((practice, index) => (
          <motion.div
            key={practice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GreekCard
              variant="default"
              className={`cursor-pointer transition-all hover:shadow-lg ${!practice.isActive ? 'opacity-60' : ''}`}
              onClick={() => navigate(`/stoa/practices/${practice.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-greek-red/10 p-2">
                    <Scroll className="h-5 w-5 text-greek-red" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm uppercase tracking-wide text-ink">
                      {practice.name}
                    </h3>
                    {practice.nameGreek && (
                      <p className="font-body text-xs italic text-stone">
                        {practice.nameGreek}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <FrequencyBadge frequency={practice.frequency} size="sm" />
                      {practice.isActive && <StreakBadge count={practice.streak} size="sm" />}
                    </div>
                  </div>
                </div>
              </div>
            </GreekCard>
          </motion.div>
        ))}
      </motion.div>

      {filteredPractices.length === 0 && (
        <GreekCard variant="outlined" className="py-12 text-center">
          <Scroll className="mx-auto mb-4 h-12 w-12 text-stone/40" />
          <p className="font-body text-lg text-stone">
            No practices found.
          </p>
          <GreekButton
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => navigate('/stoa/practices/new')}
          >
            Create your first practice
          </GreekButton>
        </GreekCard>
      )}
    </div>
  );
}
