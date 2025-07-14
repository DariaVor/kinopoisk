import s from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, text }) => {
  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={onCancel}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <p>{text}</p>
        <div className={s.buttons}>
          <button onClick={onConfirm} className={s.confirm}>
            Подтвердить
          </button>
          <button onClick={onCancel} className={s.cancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
