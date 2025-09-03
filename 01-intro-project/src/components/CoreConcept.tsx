import coreConcept from '../types/types';

interface Props {
  coreConcept: coreConcept;
}

export default function CoreConcept(props: Props) {
  const { coreConcept } = props;
  return (
    <>
      <li>
        <img src={coreConcept.image} alt={coreConcept.title}></img>
        <h3>{coreConcept.title}</h3>
        <p>{coreConcept.description}</p>
      </li>
    </>
  );
}
