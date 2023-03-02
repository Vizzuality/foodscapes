import { Dataset } from 'types/datasets';

const FoodscapesInfo = ({ label }: Dataset) => {
  return (
    <div className="">
      <h3 className="text-lg font-semibold text-navy-500">{label}</h3>
      <p className="mt-2 text-sm text-navy-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat praesentium, quam quo nisi
        vel impedit! Molestias obcaecati voluptatibus placeat dolores dolorum molestiae. A
        consequuntur nisi qui quasi odio ut. Sapiente!
      </p>
    </div>
  );
};

export default FoodscapesInfo;
