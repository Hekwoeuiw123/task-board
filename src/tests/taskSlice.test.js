import { describe, it, expect } from 'vitest';
import taskReducer, { addTask } from '../features/tasks/taskSlice';

describe('Task Redux Slice', () => {
  it('should add a new task to an empty state', () => {
    const initialState = { items: [] };
    
    const newTaskPayload = {
      title: 'Test Task',
      description: 'Testing the reducer',
      priority: 'High',
      dueDate: '2026-12-31',
      tags: ['test']
    };

    // Run the reducer
    const newState = taskReducer(initialState, addTask(newTaskPayload));

    // Check the results
    expect(newState.items.length).toBe(1);
    expect(newState.items[0].title).toBe('Test Task');
    expect(newState.items[0].status).toBe('todo'); // Checks your default status logic
  });
});