import React, { FunctionComponent, ReactNode } from 'react';

import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';
import { RoundButton } from 'components/UI/Button';
import { Separator } from 'components/UI/Separator/Separator';
import { Text } from 'components/Styled/text';

import styles from './DataTable.module.css';

export type DataTableProps = {
	items: any[],
	totalPage: number,
	separator?: boolean,
	currentPage: number,
	onNextClick: () => void | Promise<void>,
	onPreviousClick: () => void | Promise<void>,
	renderRow: (item: any, key: string) => ReactNode,
	renderSeparator?: () => ReactNode,
	generateRowKey: (item: any) => string,
}

export const DataTable: FunctionComponent<DataTableProps> = ({
	separator = false,
	items,
	totalPage,
	currentPage,
	renderRow,
	onNextClick,
	generateRowKey,
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
				{items.map((item, index) => {
					if (index !== items.length - 1 && separator) {
						return (
							<>
								{renderRow(item, generateRowKey(item))}
								<Separator
									size="big"
									centerHorizontal
									orientation="horizontal"
								/>
							</>
						)
					}

					return renderRow(item, generateRowKey(item))
				})}
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
