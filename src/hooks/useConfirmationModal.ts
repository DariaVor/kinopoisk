import { useState } from 'react';

export type ModalActionType = 'add' | 'remove' | null;

export const useConfirmationModal = () => {
  const [action, setAction] = useState<ModalActionType>(null);

  const open = (type: 'add' | 'remove') => setAction(type);
  const close = () => setAction(null);
  const isOpen = action !== null;

  return {
    action,
    isOpen,
    open,
    close,
  };
};
