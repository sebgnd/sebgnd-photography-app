import React, { FunctionComponent, ReactNode, Fragment, useId } from 'react';

import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';
import { IconButton } from 'components/UI/Button';
import { Separator } from 'components/UI/Separator/Separator';

import styles from './DataTable.module.scss';
import { Spinner } from '../Spinner/Spinner';

export type DataTableProps = {
	items: any[],
	error?: boolean,
	loading?: boolean,
	separator?: boolean,
	disableNextButton?: boolean,
	disablePreviousButton?: boolean,
	onNextClick: () => void | Promise<void>,
	onPreviousClick: () => void | Promise<void>,
	renderRow: (item: any, key: string) => ReactNode,
	renderSeparator?: () => ReactNode,
	generateRowKey: (item: any) => string,
}

export const DataTable: FunctionComponent<DataTableProps> = ({
	items,
	error = false,
	loading = false,
	separator = false,
	disableNextButton = false,
	disablePreviousButton = false,
	renderRow,
	onNextClick,
	generateRowKey,
	onPreviousClick,
}) => {
	const dataTableComponentId = useId();
	const isEmpty = items.length === 0;

	return (
		<div className={styles.dataTableContainer}>
			<div className={styles.dataTableHeader}>
				<div className={styles.arrowsContainer}>
					<IconButton
						variant="classic"
						color="default"
						icon="arrow-left"
						onClick={onPreviousClick}
						disabled={disablePreviousButton}
					/>
					<IconButton
						variant="classic"
						color="default"
						icon="arrow-right"
						onClick={onNextClick}
						disabled={disableNextButton}
					/>
				</div>
			</div>
			<div className={styles.listContainer}>
				{items.map((item, index) => {
					if (index !== items.length - 1 && separator) {
						return (
							<Fragment key={`DataTable-${dataTableComponentId}-${index}`}>
								{renderRow(item, generateRowKey(item))}
								<Separator
									size="big"
									centerHorizontal
									orientation="horizontal"
								/>
							</Fragment>
						)
					}

					return renderRow(item, generateRowKey(item))
				})}
				{(isEmpty && !loading) && (
					<div className={styles.noItemsContainer}>
						<InformationMessage
							centerVertical
							centerHorizontal
							insideContainer
							messageType={error ? 'error' : 'information'}
							message={error ? "Something happened. Try again later." : 'Nothing here !'}
						/>
					</div>
				)}
				{(loading) && (
					<div className={styles.noItemsContainer}>
						<Spinner
							centerHorizontal
							centerVertical
							insideContainer
						/>
					</div>
				)}
			</div>
		</div>
	)
}
