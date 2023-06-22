import { useCallback } from 'react';

import { GAEvent } from 'lib/analytics/ga';

import { layersAtom } from 'store/explore-map';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Dataset } from 'types/datasets';

import { useDownloadData } from 'hooks/data';

import { INFO } from 'containers/datasets';

import Icon from 'components/icon';
import { Dialog, DialogContent, DialogTrigger } from 'components/ui/dialog';
import Switch from 'components/ui/switch';
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import DOWNLOAD_SVG from 'svgs/ui/download.svg?sprite';
import INFO_SVG from 'svgs/ui/info.svg?sprite';

export interface WidgetHeaderProps {
  title: string;
  dataset: Dataset;
}

const WidgetHeader = ({ title, dataset }: WidgetHeaderProps) => {
  const { id, widget } = dataset;

  const layers = useRecoilValue(layersAtom);
  const setLayers = useSetRecoilState(layersAtom);

  const downloadMutation = useDownloadData();

  const InfoComponent = INFO[id];

  const handleToggleLayer = useCallback(() => {
    const lys = [...layers];

    // push or slice layer in lys array base on index
    const index = lys.findIndex((ly) => ly === id);
    if (index === -1) {
      lys.unshift(id);

      GAEvent({
        action: 'select_layer',
        params: {
          id,
          value: title,
          from: 'content',
        },
      });
    } else {
      lys.splice(index, 1);
    }

    setLayers(lys);
  }, [id, title, layers, setLayers]);

  const handleDownload = useCallback(() => {
    downloadMutation.mutate(dataset.id, {
      onSuccess: (data) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${dataset.label}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      onError: (error) => console.error(error),
    });
  }, [dataset, downloadMutation]);

  return (
    <header className="flex items-center justify-between space-x-5">
      <h3 className="font-display text-2xl">{title}</h3>

      <div className="flex items-center">
        {widget.toolbar.info && (
          <Dialog>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-navy-500 transition-all hover:bg-navy-200"
                    aria-label="More info"
                  >
                    <Icon icon={INFO_SVG} className="h-6 w-6" />
                  </button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipPortal>
                <TooltipContent
                  side="top"
                  align="center"
                  className="rounded-none border-navy-500 bg-navy-500"
                >
                  <div className="text-xxs text-white">More info</div>

                  <TooltipArrow className="fill-navy-500" width={10} height={5} />
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>

            <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <InfoComponent {...dataset} />
            </DialogContent>
          </Dialog>
        )}

        {widget.toolbar.download && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-navy-500 transition-all hover:bg-navy-200"
                aria-label="Download data"
                onClick={handleDownload}
              >
                <Icon icon={DOWNLOAD_SVG} className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                side="top"
                align="center"
                className="rounded-none border-navy-500 bg-navy-500"
              >
                <div className="text-xxs text-white">Download data</div>

                <TooltipArrow className="fill-navy-500" width={10} height={5} />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        )}

        {widget.toolbar.layer && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-1 flex h-7 items-center justify-center">
                <Switch
                  aria-label="Switch layer"
                  checked={layers.includes(id)}
                  onCheckedChange={handleToggleLayer}
                />
              </div>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                side="top"
                align="center"
                className="rounded-none border-navy-500 bg-navy-500"
              >
                <div className="text-xxs text-white">
                  {layers.includes(id) ? 'Remove from map' : 'Add to map'}
                </div>

                <TooltipArrow className="fill-navy-500" width={10} height={5} />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        )}
      </div>
    </header>
  );
};

export default WidgetHeader;
