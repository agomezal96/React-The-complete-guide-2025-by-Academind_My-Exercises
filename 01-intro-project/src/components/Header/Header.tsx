
import reactImg from '../../assets/react-core-concepts.png' 
import './Header.css';

function genRandomInt(max:number) {
  return Math.floor(Math.random() * (max + 1));
}
export default function Header() {
  const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

  return (
    <header>
      <img src={reactImg} alt="Styled atom"></img>
      <h1>React Essentials</h1>
      <p>
        {reactDescriptions[genRandomInt(2)]} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>)
}
