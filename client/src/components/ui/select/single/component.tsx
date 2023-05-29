import { FC, useEffect, useMemo, useState } from 'react';

import cx from 'classnames';

import { Float } from '@headlessui-float/react';
import { Listbox } from '@headlessui/react';

import Icon from 'components/icon';
import Loading from 'components/loading';
import THEME from 'components/ui/select/constants/theme';

import CHEVRON_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';
import CHEVRON_UP_SVG from 'svgs/ui/arrow-up.svg?sprite';
import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import type { SingleSelectProps } from './types';

export const Select: FC<SingleSelectProps> = (props: SingleSelectProps) => {
  const {
    disabled = false,
    options,
    placeholder = 'Select...',
    size = 'base',
    theme = 'dark',
    state = 'none',
    value,
    clearable,
    clearSelectionLabel = 'Clear',
    loading,
    onChange,
  } = props;

  const initialValue = value || null;

  const [selected, setSelected] = useState(initialValue);

  const SELECTED = useMemo(() => {
    if (loading) return 'Loading...';

    if (selected) {
      const option = options.find((o) => o.value === selected);
      return option?.label;
    }

    return placeholder;
  }, [options, selected, placeholder, loading]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (v) => {
    setSelected(v);

    if (onChange) {
      onChange(v);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setSelected(null);

    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div
      className={cx({
        'w-full': true,
        [THEME[theme].container]: true,
      })}
    >
      <Listbox
        as="div"
        className="space-y-1"
        disabled={disabled}
        value={selected}
        onChange={handleSelect}
      >
        {({ open }) => (
          <>
            <Float
              key={open ? 'open' : 'closed'}
              adaptiveWidth
              placement="bottom-start"
              portal
              flip
              enter="transition duration-200 ease-out"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition duration-150 ease-in"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Listbox.Button
                className={cx({
                  [THEME.sizes[size]]: true,
                  [THEME[theme].button.base]: true,
                  [THEME[theme].button.states.disabled]: disabled,
                  [THEME[theme].button.states.valid]: state === 'valid',
                  [THEME[theme].button.states.error]: state === 'error',
                })}
              >
                <span className="block truncate">{SELECTED}</span>
                <span className="pointer-events-none relative inset-y-0.5 flex items-center space-x-2">
                  <Loading
                    visible={loading}
                    className={THEME[theme].loading}
                    iconClassName="w-3 h-3"
                  />

                  {!!selected && !loading && clearable && (
                    <button type="button" className="pointer-events-auto" onClick={handleReset}>
                      <Icon
                        icon={CLOSE_SVG}
                        className={cx({
                          'h-3.5 w-3.5': true,
                        })}
                      />
                    </button>
                  )}

                  {!loading && (
                    <Icon
                      icon={open ? CHEVRON_UP_SVG : CHEVRON_DOWN_SVG}
                      className={cx({
                        'h-3 w-3': true,
                      })}
                    />
                  )}
                </span>
              </Listbox.Button>

              <Listbox.Options
                static
                className={cx({
                  'max-h-60 overflow-y-auto text-base leading-6 focus:outline-none': true,
                  [THEME[theme].menu]: true,
                })}
              >
                <div className="flex px-5 text-sm">
                  {clearable && (
                    <Listbox.Option key={null} value={null}>
                      <button type="button" className="py-2 text-left underline">
                        {clearSelectionLabel}
                      </button>
                    </Listbox.Option>
                  )}
                </div>

                {options.map((opt) => {
                  return (
                    <Listbox.Option key={opt.value} value={opt.value}>
                      {({ active: a, selected: s, disabled: d }) => (
                        <div
                          className={cx({
                            'flex cursor-pointer select-none space-x-2 py-2 pl-5 pr-4': true,
                            [THEME[theme].item.base]: true,
                            [THEME[theme].item.active]: a,
                            [THEME[theme].item.selected]: s,
                            [THEME[theme].item.disabled]: d,
                          })}
                        >
                          <span
                            className={cx({
                              'block font-semibold line-clamp-2': true,
                            })}
                          >
                            {opt.label}
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Float>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
