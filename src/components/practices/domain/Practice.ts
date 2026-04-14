/**
 * Practice — Domain Entity
 *
 * The Practice (Πρᾶξις) — a daily discipline.
 * In Stoic philosophy, askēsis (ἄσκησις) is the practice of virtue.
 */

export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface Practice {
  id: string;
  philosopherId: string;
  name: string;
  nameGreek?: string;
  description?: string;
  descriptionGreek?: string;
  frequency: Frequency;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePracticeInput {
  philosopherId: string;
  name: string;
  nameGreek?: string;
  description?: string;
  descriptionGreek?: string;
  frequency: Frequency;
}

export interface UpdatePracticeInput {
  name?: string;
  nameGreek?: string;
  description?: string;
  descriptionGreek?: string;
  frequency?: Frequency;
  isActive?: boolean;
}
