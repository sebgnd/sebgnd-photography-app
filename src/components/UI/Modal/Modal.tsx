import { FunctionComponent, MouseEvent, ReactNode, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Icon } from 'components/UI/Content/Icon/Icon';
import { Text } from 'components/UI/Content/Text/Text';
import { Button } from 'components/UI/Button/Button/Button';
import { Backdrop } from 'components/UI/Backdrop/Backdrop';

import styles from './Modal.module.scss';

export type ModalSize = 'small' | 'medium' | 'big';

export type ModalProps = {
	title: string;
	isOpen: boolean;
	cancelText?: string;
	confirmText?: string;
	size?: ModalSize;
	loading?: boolean;
	children: ReactNode,
	disableConfirmButton?: boolean,
	onConfirm?: (e?: MouseEvent) => void;
	onClose?: (e?: MouseEvent) => void;
	onCancel?: (e?: MouseEvent) => void;
	onCloseAnimationFinished?: () => void,
};

const ANIMATION_DURATION = 250;

export const Modal: FunctionComponent<ModalProps> = ({ 
	title,
	children,
	isOpen,
	loading,
	cancelText = 'Cancel',
	confirmText = 'Confirm',
	size = 'medium',
	disableConfirmButton = false,
	onClose,
	onCancel,
	onConfirm,
	onCloseAnimationFinished,
}) => {
	useEffect(() => {
		if (!isOpen) {
			const timeoutId = setTimeout(() => {
				onCloseAnimationFinished?.();
			}, ANIMATION_DURATION);

			return () => {
				clearTimeout(timeoutId);
			}
		}

		return () => {};
	}, [onCloseAnimationFinished, isOpen]);

	return (
		<>
			<CSSTransition
				timeout={ANIMATION_DURATION}
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
						<Text type="h2" size="large" bold text={title} />
						<div 
							onClick={!loading ? onClose : undefined} 
							className={`${styles.modalAction} ${loading ? styles.actionDisabled : ''}`}
						>
							{onClose && (
								<Icon size="large" name="times" />
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
									color="destructive"
									label={cancelText}
									onClick={onCancel}
								/>
							</div>
						)}
						{onConfirm && (
							<div className={styles.footerButton}>
								<Button
									disabled={loading || disableConfirmButton}
									fullWidth
									variant="classic"
									color="success"
									label={confirmText}
									onClick={onConfirm}
								/>
							</div>
						)}
					</div>
				</div>
			</CSSTransition>
			<Backdrop
				show={isOpen}
				zIndex={599}
				onClick={!loading ? onClose : undefined}
			/>
		</>
	);
};
