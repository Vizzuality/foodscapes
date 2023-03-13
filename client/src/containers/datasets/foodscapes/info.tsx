import { Dataset } from 'types/datasets';

const FoodscapesInfo = ({ label }: Dataset) => {
  return (
    <div className="prose-sm">
      <h3>{label}</h3>
      <p>
        A foodscape is a terrestrial or aquatic food production area defined by a series of distinct
        biophysical attributes and management patterns, which can be mapped. They cover all parts of
        the globe where food is produced.
      </p>
      <p>
        <em>
          Copyright © 2021 The Nature Conservancy; International Institute for Applied Systems
          Analysis; SYSTEMIQ
        </em>
      </p>
    </div>
  );
};

export default FoodscapesInfo;
