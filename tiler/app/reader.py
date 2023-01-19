import os
import pathlib
from typing import Type, Dict

import attr
from morecantile import TileMatrixSet
from rio_tiler.constants import WEB_MERCATOR_TMS
from rio_tiler.io import MultiBandReader, BaseReader, COGReader


class FolderReader(MultiBandReader):
    input: str = attr.ib()
    prefix: str = attr.ib()  # we add a custom attribute

    # because we add another attribute (prefix) we need to
    # re-specify the other attribute for the class
    reader: Type[BaseReader] = attr.ib(default=COGReader)
    reader_options: Dict = attr.ib(factory=dict)
    tms: TileMatrixSet = attr.ib(default=WEB_MERCATOR_TMS)

    # we place min/max zoom in __init__
    minzoom: int = attr.ib(default=None)
    maxzoom: int = attr.ib(default=None)

    def __attrs_post_init__(self):
        """Parse Sceneid and get grid bounds."""
        self.bands = sorted(
            [p.stem.split("_")[1] for p in pathlib.Path(self.input).glob(f"*{self.prefix}*.tif")]
        )
        with self.reader(self._get_band_url(self.bands[0])) as cog:
            self.bounds = cog.bounds
            self.crs = cog.crs

            if self.minzoom is None:
                self.minzoom = cog.minzoom

            if self.maxzoom is None:
                self.maxzoom = cog.maxzoom

    def _get_band_url(self, band: str) -> str:
        """Validate band's name and return band's url."""
        return os.path.join(self.input, f"{self.prefix}{band}.tif")
