import { unit } from '@ant-design/cssinjs';
import { genFocusStyle } from '../../style';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genGroupStyle from './group';
import { prepareComponentToken, prepareToken } from './token';
// ============================== Shared ==============================
const genSharedButtonStyle = token => {
  const {
    componentCls,
    iconCls,
    fontWeight
  } = token;
  return {
    [componentCls]: {
      outline: 'none',
      position: 'relative',
      display: 'inline-flex',
      gap: token.marginXS,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      backgroundImage: 'none',
      background: 'transparent',
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',
      color: token.colorText,
      '&:disabled > *': {
        pointerEvents: 'none'
      },
      [`> span, ${componentCls}-icon`]: {
        display: 'inline-flex'
      },
      '> a': {
        color: 'currentColor'
      },
      '&:not(:disabled)': Object.assign({}, genFocusStyle(token)),
      [`&${componentCls}-two-chinese-chars::first-letter`]: {
        letterSpacing: '0.34em'
      },
      [`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
        marginInlineEnd: '-0.34em',
        letterSpacing: '0.34em'
      },
      // iconPosition="end"
      '&-icon-end': {
        flexDirection: 'row-reverse'
      }
    }
  };
};
const genHoverActiveButtonStyle = (btnCls, hoverStyle, activeStyle) => ({
  [`&:not(:disabled):not(${btnCls}-disabled)`]: {
    '&:hover': hoverStyle,
    '&:active': activeStyle
  }
});
// ============================== Shape ===============================
const genCircleButtonStyle = token => ({
  minWidth: token.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: '50%'
});
const genRoundButtonStyle = token => ({
  borderRadius: token.controlHeight,
  paddingInlineStart: token.calc(token.controlHeight).div(2).equal(),
  paddingInlineEnd: token.calc(token.controlHeight).div(2).equal()
});
const genDisabledStyle = token => ({
  cursor: 'not-allowed',
  borderColor: token.borderColorDisabled,
  color: token.colorTextDisabled,
  background: token.colorBgContainerDisabled,
  boxShadow: 'none'
});
const genGhostButtonStyle = (btnCls, background, textColor, borderColor, textColorDisabled, borderColorDisabled, hoverStyle, activeStyle) => ({
  [`&${btnCls}-background-ghost`]: Object.assign(Object.assign({
    color: textColor || undefined,
    background,
    borderColor: borderColor || undefined,
    boxShadow: 'none'
  }, genHoverActiveButtonStyle(btnCls, Object.assign({
    background
  }, hoverStyle), Object.assign({
    background
  }, activeStyle))), {
    '&:disabled': {
      cursor: 'not-allowed',
      color: textColorDisabled || undefined,
      borderColor: borderColorDisabled || undefined
    }
  })
});
const genSolidDisabledButtonStyle = token => ({
  [`&:disabled, &${token.componentCls}-disabled`]: Object.assign({}, genDisabledStyle(token))
});
const genPureDisabledButtonStyle = token => ({
  [`&:disabled, &${token.componentCls}-disabled`]: {
    cursor: 'not-allowed',
    color: token.colorTextDisabled
  }
});
// ============================== Variant =============================
const genVariantButtonStyle = (token, hoverStyle, activeStyle, variant) => {
  const isPureDisabled = variant && ['link', 'text'].includes(variant);
  const genDisabledButtonStyle = isPureDisabled ? genPureDisabledButtonStyle : genSolidDisabledButtonStyle;
  return Object.assign(Object.assign({}, genDisabledButtonStyle(token)), genHoverActiveButtonStyle(token.componentCls, hoverStyle, activeStyle));
};
const genSolidButtonStyle = (token, textColor, background, hoverStyle, activeStyle) => ({
  [`&${token.componentCls}-variant-solid`]: Object.assign({
    color: textColor,
    background
  }, genVariantButtonStyle(token, hoverStyle, activeStyle))
});
const genOutlinedDashedButtonStyle = (token, borderColor, background, hoverStyle, activeStyle) => ({
  [`&${token.componentCls}-variant-outlined, &${token.componentCls}-variant-dashed`]: Object.assign({
    borderColor,
    background
  }, genVariantButtonStyle(token, hoverStyle, activeStyle))
});
const genDashedButtonStyle = token => ({
  [`&${token.componentCls}-variant-dashed`]: {
    borderStyle: 'dashed'
  }
});
const genFilledButtonStyle = (token, background, hoverStyle, activeStyle) => ({
  [`&${token.componentCls}-variant-filled`]: Object.assign({
    boxShadow: 'none',
    background
  }, genVariantButtonStyle(token, hoverStyle, activeStyle))
});
const genTextLinkButtonStyle = (token, textColor, variant, hoverStyle, activeStyle) => ({
  [`&${token.componentCls}-variant-${variant}`]: Object.assign({
    color: textColor,
    boxShadow: 'none'
  }, genVariantButtonStyle(token, hoverStyle, activeStyle, variant))
});
// =============================== Color ==============================
const genDefaultButtonStyle = token => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
  color: token.defaultColor,
  boxShadow: token.defaultShadow
}, genSolidButtonStyle(token, token.solidTextColor, token.colorBgSolid, {
  background: token.colorBgSolidHover
}, {
  background: token.colorBgSolidActive
})), genDashedButtonStyle(token)), genFilledButtonStyle(token, token.colorFillTertiary, {
  background: token.colorFillSecondary
}, {
  background: token.colorFill
})), genTextLinkButtonStyle(token, token.textTextColor, 'link', {
  color: token.colorLinkHover,
  background: token.linkHoverBg
}, {
  color: token.colorLinkActive
})), genGhostButtonStyle(token.componentCls, token.ghostBg, token.defaultGhostColor, token.defaultGhostBorderColor, token.colorTextDisabled, token.colorBorder));
const genPrimaryButtonStyle = token => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
  color: token.colorPrimary,
  boxShadow: token.primaryShadow
}, genOutlinedDashedButtonStyle(token, token.colorPrimary, token.colorBgContainer, {
  color: token.colorPrimaryTextHover,
  borderColor: token.colorPrimaryHover,
  background: token.colorBgContainer
}, {
  color: token.colorPrimaryTextActive,
  borderColor: token.colorPrimaryActive,
  background: token.colorBgContainer
})), genDashedButtonStyle(token)), genFilledButtonStyle(token, token.colorPrimaryBg, {
  background: token.colorPrimaryBgHover
}, {
  background: token.colorPrimaryBorder
})), genTextLinkButtonStyle(token, token.colorLink, 'text', {
  color: token.colorPrimaryTextHover,
  background: token.colorPrimaryBg
}, {
  color: token.colorPrimaryTextActive,
  background: token.colorPrimaryBorder
})), genGhostButtonStyle(token.componentCls, token.ghostBg, token.colorPrimary, token.colorPrimary, token.colorTextDisabled, token.colorBorder, {
  color: token.colorPrimaryHover,
  borderColor: token.colorPrimaryHover
}, {
  color: token.colorPrimaryActive,
  borderColor: token.colorPrimaryActive
}));
const genDangerousStyle = token => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
  color: token.colorError,
  boxShadow: token.dangerShadow
}, genSolidButtonStyle(token, token.dangerColor, token.colorError, {
  background: token.colorErrorHover
}, {
  background: token.colorErrorActive
})), genOutlinedDashedButtonStyle(token, token.colorError, token.colorBgContainer, {
  color: token.colorErrorHover,
  borderColor: token.colorErrorBorderHover
}, {
  color: token.colorErrorActive,
  borderColor: token.colorErrorActive
})), genDashedButtonStyle(token)), genFilledButtonStyle(token, token.colorErrorBg, {
  background: token.colorErrorBgFilledHover
}, {
  background: token.colorErrorBgActive
})), genTextLinkButtonStyle(token, token.colorError, 'text', {
  color: token.colorErrorHover,
  background: token.colorErrorBg
}, {
  color: token.colorErrorHover,
  background: token.colorErrorBgActive
})), genTextLinkButtonStyle(token, token.colorError, 'link', {
  color: token.colorErrorHover
}, {
  color: token.colorErrorActive
})), genGhostButtonStyle(token.componentCls, token.ghostBg, token.colorError, token.colorError, token.colorTextDisabled, token.colorBorder, {
  color: token.colorErrorHover,
  borderColor: token.colorErrorHover
}, {
  color: token.colorErrorActive,
  borderColor: token.colorErrorActive
}));
const genColorButtonStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-color-default`]: genDefaultButtonStyle(token),
    [`${componentCls}-color-primary`]: genPrimaryButtonStyle(token),
    [`${componentCls}-color-dangerous`]: genDangerousStyle(token)
  };
};
// =========== Compatible with versions earlier than 5.21.0 ===========
const genCompatibleButtonStyle = token => Object.assign(Object.assign(Object.assign(Object.assign({}, genOutlinedDashedButtonStyle(token, token.defaultBorderColor, token.defaultBg, {
  color: token.defaultHoverColor,
  borderColor: token.defaultHoverBorderColor,
  background: token.defaultHoverBg
}, {
  color: token.defaultActiveColor,
  borderColor: token.defaultActiveBorderColor,
  background: token.defaultActiveBg
})), genTextLinkButtonStyle(token, token.textTextColor, 'text', {
  color: token.textTextHoverColor,
  background: token.textHoverBg
}, {
  color: token.textTextActiveColor,
  background: token.colorBgTextActive
})), genSolidButtonStyle(token, token.primaryColor, token.colorPrimary, {
  background: token.colorPrimaryHover,
  color: token.primaryColor
}, {
  background: token.colorPrimaryActive,
  color: token.primaryColor
})), genTextLinkButtonStyle(token, token.colorLink, 'link', {
  color: token.colorLinkHover,
  background: token.linkHoverBg
}, {
  color: token.colorLinkActive
}));
// =============================== Size ===============================
const genButtonStyle = function (token) {
  let prefixCls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  const {
    componentCls,
    controlHeight,
    fontSize,
    lineHeight,
    borderRadius,
    buttonPaddingHorizontal,
    iconCls,
    buttonPaddingVertical,
    motionDurationSlow,
    motionEaseInOut,
    buttonIconOnlyFontSize,
    opacityLoading
  } = token;
  return [{
    [prefixCls]: {
      fontSize,
      lineHeight,
      height: controlHeight,
      padding: `${unit(buttonPaddingVertical)} ${unit(buttonPaddingHorizontal)}`,
      borderRadius,
      [`&${componentCls}-icon-only`]: {
        width: controlHeight,
        paddingInline: 0,
        // make `btn-icon-only` not too narrow
        [`&${componentCls}-compact-item`]: {
          flex: 'none'
        },
        [`&${componentCls}-round`]: {
          width: 'auto'
        },
        [iconCls]: {
          fontSize: buttonIconOnlyFontSize
        }
      },
      // Loading
      [`&${componentCls}-loading`]: {
        opacity: opacityLoading,
        cursor: 'default'
      },
      [`${componentCls}-loading-icon`]: {
        transition: `width ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow} ${motionEaseInOut}`
      }
    }
  },
  // Shape - patch prefixCls again to override solid border radius style
  {
    [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token)
  }, {
    [`${componentCls}${componentCls}-round${prefixCls}`]: genRoundButtonStyle(token)
  }];
};
const genSizeBaseButtonStyle = token => {
  const baseToken = mergeToken(token, {
    fontSize: token.contentFontSize,
    lineHeight: token.contentLineHeight
  });
  return genButtonStyle(baseToken, token.componentCls);
};
const genSizeSmallButtonStyle = token => {
  const smallToken = mergeToken(token, {
    controlHeight: token.controlHeightSM,
    fontSize: token.contentFontSizeSM,
    lineHeight: token.contentLineHeightSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: token.paddingInlineSM,
    buttonPaddingVertical: token.paddingBlockSM,
    borderRadius: token.borderRadiusSM,
    buttonIconOnlyFontSize: token.onlyIconSizeSM
  });
  return genButtonStyle(smallToken, `${token.componentCls}-sm`);
};
const genSizeLargeButtonStyle = token => {
  const largeToken = mergeToken(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.contentFontSizeLG,
    lineHeight: token.contentLineHeightLG,
    buttonPaddingHorizontal: token.paddingInlineLG,
    buttonPaddingVertical: token.paddingBlockLG,
    borderRadius: token.borderRadiusLG,
    buttonIconOnlyFontSize: token.onlyIconSizeLG
  });
  return genButtonStyle(largeToken, `${token.componentCls}-lg`);
};
const genBlockButtonStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: '100%'
      }
    }
  };
};
// ============================== Export ==============================
export default genStyleHooks('Button', token => {
  const buttonToken = prepareToken(token);
  return [
  // Shared
  genSharedButtonStyle(buttonToken),
  // Size
  genSizeBaseButtonStyle(buttonToken), genSizeSmallButtonStyle(buttonToken), genSizeLargeButtonStyle(buttonToken),
  // Block
  genBlockButtonStyle(buttonToken),
  // Color
  genColorButtonStyle(buttonToken),
  // https://github.com/ant-design/ant-design/issues/50969
  genCompatibleButtonStyle(buttonToken),
  // Button Group
  genGroupStyle(buttonToken)];
}, prepareComponentToken, {
  unitless: {
    fontWeight: true,
    contentLineHeight: true,
    contentLineHeightSM: true,
    contentLineHeightLG: true
  }
});