import React from 'react';
import Select, {
  Options,
  StylesConfig,
  GroupBase,
  SingleValue,
} from 'react-select';
import { ReactComponent as ArrowUpIcon } from './icons/up.svg';
import './style.scss';

interface Option {
  value: number;
  label: string;
}

function DropdownIndicator() {
  return <ArrowUpIcon />;
}

const rangeOptions: Options<Option> = [
  { value: 3650, label: 'All' },
  { value: 7, label: '1 Week' },
  { value: 90, label: '3 Month' },
  { value: 365, label: '1 Year' },
];

const activeBackgroundColor =
  'linear-gradient(152deg, rgba(211,94,220,1) -80%, rgba(211,94,220,0.3) 80%)';
const menuBackgroundColor =
  'linear-gradient(152deg, rgba(211,94,220,1) -80%, rgba(29,34,35,0.9) 80%)';

const selectorStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (props) => ({
    ...props,
    background: 'transparent',
    borderRadius: '30px',
    padding: '15px 20px',
    border: 'none',
    cursor: 'pointer',
    minHeight: '62px',
    boxShadow: 'none',
    ':hover': {
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  singleValue: (props) => ({
    ...props,
    color: 'inherit',
  }),
  indicatorsContainer: (props) => ({
    ...props,
    padding: 0,
  }),
  option: (props, state) => ({
    ...props,
    cursor: 'pointer',
    background:
      state.isFocused || state.isSelected
        ? activeBackgroundColor
        : 'transparent',
    opacity: state.isSelected ? 0.5 : 1,
  }),
  menu: (props) => ({
    ...props,
    padding: 0,
    color: 'inherit',
    borderRadius: '10px',
    overflow: 'hidden',
    background: menuBackgroundColor,
  }),
  menuList: (props) => ({
    ...props,
    padding: 0,
  }),
};

type Props = { onChange: (option: SingleValue<Option>) => void };

function Selector({ onChange }: Props) {
  return (
    <div className="selector-wrap">
      <Select
        defaultValue={rangeOptions[0]}
        options={rangeOptions}
        styles={selectorStyles}
        onChange={(newValue) => onChange(newValue)}
        components={{ DropdownIndicator }}
        isSearchable={false}
      />
    </div>
  );
}

export default Selector;
