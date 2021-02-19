import React from 'react';
import { render, screen, getByAltText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent component specs', () => {
  it('should work as spected passing required properties', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Test Title',
      labels: {
        acceptButton: 'Test accept',
        closeButton: 'Test close',
      },
      children: '<p>Description</p>',
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const titleElement = screen.getByRole('heading', { name: props.title });

    const childrenElement = screen.getByText(props.children);

    const closeLabel = screen.getByRole('button', {
      name: props.labels.closeButton,
    });

    const acceptLabel = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    //Assert

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Title');
    expect(childrenElement).toBeInTheDocument();
    expect(childrenElement).toHaveTextContent('Description');
    expect(closeLabel).toBeInTheDocument();
    expect(closeLabel).toHaveTextContent('Test close');
    expect(acceptLabel).toBeInTheDocument();
    expect(acceptLabel).toHaveTextContent('Test accept');
  });
  it('should  call the onClick property when click in accept btn', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Test Title',
      labels: {
        acceptButton: 'Test accept',
        closeButton: 'Test close',
      },
      children: '<p>Description</p>',
    };

    //Act

    render(<ConfirmationDialogComponent {...props} />);
    const handleOnAccept = screen.getByRole('button', { name: 'Test accept' });

    userEvent.click(handleOnAccept);

    //Assert

    expect(props.onAccept).toHaveBeenCalled();
  });

  it('should call the onClick property when click on cancel btn ', () => {
    //Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Test Title',
      labels: {
        acceptButton: 'Test accept',
        closeButton: 'Test close',
      },
      children: '<p>Description</p>',
    };
    //Act
    render(<ConfirmationDialogComponent {...props} />);

    const handleOnAccept = screen.getByRole('button', { name: 'Test close' });
    userEvent.click(handleOnAccept);
    //Assert

    expect(props.onClose).toHaveBeenCalled();
  });
});
