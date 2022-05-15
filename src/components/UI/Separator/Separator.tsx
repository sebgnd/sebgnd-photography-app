import React, { FunctionComponent } from 'react';
import style from './Separator.module.css';

interface SeparatorProp {
    size: 'small' | 'medium' | 'big' | 'tiny';
    orientation?: 'vertical' | 'horizontal';
}

const classes: any = {
	horizontal: {
		tiny: 'tinyWidth',
		small: 'smallWidth',
		medium: 'mediumWidth',
		big: 'bigWidth'
	},
	vertical: {
		tiny: 'tinyHeight',
		small: 'smallHeight',
		medium: 'mediumHeight',
		big: 'bigHeight'
	}
}

const Separator: FunctionComponent<SeparatorProp> = ({ size, orientation = 'horizontal' }) => {
	const separatorClasses = [style.separator];
	const styleClass = classes[orientation][size];

	separatorClasses.push(style[styleClass]);

	return (
		<div className={separatorClasses.join(' ')} />
	);
};

export default Separator;