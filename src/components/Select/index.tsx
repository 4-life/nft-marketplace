import Select, {
  Options,
  StylesConfig,
  GroupBase,
  SingleValue,
  CSSObjectWithLabel,
} from 'react-select';
import ArrowUpIcon from './icons/up.svg?react';
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
  { value: 30, label: '1 Month' },
  { value: 90, label: '3 Months' },
];

const activeBackgroundColor =
  'linear-gradient(152deg, rgba(211,94,220,1) -80%, rgba(211,94,220,0.3) 80%)';
const menuBackgroundColor =
  'linear-gradient(152deg, rgba(211,94,220,1) -80%, rgba(29,34,35,0.9) 80%)';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const css = (obj: any): CSSObjectWithLabel =>
  obj as unknown as CSSObjectWithLabel;

const selectorStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (props) =>
    css({
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
  indicatorSeparator: () => css({ display: 'none' }),
  dropdownIndicator: () => css({ display: 'none' }),
  singleValue: (props) => css({ ...props, color: 'inherit' }),
  indicatorsContainer: (props) => css({ ...props, padding: 0 }),
  option: (props, state) =>
    css({
      ...props,
      cursor: 'pointer',
      background:
        state.isFocused || state.isSelected
          ? activeBackgroundColor
          : 'transparent',
      opacity: state.isSelected ? 0.5 : 1,
    }),
  menu: (props) =>
    css({
      ...props,
      padding: 0,
      color: 'inherit',
      borderRadius: '10px',
      overflow: 'hidden',
      background: menuBackgroundColor,
    }),
  menuList: (props) => css({ ...props, padding: 0 }),
};

type Props = { onChange: (option: SingleValue<Option>) => void };

function Selector({ onChange }: Props) {
  return (
    <div className="selector-wrap">
      <Select
        defaultValue={rangeOptions[0]}
        options={rangeOptions}
        styles={selectorStyles}
        onChange={onChange}
        components={{ DropdownIndicator }}
        isSearchable={false}
      />
    </div>
  );
}

export default Selector;
