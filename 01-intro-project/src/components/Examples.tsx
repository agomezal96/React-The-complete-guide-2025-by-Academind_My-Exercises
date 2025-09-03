import { useState } from 'react';
import Section from './Section';
import TabButton from './TabButton';
import { CoreConceptType } from '../types/types';
import { EXAMPLES } from '../data';
import Tabs from './Tabs';

export default function Examples() {
  let tabContent = 'Please click a button';

  const [selectedTopic, setSelectedTopic] = useState<CoreConceptType | null>(
    null
  );

  function handleSelect(selectedButton: CoreConceptType) {
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }
  return (
    <Section id="examples" title="Examples">
      <Tabs buttonsContainer="menu"
        buttons={
          <>
            <TabButton
              onClick={() => handleSelect('components')}
              isSelected={selectedTopic === 'components'}
            >
              Component
            </TabButton>
            <TabButton
              onClick={() => handleSelect('jsx')}
              isSelected={selectedTopic === 'jsx'}
            >
              JSX
            </TabButton>
            <TabButton
              onClick={() => handleSelect('props')}
              isSelected={selectedTopic === 'props'}
            >
              Props
            </TabButton>
            <TabButton
              onClick={() => handleSelect('state')}
              isSelected={selectedTopic === 'state'}
            >
              State
            </TabButton>
          </>
        }
      >
        {!selectedTopic ? (
          <p>Please select a topic.</p>
        ) : (
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
          </div>
        )}
      </Tabs>
    </Section>
  );
}
