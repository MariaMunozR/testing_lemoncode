import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from 'common/models';

describe('useConfirmationDialog specs', () => {
  it('should return properties when it is called', () => {
    //Arrange
    const createEmptyLookup: Lookup = {
      id: '',
      name: '',
    };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    //Assert
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should return isOpen = true & itemToDelete = item when onOpenDialog is called with an item', () => {
    //Arrange
    const item: Lookup = {
      id: '000',
      name: 'Test name',
    };
    //Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    });
    //Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual({
      id: '000',
      name: 'Test name',
    });
  });

  it('should return isOpen = false when it is called onClose', () => {
    //Arrange

    //Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onClose();
    });
    //Assert
    expect(result.current.isOpen).toEqual(false);
  });
});
