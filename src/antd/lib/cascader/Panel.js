"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCascader = require("rc-cascader");
var _defaultRenderEmpty = _interopRequireDefault(require("../config-provider/defaultRenderEmpty"));
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _useCSSVarCls = _interopRequireDefault(require("../config-provider/hooks/useCSSVarCls"));
var _useBase = _interopRequireDefault(require("./hooks/useBase"));
var _useCheckable = _interopRequireDefault(require("./hooks/useCheckable"));
var _useColumnIcons = _interopRequireDefault(require("./hooks/useColumnIcons"));
var _style = _interopRequireDefault(require("./style"));
var _panel = _interopRequireDefault(require("./style/panel"));
function CascaderPanel(props) {
  const {
    prefixCls: customizePrefixCls,
    className,
    multiple,
    rootClassName,
    notFoundContent,
    direction,
    expandIcon,
    disabled: customDisabled
  } = props;
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty] = (0, _useBase.default)(customizePrefixCls, direction);
  const rootCls = (0, _useCSSVarCls.default)(cascaderPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(cascaderPrefixCls, rootCls);
  (0, _panel.default)(cascaderPrefixCls);
  const isRtl = mergedDirection === 'rtl';
  // ===================== Icon ======================
  const [mergedExpandIcon, loadingIcon] = (0, _useColumnIcons.default)(prefixCls, isRtl, expandIcon);
  // ===================== Empty =====================
  const mergedNotFoundContent = notFoundContent || (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Cascader')) || (/*#__PURE__*/React.createElement(_defaultRenderEmpty.default, {
    componentName: "Cascader"
  }));
  // =================== Multiple ====================
  const checkable = (0, _useCheckable.default)(cascaderPrefixCls, multiple);
  // ==================== Render =====================
  return wrapCSSVar(/*#__PURE__*/React.createElement(_rcCascader.Panel, Object.assign({}, props, {
    checkable: checkable,
    prefixCls: cascaderPrefixCls,
    className: (0, _classnames.default)(className, hashId, rootClassName, cssVarCls, rootCls),
    notFoundContent: mergedNotFoundContent,
    direction: mergedDirection,
    expandIcon: mergedExpandIcon,
    loadingIcon: loadingIcon,
    disabled: mergedDisabled
  })));
}
var _default = exports.default = CascaderPanel;