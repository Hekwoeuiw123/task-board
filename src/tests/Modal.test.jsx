import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Modal from '../components/board/Modal';

describe('Modal Component', () => {
  it('should render the children passed into it', () => {
    render(
      <Modal onClose={() => {}}>
        <div>Hello Hintro Reviewer!</div>
      </Modal>
    );

    // Check if the text inside the modal is actually drawn on the screen
    expect(screen.getByText('Hello Hintro Reviewer!')).toBeInTheDocument();
  });
});