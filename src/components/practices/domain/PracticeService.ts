/**
 * PracticeService — Domain Logic
 *
 * The PracticeService contains pure business logic for practices.
 * It has NO knowledge of Express, Prisma, or any framework.
 * It uses the PracticeRepository port via dependency injection.
 */

import { v4 as uuidv4 } from 'uuid';
import { Practice, CreatePracticeInput, UpdatePracticeInput, Frequency } from './Practice';
import { PracticeRepository } from './PracticeRepository';
import { ValidationError, NotFoundError, ConflictError } from '../../../shared/errors/AppError';

export class PracticeService {
  constructor(private readonly repository: PracticeRepository) {}

  /**
   * Create a new practice
   *
   * Validates:
   * - Name is not empty
   * - PhilosopherId is provided
   * - No duplicate name for this philosopher
   */
  async createPractice(input: CreatePracticeInput): Promise<Practice> {
    // Validate input
    if (!input.name || input.name.trim().length === 0) {
      throw new ValidationError('Practice name is required.');
    }

    if (!input.philosopherId || input.philosopherId.trim().length === 0) {
      throw new ValidationError('Philosopher ID is required.');
    }

    // Check for duplicate
    const existing = await this.repository.findByPhilosopherAndName(
      input.philosopherId,
      input.name.trim()
    );
    if (existing) {
      throw new ConflictError(`Practice "${input.name}" already exists for this philosopher.`);
    }

    // Validate frequency
    const validFrequencies: Frequency[] = ['DAILY', 'WEEKLY', 'MONTHLY'];
    if (!validFrequencies.includes(input.frequency)) {
      throw new ValidationError(
        `Invalid frequency. Must be one of: ${validFrequencies.join(', ')}`
      );
    }

    // Create practice
    const now = new Date();
    const practice: Practice = {
      id: uuidv4(),
      philosopherId: input.philosopherId.trim(),
      name: input.name.trim(),
      nameGreek: input.nameGreek?.trim(),
      description: input.description?.trim(),
      descriptionGreek: input.descriptionGreek?.trim(),
      frequency: input.frequency,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    return this.repository.save(practice);
  }

  /**
   * Get all practices for a philosopher
   */
  async getPracticesByPhilosopher(philosopherId: string): Promise<Practice[]> {
    if (!philosopherId || philosopherId.trim().length === 0) {
      throw new ValidationError('Philosopher ID is required.');
    }
    return this.repository.findByPhilosopher(philosopherId.trim());
  }

  /**
   * Get all active practices for a philosopher
   */
  async getActivePracticesByPhilosopher(philosopherId: string): Promise<Practice[]> {
    if (!philosopherId || philosopherId.trim().length === 0) {
      throw new ValidationError('Philosopher ID is required.');
    }
    return this.repository.findActiveByPhilosopher(philosopherId.trim());
  }

  /**
   * Get a practice by ID
   */
  async getPracticeById(id: string): Promise<Practice> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Practice ID is required.');
    }

    const practice = await this.repository.findById(id.trim());
    if (!practice) {
      throw new NotFoundError('Practice');
    }
    return practice;
  }

  /**
   * Update a practice
   */
  async updatePractice(id: string, updates: UpdatePracticeInput): Promise<Practice> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Practice ID is required.');
    }

    const practice = await this.repository.findById(id.trim());
    if (!practice) {
      throw new NotFoundError('Practice');
    }

    // Validate frequency if provided
    if (updates.frequency) {
      const validFrequencies: Frequency[] = ['DAILY', 'WEEKLY', 'MONTHLY'];
      if (!validFrequencies.includes(updates.frequency)) {
        throw new ValidationError(
          `Invalid frequency. Must be one of: ${validFrequencies.join(', ')}`
        );
      }
    }

    // Check for duplicate name if name is being updated
    if (updates.name && updates.name !== practice.name) {
      const existing = await this.repository.findByPhilosopherAndName(
        practice.philosopherId,
        updates.name.trim()
      );
      if (existing && existing.id !== id) {
        throw new ConflictError(`Practice "${updates.name}" already exists for this philosopher.`);
      }
    }

    const updated = await this.repository.update(id.trim(), {
      ...updates,
      name: updates.name?.trim(),
      nameGreek: updates.nameGreek?.trim(),
      description: updates.description?.trim(),
      descriptionGreek: updates.descriptionGreek?.trim(),
    });

    if (!updated) {
      throw new NotFoundError('Practice');
    }

    return updated;
  }

  /**
   * Deactivate (soft delete) a practice
   */
  async deactivatePractice(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Practice ID is required.');
    }

    const practice = await this.repository.findById(id.trim());
    if (!practice) {
      throw new NotFoundError('Practice');
    }

    await this.repository.update(id.trim(), { isActive: false });
  }

  /**
   * Reactivate a practice
   */
  async reactivatePractice(id: string): Promise<Practice> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Practice ID is required.');
    }

    const practice = await this.repository.findById(id.trim());
    if (!practice) {
      throw new NotFoundError('Practice');
    }

    const updated = await this.repository.update(id.trim(), { isActive: true });
    if (!updated) {
      throw new NotFoundError('Practice');
    }

    return updated;
  }
}
