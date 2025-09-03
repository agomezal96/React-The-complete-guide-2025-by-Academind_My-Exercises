import { ReactNode } from 'react';

interface Props
  extends React.ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  isSelected: boolean;
}

export default function TabButton(props: Props) {
  const { children, isSelected, ...rest } = props;

  return (
    <li>
      <button className={isSelected ? 'active' : ''} {...rest}>
        {children}
      </button>
    </li>
  );
}
