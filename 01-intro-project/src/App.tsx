import Header from './components/Header/Header';
import { CORE_CONCEPTS } from './data';
import CoreConceptsList from './components/CoreConceptsList';
import Examples from './components/Examples';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core concepts</h2>
          <CoreConceptsList coreConceptList={CORE_CONCEPTS} />
        </section>
        <Examples />
      </main>
    </>
  );
}