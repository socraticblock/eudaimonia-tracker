/**
 * PracticeService Tests
 *
 * Following TDD: Tests written BEFORE implementation.
 * Following AAA pattern: Arrange, Act, Assert.
 * Following per-test data: No shared fixtures.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PracticeService } from '../../../src/components/practices/domain/PracticeService';
import { PracticeRepository } from '../../../src/components/practices/domain/PracticeRepository';
import { Practice } from '../../../src/components/practices/domain/Practice';
import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from '../../../src/shared/errors/AppError';

describe('PracticeService', () => {
  // ---- Per-test data ----
  let service: PracticeService;
  let mockRepository: jest.Mocked<PracticeRepository>;

  beforeEach(() => {
    // Create fresh mock for each test
    mockRepository = {
      findById: vi.fn(),
      findByPhilosopher: vi.fn(),
      findActiveByPhilosopher: vi.fn(),
      findByPhilosopherAndName: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      exists: vi.fn(),
    };
    service = new PracticeService(mockRepository);
  });

  // ============================================
  // createPractice
  // ============================================
  describe('createPractice', () => {
    // ---- 1. Happy Path ----
    it('creates a practice when given valid input', async () => {
      // Arrange
      const input = {
        philosopherId: 'phil-1',
        name: 'Morning Meditation',
        nameGreek: 'Πρωινὸς διαλογισμός',
        frequency: 'DAILY' as const,
      };

      mockRepository.findByPhilosopherAndName.mockResolvedValue(null);
      mockRepository.save.mockImplementation(async (practice) => practice);

      // Act
      const result = await service.createPractice(input);

      // Assert
      expect(result.name).toBe('Morning Meditation');
      expect(result.nameGreek).toBe('Πρωινὸς διαλογισμός');
      expect(result.frequency).toBe('DAILY');
      expect(result.isActive).toBe(true);
      expect(result.philosopherId).toBe('phil-1');
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    // ---- 2. Validation Error (Empty Name) ----
    it('throws ValidationError when name is empty', async () => {
      // Arrange
      const input = {
        philosopherId: 'phil-1',
        name: '   ', // Whitespace only
        frequency: 'DAILY' as const,
      };

      // Act & Assert
      await expect(service.createPractice(input)).rejects.toThrow(
        ValidationError
      );
      await expect(service.createPractice(input)).rejects.toThrow(
        'Practice name is required.'
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('throws ValidationError when name is missing', async () => {
      // Arrange
      const input = {
        philosopherId: 'phil-1',
        name: '',
        frequency: 'DAILY' as const,
      } as Parameters<typeof service.createPractice>[0];

      // Act & Assert
      await expect(service.createPractice(input)).rejects.toThrow(
        ValidationError
      );
    });

    // ---- 3. Validation Error (Missing PhilosopherId) ----
    it('throws ValidationError when philosopherId is missing', async () => {
      // Arrange
      const input = {
        philosopherId: '',
        name: 'Morning Meditation',
        frequency: 'DAILY' as const,
      } as Parameters<typeof service.createPractice>[0];

      // Act & Assert
      await expect(service.createPractice(input)).rejects.toThrow(
        ValidationError
      );
      await expect(service.createPractice(input)).rejects.toThrow(
        'Philosopher ID is required.'
      );
    });

    // ---- 4. Conflict Error (Duplicate Name) ----
    it('throws ConflictError when practice with same name exists', async () => {
      // Arrange
      const input = {
        philosopherId: 'phil-1',
        name: 'Morning Meditation',
        frequency: 'DAILY' as const,
      };

      const existingPractice: Practice = {
        id: 'existing-1',
        philosopherId: 'phil-1',
        name: 'Morning Meditation',
        frequency: 'DAILY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findByPhilosopherAndName.mockResolvedValue(existingPractice);

      // Act & Assert
      await expect(service.createPractice(input)).rejects.toThrow(ConflictError);
      await expect(service.createPractice(input)).rejects.toThrow(
        'already exists'
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    // ---- 5. Validation Error (Invalid Frequency) ----
    it('throws ValidationError when frequency is invalid', async () => {
      // Arrange
      const input = {
        philosopherId: 'phil-1',
        name: 'Morning Meditation',
        frequency: 'INVALID' as Parameters<typeof service.createPractice>[0]['frequency'],
      };

      mockRepository.findByPhilosopherAndName.mockResolvedValue(null);

      // Act & Assert
      await expect(service.createPractice(input)).rejects.toThrow(
        ValidationError
      );
      await expect(service.createPractice(input)).rejects.toThrow(
        'Invalid frequency'
      );
    });

    // ---- Edge Case: Trim whitespace ----
    it('trims whitespace from name', async () => {
      // Arrange
      const input = {
        philosopherId: 'phil-1',
        name: '  Morning Meditation  ',
        frequency: 'DAILY' as const,
      };

      mockRepository.findByPhilosopherAndName.mockResolvedValue(null);
      mockRepository.save.mockImplementation(async (practice) => practice);

      // Act
      const result = await service.createPractice(input);

      // Assert
      expect(result.name).toBe('Morning Meditation'); // Trimmed
    });
  });

  // ============================================
  // getPracticeById
  // ============================================
  describe('getPracticeById', () => {
    // ---- Happy Path ----
    it('returns a practice when found', async () => {
      // Arrange
      const practice: Practice = {
        id: 'practice-1',
        philosopherId: 'phil-1',
        name: 'Morning Meditation',
        frequency: 'DAILY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(practice);

      // Act
      const result = await service.getPracticeById('practice-1');

      // Assert
      expect(result).toEqual(practice);
    });

    // ---- Not Found ----
    it('throws NotFoundError when practice does not exist', async () => {
      // Arrange
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getPracticeById('nonexistent')).rejects.toThrow(
        NotFoundError
      );
    });

    // ---- Validation Error (Empty ID) ----
    it('throws ValidationError when id is empty', async () => {
      // Arrange
      const emptyId = '   ';

      // Act & Assert
      await expect(service.getPracticeById(emptyId)).rejects.toThrow(
        ValidationError
      );
    });
  });

  // ============================================
  // getPracticesByPhilosopher
  // ============================================
  describe('getPracticesByPhilosopher', () => {
    // ---- Happy Path ----
    it('returns all practices for a philosopher', async () => {
      // Arrange
      const practices: Practice[] = [
        {
          id: 'p-1',
          philosopherId: 'phil-1',
          name: 'Meditation',
          frequency: 'DAILY',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'p-2',
          philosopherId: 'phil-1',
          name: 'Journaling',
          frequency: 'DAILY',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockRepository.findByPhilosopher.mockResolvedValue(practices);

      // Act
      const result = await service.getPracticesByPhilosopher('phil-1');

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Meditation');
      expect(result[1].name).toBe('Journaling');
    });

    // ---- Empty List ----
    it('returns empty array when philosopher has no practices', async () => {
      // Arrange
      mockRepository.findByPhilosopher.mockResolvedValue([]);

      // Act
      const result = await service.getPracticesByPhilosopher('phil-new');

      // Assert
      expect(result).toHaveLength(0);
    });

    // ---- Validation Error (Empty PhilosopherId) ----
    it('throws ValidationError when philosopherId is empty', async () => {
      // Arrange
      const emptyId = '';

      // Act & Assert
      await expect(
        service.getPracticesByPhilosopher(emptyId)
      ).rejects.toThrow(ValidationError);
    });
  });

  // ============================================
  // updatePractice
  // ============================================
  describe('updatePractice', () => {
    // ---- Happy Path ----
    it('updates a practice when given valid input', async () => {
      // Arrange
      const existing: Practice = {
        id: 'p-1',
        philosopherId: 'phil-1',
        name: 'Meditation',
        frequency: 'DAILY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updates = {
        name: 'Evening Meditation',
        frequency: 'WEEKLY' as const,
      };

      const updatedPractice: Practice = {
        ...existing,
        ...updates,
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.findByPhilosopherAndName.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue(updatedPractice);

      // Act
      const result = await service.updatePractice('p-1', updates);

      // Assert
      expect(result.name).toBe('Evening Meditation');
      expect(result.frequency).toBe('WEEKLY');
    });

    // ---- Not Found ----
    it('throws NotFoundError when practice does not exist', async () => {
      // Arrange
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.updatePractice('nonexistent', { name: 'New Name' })
      ).rejects.toThrow(NotFoundError);
    });

    // ---- Conflict Error (Duplicate Name) ----
    it('throws ConflictError when updating to existing name', async () => {
      // Arrange
      const existing: Practice = {
        id: 'p-1',
        philosopherId: 'phil-1',
        name: 'Meditation',
        frequency: 'DAILY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const duplicate: Practice = {
        id: 'p-2',
        philosopherId: 'phil-1',
        name: 'Evening Meditation',
        frequency: 'DAILY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.findByPhilosopherAndName.mockResolvedValue(duplicate);

      // Act & Assert
      await expect(
        service.updatePractice('p-1', { name: 'Evening Meditation' })
      ).rejects.toThrow(ConflictError);
    });

    // ---- Validation Error (Invalid Frequency) ----
    it('throws ValidationError when frequency is invalid', async () => {
      // Arrange
      const existing: Practice = {
        id: 'p-1',
        philosopherId: 'phil-1',
        name: 'Meditation',
        frequency: 'DAILY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existing);

      // Act & Assert
      await expect(
        service.updatePractice('p-1', { frequency: 'INVALID' as Parameters<typeof service.updatePractice>[1]['frequency'] })
      ).rejects.toThrow(ValidationError);
    });
  });

  // ============================================
  // deactivatePractice
  // ============================================
  describe('deactivatePractice', () => {
    // ---- Happy Path ----
    it('deactivates a practice', async () => {
      // Arrange
      const existing: Practice = {
        id: 'p-1',
        philosopherId: 'phil-1',
        name: 'Meditation',
        frequency: 'DAILY',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.update.mockResolvedValue({
        ...existing,
        isActive: false,
      });

      // Act
      await service.deactivatePractice('p-1');

      // Assert
      expect(mockRepository.update).toHaveBeenCalledWith('p-1', {
        isActive: false,
      });
    });

    // ---- Not Found ----
    it('throws NotFoundError when practice does not exist', async () => {
      // Arrange
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.deactivatePractice('nonexistent')).rejects.toThrow(
        NotFoundError
      );
    });
  });

  // ============================================
  // reactivatePractice
  // ============================================
  describe('reactivatePractice', () => {
    // ---- Happy Path ----
    it('reactivates a practice', async () => {
      // Arrange
      const existing: Practice = {
        id: 'p-1',
        philosopherId: 'phil-1',
        name: 'Meditation',
        frequency: 'DAILY',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.update.mockResolvedValue({
        ...existing,
        isActive: true,
      });

      // Act
      const result = await service.reactivatePractice('p-1');

      // Assert
      expect(result.isActive).toBe(true);
    });

    // ---- Not Found ----
    it('throws NotFoundError when practice does not exist', async () => {
      // Arrange
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.reactivatePractice('nonexistent')).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
