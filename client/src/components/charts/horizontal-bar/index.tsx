import { ScaleLinear, ScaleOrdinal } from 'd3-scale';
import { motion } from 'framer-motion';

type DataProps = {
  id: number;
  value: number;
  label: string;
};

interface HorizontalBarProps<D extends DataProps> {
  data: D[];
  xScale: ScaleLinear<number, number, never>;
  colorScale: ScaleOrdinal<string, string, never>;
  selected?: readonly number[];
  onBarClick?: (bar: D) => void;
}

const HorizontalBar = <D extends DataProps>({
  data,
  xScale,
  colorScale,
  onBarClick,
}: HorizontalBarProps<D>) => {
  const { format } = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    maximumSignificantDigits: 3,
  });

  return (
    <div className="relative">
      <ul className="space-y-2.5">
        {data.map((d, i) => {
          const { id, label, value } = d;
          return (
            <li key={label + i}>
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${xScale(value)}%`,
                }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center space-x-1 overflow-hidden"
              >
                <div
                  className="h-2 w-full border border-navy-500"
                  style={{ background: colorScale(id.toString()) }}
                  onClick={() => onBarClick(d)}
                />

                <motion.div
                  className="shrink whitespace-nowrap text-[8px] font-bold text-navy-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * i + 0.25 }}
                >
                  {format(value)}M Ha
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="text-sm font-light text-navy-500"
              >
                {label}
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HorizontalBar;
