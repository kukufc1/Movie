import * as React from 'react';
import type { TextAreaRef as RcTextAreaRef, TextAreaProps as RcTextAreaProps } from 'rc-textarea';
import type { InputStatus } from '../_util/statusUtils';
import type { SizeType } from '../config-provider/SizeContext';
import type { Variant } from '../config-provider';
import type { InputFocusOptions } from './Input';
export interface TextAreaProps extends Omit<RcTextAreaProps, 'suffix'> {
    /** @deprecated Use `variant` instead */
    bordered?: boolean;
    size?: SizeType;
    status?: InputStatus;
    rootClassName?: string;
    /**
     * @since 5.13.0
     * @default "outlined"
     */
    variant?: Variant;
}
export interface TextAreaRef {
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    resizableTextArea?: RcTextAreaRef['resizableTextArea'];
}
declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<TextAreaRef>>;
export default TextArea;
