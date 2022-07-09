import { FunctionComponent, useRef, useState, useId, useMemo, CSSProperties } from 'react';

import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';
import { ButtonContainer } from 'components/UI/Button';
import { Text } from 'components/UI/Content/Text/Text';

import { ClickOutside } from 'hoc/ClickOutside/ClickOutside';

import { useEventListener } from 'hooks';

import styles from './DropdownButton.module.scss';

export interface DropdownButtonOption {
	value: any;
	label: string;
}

interface DropdownButtonProps {
	label: string;
	options: DropdownButtonOption[];
	onClick: (value: any) => void;
	fullWidth?: boolean;
	dropDuration?: number,
}

export const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
	label,
	options, 
	onClick,
	fullWidth = false,
	dropDuration = 250,
}) => {
	const componentId = useId();

	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [buttonRendered, setButtonRendered] = useState(false);
	const [dropDownWidth, setDropDownWidth] = useState(0);

	const mainButtonRef = useRef<HTMLButtonElement>(null);
	const dropdownMenuRef = useRef<HTMLDivElement>(null);

	const toggleDropdownMenu = () => {
		const buttonRenderedTimeout = buttonRendered ? dropDuration : 0;
		setTimeout(() => {
			setButtonRendered((prev) => !prev);
		}, buttonRenderedTimeout);
		setShowDropdown(prevShow => !prevShow);
	}

	const makeClickHandler = (value: any) => () => {
		onClick(value);
		toggleDropdownMenu();
	}

	const handleClickOutside = () => {
		if (!showDropdown) {
			return;
		}
	
		toggleDropdownMenu();
	}

	const handleResize = () => {
		if (!mainButtonRef.current) {
			return;
		}

		setDropDownWidth(mainButtonRef.current.scrollWidth);
	};

	const containerClassName = useMemo(() => {
		const classes = [
			styles.dropdown,
			fullWidth ? styles.fullWidth : '',
		];

		return classes.join(' ');
	}, [fullWidth]);

	const dropDownStyle = useMemo((): CSSProperties => {
		return {
			transition: `max-height ${dropDuration}ms`,
			maxHeight: !showDropdown ? 0 : dropdownMenuRef.current?.scrollHeight,
			visibility: buttonRendered ? 'visible' : 'hidden',
			top: mainButtonRef.current ? mainButtonRef.current.scrollHeight : 0,
			left: 0,
		};
	}, [showDropdown, buttonRendered, dropDuration]);

	const dropdownBackgroundStyle = useMemo((): CSSProperties => {
		if (!mainButtonRef.current || !dropdownMenuRef.current) {
			return {};
		}

		const buttonWidth = mainButtonRef.current.scrollWidth;
		const dropDownHeight = dropdownMenuRef.current.scrollHeight;

		return {
			transition: `height ${dropDuration}ms, top ${dropDuration}ms`,
			width: dropDownWidth || buttonWidth,
			visibility: buttonRendered ? 'visible' : 'hidden',
			height: showDropdown && buttonRendered
				? dropDownHeight
				: 0,
		};
	}, [showDropdown, dropDuration, buttonRendered, dropDownWidth]);

	useEventListener('resize', handleResize);

	const emptyOptions = options.length === 0

	return (
		<ClickOutside
			containerClassName={containerClassName}
			onClickOutside={handleClickOutside}
		>
			<ButtonContainer
				ref={mainButtonRef}
				type="regular"
				variant="classic"
				color="default"
				className={styles.button}
				onClick={toggleDropdownMenu}
			>
				<Text text={label} />
			</ButtonContainer>
			<div
				className={styles.dropdownBackground}
				style={dropdownBackgroundStyle}
			/>
			<div 
				ref={dropdownMenuRef} 
				className={styles.dropdownMenu}
				style={dropDownStyle}
			>
				{(!emptyOptions) ? (
					<>
						{options.map(({ label, value }: DropdownButtonOption, index) => {
							return (
								<ButtonContainer
									key={`DropdownButton-${componentId}-${value}`}
									color="default"
									variant="classic"
									type="regular"
									onClick={makeClickHandler(value)}
									className={styles.dropdownButton}
									style={{
										border: 'none',
									}}
								>
									<Text text={label} />
								</ButtonContainer> 
							);
						})}
					</>
				) : (
					<InformationMessage
						noIcon
						messageType="information"
						size="small"
						message="No option."
					/>
				)}
			</div>
		</ClickOutside>
	);
};
