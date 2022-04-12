import React, { FunctionComponent, MouseEvent } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Button } from 'components/UI/Button/Button/Button';
import { Backdrop } from 'components/UI/Backdrop/Backdrop';

import styles from './Modal.module.css';

export type ModalSize = 'small' | 'medium' | 'big';

export type ModalProps = {
    title: string;
    isOpen: boolean;
    cancelText?: string;
    confirmText?: string;
    size?: ModalSize;
    loading?: boolean;
    onConfirm?: (e?: MouseEvent) => void;
    onClose?: (e?: MouseEvent) => void;
    onCancel?: (e?: MouseEvent) => void;
}

export const Modal: FunctionComponent<ModalProps> = ({ 
    title,
    children,
    isOpen,
    loading,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    size = 'medium',
    onConfirm,
    onClose,
    onCancel,
}) => {
    return (
        <>
            <CSSTransition
               timeout={250}
               in={isOpen}
               unmountOnExit
               mountOnEnter
               classNames={{
                   enter: styles.modalEnter,
                   enterActive: styles.modalEnterActive,
                   exit: styles.modalExit,
                   exitActive: styles.modalExitActive
               }}
            >
                <div className={`${styles.modal} ${styles[size]}`}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalAction} />
                        <h2>{title}</h2>
                        <div 
                            onClick={!loading ? onClose : undefined} 
                            className={`${styles.modalAction} ${loading ? styles.actionDisabled : ''}`}
                        >
                            {onClose && (
                                <i className="fas fa-times" />
                            )}
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        {children}
                    </div>
                    <div className={styles.modalFooter}>
                        {onCancel && (
                            <div className={styles.footerButton}>
                                <Button 
                                    disabled={loading}
                                    fullWidth
                                    variant="classic"
                                    size="medium"
                                    color="#FFC6C6"
                                    label={cancelText}
                                    onClick={onCancel}
                                />
                            </div>
                        )}
                        {onConfirm && (
                            <div className={styles.footerButton}>
                                <Button 
                                    disabled={loading}
                                    fullWidth
                                    variant="classic"
                                    size="medium"
                                    color="#A5FFA5"
                                    label={confirmText}
                                    onClick={onConfirm}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </CSSTransition>
            <Backdrop show={isOpen} zIndex={599} onClick={!loading ? onClose : undefined} />
        </>
    )
}
