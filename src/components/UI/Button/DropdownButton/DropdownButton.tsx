import React, { FunctionComponent, useRef, useState, useLayoutEffect, useMemo } from 'react';
import styles from './DropdownButton.module.css';

import Separator from 'components/UI/Separator/Separator';
import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';

import useEventListener from 'hooks/useEventListener';
import { CSSProperties } from 'styled-components';

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
	const [showDropdown, setShowDropdown] = useState<boolean>(false);
	const [buttonRendered, setButtonRendered] = useState(false);
	const [dropDownWidth, setDropDownWidth] = useState(0);

	const mainButtonRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dropdownMenuRef = useRef<HTMLDivElement>(null);

	const toggleDropdownMenu = () => {
		setShowDropdown(prevShow => !prevShow);
	}

	const makeClickHandler = (value: any) => () => {
		onClick(value);
		toggleDropdownMenu();
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (!dropdownRef.current || !showDropdown) {
			return;
		}
	
		const outsideDropdown = !dropdownRef.current.contains(event.target as Node);

		if (outsideDropdown) {
			toggleDropdownMenu();
		}
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
			top: mainButtonRef.current ? mainButtonRef.current.scrollHeight : 0,
			left: 0,
		};
	}, [showDropdown]);

	const dropdownBackgroundStyle = useMemo((): CSSProperties => {
		if (!buttonRendered || !mainButtonRef.current || !dropdownMenuRef.current) {
			return {};
		}

		const buttonHeight = mainButtonRef.current.scrollHeight;
		const buttonWidth = mainButtonRef.current.scrollWidth;
		const dropDownHeight = dropdownMenuRef.current.scrollHeight;

		console.log({
			scrollWidth: mainButtonRef.current.scrollWidth,
			offsetWidth: mainButtonRef.current.offsetWidth,
			clientWidth: mainButtonRef.current.clientWidth,
		})

		return {
			transition: `height ${dropDuration}ms`,
			width: dropDownWidth || buttonWidth,
			height: showDropdown
				? buttonHeight + dropDownHeight
				: buttonHeight,
		};
	}, [showDropdown, dropDuration, buttonRendered, dropDownWidth]);

	useEventListener('mousedown', handleClickOutside);
	useEventListener('resize', handleResize);

	useLayoutEffect(() => {
		setButtonRendered(true);
	}, []);

	const emptyOptions = options.length === 0

	return (
		<div
			ref={dropdownRef}
			className={containerClassName}
		>
			<button
				ref={mainButtonRef}
				className={styles.button}
				onClick={toggleDropdownMenu}
			>
				{label}
			</button>
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
						<Separator size="big" />
						{options.map((option: DropdownButtonOption) => {
							return (
								<button
									onClick={makeClickHandler(option.value)}
									className={styles.dropdownButton}
								>
									{option.label}
								</button> 
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
		</div>
	);
};
