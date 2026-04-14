/**
 * InMemoryPracticeRepository — Data Access Implementation
 *
 * An in-memory implementation of PracticeRepository.
 * Used for development and testing.
 * Replace with PrismaPracticeRepository for production.
 */

import { Practice, UpdatePracticeInput } from '../domain/Practice';
import { PracticeRepository } from '../domain/PracticeRepository';

export class InMemoryPracticeRepository implements PracticeRepository {
  private practices = new Map<string, Practice>();

  async findById(id: string): Promise<Practice | null> {
    return await Promise.resolve(this.practices.get(id) ?? null);
  }

  async findByPhilosopher(philosopherId: string): Promise<Practice[]> {
    return await Promise.resolve(
      Array.from(this.practices.values()).filter(p => p.philosopherId === philosopherId)
    );
  }

  async findActiveByPhilosopher(philosopherId: string): Promise<Practice[]> {
    return await Promise.resolve(
      Array.from(this.practices.values()).filter(
        p => p.philosopherId === philosopherId && p.isActive
      )
    );
  }

  async findByPhilosopherAndName(philosopherId: string, name: string): Promise<Practice | null> {
    return await Promise.resolve(
      Array.from(this.practices.values()).find(
        p => p.philosopherId === philosopherId && p.name === name
      ) ?? null
    );
  }

  async save(practice: Practice): Promise<Practice> {
    this.practices.set(practice.id, practice);
    return Promise.resolve(practice);
  }

  async update(id: string, updates: UpdatePracticeInput): Promise<Practice | null> {
    const existing = this.practices.get(id);
    if (!existing) return Promise.resolve(null);

    const updated: Practice = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };

    this.practices.set(id, updated);
    return Promise.resolve(updated);
  }

  async delete(id: string): Promise<void> {
    this.practices.delete(id);
    return Promise.resolve();
  }

  async exists(id: string): Promise<boolean> {
    return Promise.resolve(this.practices.has(id));
  }

  // ---- Test helpers ----

  /**
   * Clear all practices (for testing)
   */
  clear(): void {
    this.practices.clear();
  }

  /**
   * Seed with initial data (for testing)
   */
  seed(practices: Practice[]): void {
    practices.forEach(p => this.practices.set(p.id, p));
  }

  /**
   * Get count (for testing)
   */
  count(): number {
    return this.practices.size;
  }
}
