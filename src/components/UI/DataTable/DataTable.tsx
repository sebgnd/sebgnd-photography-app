import React, { FunctionComponent, ReactNode } from 'react';

import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';
import { RoundButton } from 'components/UI/Button';
import { Text } from 'components/Styled/text';

import styles from './DataTable.module.css';

export type DataTableItem = {
	id: string;
	data: any,
}

export type DataTableProps = {
	items: DataTableItem[],
	totalPage: number,
	currentPage: number,
	onNextClick: () => void | Promise<void>,
	onPreviousClick: () => void | Promise<void>,
	renderRow: (item: DataTableItem) => ReactNode,
}

export const DataTable: FunctionComponent<DataTableProps> = ({
	items,
	totalPage,
	currentPage,
	renderRow,
	onNextClick,
	onPreviousClick,
}) => {
	const isEmpty = items.length === 0;
	const pageIndication = `${currentPage}/${totalPage}`;

	return (
		<div className={styles.dataTableContainer}>
			<div className={styles.dataTableHeader}>
				<div className={styles.arrowsContainer}>
					<div className={styles.arrowButtonContainer}>
						<RoundButton
							size="small"
							icon="arrow-left"
							onClick={onPreviousClick}
						/>
					</div>
					<div className={styles.arrowButtonContainer}>
						<RoundButton
							size="small"
							icon="arrow-right"
							onClick={onNextClick}
						/>
					</div>
				</div>
				<Text weight="normal" size="small" color="#9C9C9C">{pageIndication}</Text>
			</div>
			<div className={styles.listContainer}>
				{items.map((item) => renderRow(item))}
				{isEmpty && (
					<div className={styles.noItemsContainer}>
						<InformationMessage
							centerVertical
							centerHorizontal
							insideContainer
							messageType="information"
							message="Nothing here !"
						/>
					</div>
				)}
			</div>
		</div>
	)
}
