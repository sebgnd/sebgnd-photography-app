import type { FunctionComponent, ReactNode } from 'react';

export type LayoutContainerProps = {
  headerSize: number,
  footerSize: number,
  children: ReactNode,
  allowImmersiveHeader?: boolean,
}

export const LayoutContainer: FunctionComponent<LayoutContainerProps> = ({
  children,
  headerSize,
  footerSize,
  allowImmersiveHeader = false,
}) => {
  return (
    <div
      style={{
        paddingTop: allowImmersiveHeader ? 0 : headerSize,
        paddingBottom: footerSize,
      }}
    >
      {children}
    </div>
  );
};
