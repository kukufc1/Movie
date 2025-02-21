import * as React from 'react';
import type { BaseSelectRef, SelectProps as RcSelectProps } from 'rc-select';
import { OptGroup, Option } from 'rc-select';
import type { OptionProps } from 'rc-select/lib/Option';
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select';
import type { SelectCommonPlacement } from '../_util/motion';
import type { InputStatus } from '../_util/statusUtils';
import type { SizeType } from '../config-provider/SizeContext';
import type { Variant } from '../config-provider';
type RawValue = string | number;
export type { BaseOptionType, DefaultOptionType, OptionProps, BaseSelectRef as RefSelectProps };
export interface LabeledValue {
    key?: string;
    value: RawValue;
    label: React.ReactNode;
}
export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;
export interface InternalSelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode'> {
    rootClassName?: string;
    prefix?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    size?: SizeType;
    disabled?: boolean;
    mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE' | 'combobox';
    /** @deprecated Use `variant` instead. */
    bordered?: boolean;
    /**
     * @deprecated `showArrow` is deprecated which will be removed in next major version. It will be a
     *   default behavior, you can hide it by setting `suffixIcon` to null.
     */
    showArrow?: boolean;
    /**
     * @since 5.13.0
     * @default "outlined"
     */
    variant?: Variant;
}
export interface SelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType> extends Omit<InternalSelectProps<ValueType, OptionType>, 'mode' | 'getInputElement' | 'getRawInputElement' | 'backfill' | 'placement'> {
    placement?: SelectCommonPlacement;
    mode?: 'multiple' | 'tags';
    status?: InputStatus;
    popupClassName?: string;
    /** @deprecated Please use `popupClassName` instead */
    dropdownClassName?: string;
    /** @deprecated Please use `popupMatchSelectWidth` instead */
    dropdownMatchSelectWidth?: boolean | number;
    popupMatchSelectWidth?: boolean | number;
}
declare const Select: (<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(props: React.PropsWithChildren<SelectProps<ValueType, OptionType>> & React.RefAttributes<BaseSelectRef>) => React.ReactElement) & {
    displayName?: string;
    SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
    Option: typeof Option;
    OptGroup: typeof OptGroup;
    _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};
declare const PurePanel: (props: import("../_util/type").AnyObject) => React.JSX.Element;
export default Select;
