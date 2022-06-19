import React, { FunctionComponent, MouseEvent, useCallback, useState } from 'react';

import { Icon } from 'components/UI/Content/Icon/Icon';
import { Text } from 'components/UI/Content/Text/Text';
import { ButtonContainer, ButtonVariant, ButtonColor } from 'components/UI/Button';

import { ClickOutside } from 'hoc/ClickOutside/ClickOutside';

import styles from './IconButton.module.scss';
import { WipeAnimation } from 'hoc/WipeAnimation/WipeAnimation';

export type IconButtonProps = {
	onClick: (event: MouseEvent) => void;
	variant: ButtonVariant,
	color: ButtonColor,
	icon: string;
	disabled?: boolean;
	confirmationText?: string,
}

export const IconButton: FunctionComponent<IconButtonProps> = ({ 
	onClick, 
	icon, 
	disabled = false,
	confirmationText,
	variant,
	color, 
}) => {
	const [confirmationVisible, setConfirmationVisible] = useState(false);

	const handleClick = useCallback((event: MouseEvent) => {
		if (confirmationText) {
			setConfirmationVisible(true);
		}

		if (!confirmationText || confirmationVisible) {
			onClick(event);
		}
	}, [confirmationVisible, confirmationText, onClick]);

	const handleClickOutside = useCallback(() => {
		setConfirmationVisible(false);
	}, []);

	return (
		<ButtonContainer
			type="round"
			disabled={disabled}
			variant={variant}
			color={color}
			onClick={handleClick}
		>
			<ClickOutside
				containerClassName={styles.contentContainer}
				onClickOutside={handleClickOutside}
			>
				<div className={styles.content}>
					<Icon name={icon} />
					{confirmationText && (
						<WipeAnimation visible={confirmationVisible}>
							<Text
								wrap={false}
								className={styles.confirmationText}
								text={confirmationText}
								bold
								size="small"
							/>
						</WipeAnimation>
					)}
				</div>
			</ClickOutside>
		</ButtonContainer>
	);
};

