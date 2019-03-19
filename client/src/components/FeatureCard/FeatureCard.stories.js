import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs'

import FeatureCard from './FeatureCard'
import { mdiDomain } from '@mdi/js'

const CenterDecorator = storyFn => (
  <div className="container center">
    <div className="row">
      <div className="col s12 l6 push-l3">{storyFn()}</div>
    </div>
  </div>
)

storiesOf('Feature Card', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FeatureCard
      icon={mdiDomain}
      title={object('title', 'Azienda')}
      content={object(
        'content',
        'Educabile vede questo ambito non solo come area commerciale ma anche come luogo di ricerca e di sviluppo tecnico-scientifico. I servizi di consulenza e progettazione offerti diventano opportunità di scambio osmotico di esperienze produttive e ricerca di soluzioni innovative nel campo dei processi di sviluppo industriale...'
      )}
    />
  ))
