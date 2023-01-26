export const LAYERS = [
  {
    id: 'empty',
    title: 'Think of it in layers.',
    // Content
    content: (
      <p>
        Food production is defined by a region’s environmental conditions, farming practices, market
        forces, distribution challenges, public policies and local communities and cultures. This
        context can be clustered into three main layers.
      </p>
    ),
    backgroundColor: 'bg-white',
    imageUrl: '/images/layers/empty.png',
  },
  {
    id: 'physical',
    title: 'Physical geography',
    content: (
      <>
        <p>
          Distinct geographic features are the foundation of food production. This includes the soil
          makeup, climate, topography, land cover, freshwater access or the qualities of a seabed.
        </p>
        <p className="font-semibold">
          Soy favors midsummer mean temperatures of 24ºC to 25ºC (75ºF to 77ºF). It is often
          produced in the plains with deep fertile soils called Mollisols, or on tropical soils in
          South America.
        </p>
      </>
    ),
    backgroundColor: 'bg-green-500',
    imageUrl: '/images/layers/physical.png',
  },
  {
    id: 'management',
    title: 'Management patterns',
    content: (
      <>
        <p>
          This layer encompasses the practices producers use to grow food, such as irrigation
          techniques, tillage or the level of nutrient inputs.
        </p>
        <p className="font-semibold">
          Almost all soy is rainfed, and a large majority is produced in high-intensity systems,
          where field size is large and agricultural inputs are high. Over the last 30 years, global
          demand for soy (and beef) has driven the conversion of millions of acres of native habitat
          and forests.
        </p>
      </>
    ),
    backgroundColor: 'bg-red-500',
    imageUrl: '/images/layers/management.png',
  },
  {
    id: 'socio',
    title: 'Socioeconomic influences',
    content: (
      <>
        <p>
          This layer zooms out to contextualize the foodscape by including market forces,
          distribution challenges, public policies and local communities and cultures.
        </p>
        <p className="font-semibold">
          More than three-quarters of global soy is fed to livestock for meat and dairy production.
          Most of the rest is used for biofuels, industry or vegetable oils. Just 7% of soy is used
          directly for human food products such as tofu, soy milk, edamame beans and tempeh.
        </p>
        <p className="italic">Source: Soy - Our World in Data.</p>
      </>
    ),
    backgroundColor: 'bg-yellow-500',
    imageUrl: '/images/layers/socio.png',
  },
];
