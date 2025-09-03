import { ElementType,ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  buttons?: ReactNode;
  buttonsContainer: ElementType;
}

export default function Tabs(props: Props): ReactElement {
  const { children, buttons, buttonsContainer = 'menu' } = props;

  const ButtonsContainer = buttonsContainer; // Esto es para hacer dinámico el wrapper del componente. Así le puedes pasar un "menu", un "nav", y hasta un componente custom usando {TuComponente}

  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
