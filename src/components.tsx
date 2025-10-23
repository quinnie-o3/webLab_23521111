/** @jsx createElement */
import { createElement, ComponentProps, VNode, useState } from './jsx-runtime';


// TODO: Create a Card component
interface CardProps extends ComponentProps {
  title?: string;
  className?: string;
  onClick?: () => void;
}

const Card = (props: CardProps): VNode => {
  const { title, children, className, onClick } = props;

  const cardClassName = `card ${className || ''}`.trim();

  return (
    <div className={cardClassName} onClick={onClick}>
      {title && <div className="card-title"><h2>{title}</h2></div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};


// TODO: Create a Modal component
interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = (props: ModalProps): VNode | null => {
  const { isOpen, onClose, title, children } = props;

  // STEP 1: Return null if not open
  if (!isOpen) {
    return null;
  }

  // STEP 3: Handle click outside to close
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <header className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};


// TODO: Create a Form component
interface FormProps extends ComponentProps {
  onSubmit: (e: Event) => void;
  className?: string;
}

const Form = (props: FormProps): VNode => {
  const { onSubmit, children, className } = props;

  // Handle form submission and prevent default
  const handleSubmit = (e: Event) => {
    e.preventDefault(); 
    onSubmit(e); 
  };

  return (
    <form className={`form ${className || ''}`.trim()} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};


// TODO: Create an Input component
interface InputProps extends ComponentProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'checkbox';
  value: string | number | boolean;
  onInput?: (e: Event) => void; // Dùng cho text input
  onChange?: (e: Event) => void; // Dùng cho checkbox
  placeholder?: string;
  className?: string;
  checked?: boolean; // Dùng cho checkbox
}

const Input = (props: InputProps): VNode => {
  const { type = 'text', className, ...restProps } = props;

  // Tách riêng các props không hợp lệ với DOM <input> (như 'children')
  const { children, ...validProps } = restProps;

  return (
    <input
      type={type}
      className={`input ${className || ''}`.trim()}
      {...validProps} // Truyền tất cả props còn lại (value, onInput, placeholder,...)
    />
  );
};

export { Card, Modal, Form, Input };
