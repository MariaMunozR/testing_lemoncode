import React from 'react';
import { createEmptyLookup, Lookup } from 'common/models';

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = React.useState<Lookup>(
    createEmptyLookup()
  );

  return {
    isOpen,
    itemToDelete,
    onAccept: () => {
      setItemToDelete(createEmptyLookup());
    },
    onClose: () => setIsOpen(false),
    onOpenDialog: (item: Lookup) => {
      setIsOpen(true);
      setItemToDelete(item);
    },
  };
};
