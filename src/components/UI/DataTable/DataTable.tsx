import { FunctionComponent, ReactNode, Fragment, useId } from 'react';

import { InformationMessage } from 'components/UI/InformationMessage/InformationMessage';
import { IconButton } from 'components/UI/Button';
import { Separator } from 'components/UI/Separator/Separator';
import { Spinner } from 'components/UI/Spinner/Spinner';

import { Centered } from 'hoc/Centered/Centered';

import styles from './DataTable.module.scss';

export type DataTableProps = {
  items: any[],
  error?: boolean,
  loading?: boolean,
  separator?: boolean,
  dynamicContent?: boolean,
  disableNextButton?: boolean,
  disablePreviousButton?: boolean,
  onNextClick?: () => void | Promise<void>,
  onPreviousClick?: () => void | Promise<void>,
  renderRow: (item: any, key: string) => ReactNode,
  generateRowKey: (item: any) => string,
}

export const DataTable: FunctionComponent<DataTableProps> = ({
  items,
  error = false,
  loading = false,
  separator = false,
  dynamicContent = true,
  disableNextButton = false,
  disablePreviousButton = false,
  renderRow,
  generateRowKey,
  onNextClick = () => {},
  onPreviousClick = () => {},
}) => {
  const dataTableComponentId = useId();
  const isEmpty = items.length === 0;

  return (
    <div className={styles.dataTableContainer}>
      <div className={styles.dataTableHeader}>
        {dynamicContent && (
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
        )}
      </div>
      <div className={styles.listContainer}>
        {items.map((item, index) => {
          if (index !== items.length - 1 && separator) {
            return (
              <Fragment key={`DataTable-${dataTableComponentId}-${index}`}>
                {renderRow(item, generateRowKey(item))}
                <Centered centerHorizontal>
                  <Separator
                    size="big"
                    orientation="horizontal"
                  />
                </Centered>
              </Fragment>
            );
          }

          return renderRow(item, generateRowKey(item));
        })}
        {(isEmpty && !loading) && (
          <div className={styles.noItemsContainer}>
            <Centered centerHorizontal centerVertical insideContainer>
              <InformationMessage
                messageType={error ? 'error' : 'information'}
                message={error ? 'Something happened. Try again later.' : 'Nothing here !'}
              />
            </Centered>
          </div>
        )}
        {(loading) && (
          <div className={styles.noItemsContainer}>
            <Centered centerHorizontal centerVertical insideContainer>
              <Spinner />
            </Centered>
          </div>
        )}
      </div>
    </div>
  );
};
