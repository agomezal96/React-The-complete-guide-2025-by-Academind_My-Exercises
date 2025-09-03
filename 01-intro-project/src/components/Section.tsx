import { ReactNode } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'section'> {
  title?: string;
  children: ReactNode;
}

export default function Section(props: Props) {
  const { title, children, ...rest } = props;

  return (
    <section {...rest}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
