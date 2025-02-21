"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareComponentToken = exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _style = require("../../style");
var _internal = require("../../theme/internal");
const genTransferCustomizeStyle = token => {
  const {
    antCls,
    componentCls,
    listHeight,
    controlHeightLG
  } = token;
  const tableCls = `${antCls}-table`;
  const inputCls = `${antCls}-input`;
  return {
    [`${componentCls}-customize-list`]: {
      [`${componentCls}-list`]: {
        flex: '1 1 50%',
        width: 'auto',
        height: 'auto',
        minHeight: listHeight,
        minWidth: 0
      },
      // =================== Hook Components ===================
      [`${tableCls}-wrapper`]: {
        [`${tableCls}-small`]: {
          border: 0,
          borderRadius: 0,
          [`${tableCls}-selection-column`]: {
            width: controlHeightLG,
            minWidth: controlHeightLG
          }
        },
        [`${tableCls}-pagination${tableCls}-pagination`]: {
          margin: 0,
          padding: token.paddingXS
        }
      },
      [`${inputCls}[disabled]`]: {
        backgroundColor: 'transparent'
      }
    }
  };
};
const genTransferStatusColor = (token, color) => {
  const {
    componentCls,
    colorBorder
  } = token;
  return {
    [`${componentCls}-list`]: {
      borderColor: color,
      '&-search:not([disabled])': {
        borderColor: colorBorder
      }
    }
  };
};
const genTransferStatusStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-status-error`]: Object.assign({}, genTransferStatusColor(token, token.colorError)),
    [`${componentCls}-status-warning`]: Object.assign({}, genTransferStatusColor(token, token.colorWarning))
  };
};
const genTransferListStyle = token => {
  const {
    componentCls,
    colorBorder,
    colorSplit,
    lineWidth,
    itemHeight,
    headerHeight,
    transferHeaderVerticalPadding,
    itemPaddingBlock,
    controlItemBgActive,
    colorTextDisabled,
    colorTextSecondary,
    listHeight,
    listWidth,
    listWidthLG,
    fontSizeIcon,
    marginXS,
    paddingSM,
    lineType,
    antCls,
    iconCls,
    motionDurationSlow,
    controlItemBgHover,
    borderRadiusLG,
    colorBgContainer,
    colorText,
    controlItemBgActiveHover
  } = token;
  const contentBorderRadius = (0, _cssinjs.unit)(token.calc(borderRadiusLG).sub(lineWidth).equal());
  return {
    display: 'flex',
    flexDirection: 'column',
    width: listWidth,
    height: listHeight,
    border: `${(0, _cssinjs.unit)(lineWidth)} ${lineType} ${colorBorder}`,
    borderRadius: token.borderRadiusLG,
    '&-with-pagination': {
      width: listWidthLG,
      height: 'auto'
    },
    '&-search': {
      [`${iconCls}-search`]: {
        color: colorTextDisabled
      }
    },
    '&-header': {
      display: 'flex',
      flex: 'none',
      alignItems: 'center',
      height: headerHeight,
      // border-top is on the transfer dom. We should minus 1px for this
      padding: `${(0, _cssinjs.unit)(token.calc(transferHeaderVerticalPadding).sub(lineWidth).equal())} ${(0, _cssinjs.unit)(paddingSM)} ${(0, _cssinjs.unit)(transferHeaderVerticalPadding)}`,
      color: colorText,
      background: colorBgContainer,
      borderBottom: `${(0, _cssinjs.unit)(lineWidth)} ${lineType} ${colorSplit}`,
      borderRadius: `${(0, _cssinjs.unit)(borderRadiusLG)} ${(0, _cssinjs.unit)(borderRadiusLG)} 0 0`,
      '> *:not(:last-child)': {
        marginInlineEnd: 4 // This is magic and fixed number, DO NOT use token since it may change.
      },
      '> *': {
        flex: 'none'
      },
      '&-title': Object.assign(Object.assign({}, _style.textEllipsis), {
        flex: 'auto',
        textAlign: 'end'
      }),
      '&-dropdown': Object.assign(Object.assign({}, (0, _style.resetIcon)()), {
        fontSize: fontSizeIcon,
        transform: 'translateY(10%)',
        cursor: 'pointer',
        '&[disabled]': {
          cursor: 'not-allowed'
        }
      })
    },
    '&-body': {
      display: 'flex',
      flex: 'auto',
      flexDirection: 'column',
      fontSize: token.fontSize,
      // https://blog.csdn.net/qq449245884/article/details/107373672/
      minHeight: 0,
      '&-search-wrapper': {
        position: 'relative',
        flex: 'none',
        padding: paddingSM
      }
    },
    '&-content': {
      flex: 'auto',
      margin: 0,
      padding: 0,
      overflow: 'auto',
      listStyle: 'none',
      borderRadius: `0 0 ${contentBorderRadius} ${contentBorderRadius}`,
      '&-item': {
        display: 'flex',
        alignItems: 'center',
        minHeight: itemHeight,
        padding: `${(0, _cssinjs.unit)(itemPaddingBlock)} ${(0, _cssinjs.unit)(paddingSM)}`,
        transition: `all ${motionDurationSlow}`,
        '> *:not(:last-child)': {
          marginInlineEnd: marginXS
        },
        '> *': {
          flex: 'none'
        },
        '&-text': Object.assign(Object.assign({}, _style.textEllipsis), {
          flex: 'auto'
        }),
        '&-remove': Object.assign(Object.assign({}, (0, _style.operationUnit)(token)), {
          color: colorBorder,
          '&:hover, &:focus': {
            color: colorTextSecondary
          }
        }),
        [`&:not(${componentCls}-list-content-item-disabled)`]: {
          '&:hover': {
            backgroundColor: controlItemBgHover,
            cursor: 'pointer'
          },
          [`&${componentCls}-list-content-item-checked:hover`]: {
            backgroundColor: controlItemBgActiveHover
          }
        },
        '&-checked': {
          backgroundColor: controlItemBgActive
        },
        '&-disabled': {
          color: colorTextDisabled,
          cursor: 'not-allowed'
        }
      },
      // Do not change hover style when `oneWay` mode
      [`&-show-remove ${componentCls}-list-content-item:not(${componentCls}-list-content-item-disabled):hover`]: {
        background: 'transparent',
        cursor: 'default'
      }
    },
    '&-pagination': {
      padding: token.paddingXS,
      textAlign: 'end',
      borderTop: `${(0, _cssinjs.unit)(lineWidth)} ${lineType} ${colorSplit}`,
      [`${antCls}-pagination-options`]: {
        paddingInlineEnd: token.paddingXS
      }
    },
    '&-body-not-found': {
      flex: 'none',
      width: '100%',
      margin: 'auto 0',
      color: colorTextDisabled,
      textAlign: 'center'
    },
    '&-footer': {
      borderTop: `${(0, _cssinjs.unit)(lineWidth)} ${lineType} ${colorSplit}`
    },
    // fix: https://github.com/ant-design/ant-design/issues/44489
    '&-checkbox': {
      lineHeight: 1
    }
  };
};
const genTransferStyle = token => {
  const {
    antCls,
    iconCls,
    componentCls,
    marginXS,
    marginXXS,
    fontSizeIcon,
    colorBgContainerDisabled
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',
      [`${componentCls}-disabled`]: {
        [`${componentCls}-list`]: {
          background: colorBgContainerDisabled
        }
      },
      [`${componentCls}-list`]: genTransferListStyle(token),
      [`${componentCls}-operation`]: {
        display: 'flex',
        flex: 'none',
        flexDirection: 'column',
        alignSelf: 'center',
        margin: `0 ${(0, _cssinjs.unit)(marginXS)}`,
        verticalAlign: 'middle',
        gap: marginXXS,
        [`${antCls}-btn ${iconCls}`]: {
          fontSize: fontSizeIcon
        }
      }
    })
  };
};
const genTransferRTLStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-rtl`]: {
      direction: 'rtl'
    }
  };
};
const prepareComponentToken = token => {
  const {
    fontSize,
    lineHeight,
    controlHeight,
    controlHeightLG,
    lineWidth
  } = token;
  const fontHeight = Math.round(fontSize * lineHeight);
  return {
    listWidth: 180,
    listHeight: 200,
    listWidthLG: 250,
    headerHeight: controlHeightLG,
    itemHeight: controlHeight,
    itemPaddingBlock: (controlHeight - fontHeight) / 2,
    transferHeaderVerticalPadding: Math.ceil((controlHeightLG - lineWidth - fontHeight) / 2)
  };
};
// ============================== Export ==============================
exports.prepareComponentToken = prepareComponentToken;
var _default = exports.default = (0, _internal.genStyleHooks)('Transfer', token => {
  const transferToken = (0, _internal.mergeToken)(token);
  return [genTransferStyle(transferToken), genTransferCustomizeStyle(transferToken), genTransferStatusStyle(transferToken), genTransferRTLStyle(transferToken)];
}, prepareComponentToken);