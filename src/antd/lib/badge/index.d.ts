import * as React from 'react';
import type { PresetStatusColorType } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import type { PresetColorKey } from '../theme/internal';
import Ribbon from './Ribbon';
export type { ScrollNumberProps } from './ScrollNumber';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Number to show in badge */
    count?: React.ReactNode;
    showZero?: boolean;
    /** Max count to show */
    overflowCount?: number;
    /** Whether to show red dot without number */
    dot?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    scrollNumberPrefixCls?: string;
    className?: string;
    rootClassName?: string;
    status?: PresetStatusColorType;
    color?: LiteralUnion<PresetColorKey>;
    text?: React.ReactNode;
    size?: 'default' | 'small';
    offset?: [number | string, number | string];
    title?: string;
    children?: React.ReactNode;
    classNames?: {
        root?: string;
        indicator?: string;
    };
    styles?: {
        root?: React.CSSProperties;
        indicator?: React.CSSProperties;
    };
}
declare const InternalBadge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
type CompoundedComponent = typeof InternalBadge & {
    Ribbon: typeof Ribbon;
};
declare const Badge: CompoundedComponent;
export default Badge;
