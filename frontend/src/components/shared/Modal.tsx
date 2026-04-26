import type { ReactNode } from 'react';
import { Modal as BsModal, Button } from 'react-bootstrap';

interface ModalProps {
  isOpen: boolean;
  title: string;
  body: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function Modal({
  isOpen,
  title,
  body,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ModalProps) {
  return (
    <BsModal show={isOpen} onHide={onCancel} centered>
      <BsModal.Header closeButton>
        <BsModal.Title>{title}</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>{body}</BsModal.Body>
      <BsModal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </BsModal.Footer>
    </BsModal>
  );
}
