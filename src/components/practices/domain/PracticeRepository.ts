/**
 * PracticeRepository — Port (Interface)
 *
 * The repository pattern isolates data access.
 * Domain layer defines the interface; data-access layer implements it.
 * This allows swapping PostgreSQL for MongoDB, in-memory store, etc.
 */

import { Practice, UpdatePracticeInput } from './Practice';

export interface PracticeRepository {
  /**
   * Find a practice by its unique ID
   */
  findById(id: string): Promise<Practice | null>;

  /**
   * Find all practices for a philosopher
   */
  findByPhilosopher(philosopherId: string): Promise<Practice[]>;

  /**
   * Find all active practices for a philosopher
   */
  findActiveByPhilosopher(philosopherId: string): Promise<Practice[]>;

  /**
   * Find a practice by philosopher and name (to avoid duplicates)
   */
  findByPhilosopherAndName(philosopherId: string, name: string): Promise<Practice | null>;

  /**
   * Create a new practice
   */
  save(practice: Practice): Promise<Practice>;

  /**
   * Update an existing practice
   */
  update(id: string, updates: UpdatePracticeInput): Promise<Practice | null>;

  /**
   * Soft delete (deactivate) a practice
   */
  delete(id: string): Promise<void>;

  /**
   * Check if a practice exists
   */
  exists(id: string): Promise<boolean>;
}
