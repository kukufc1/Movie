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
function notEmpty(val) {
  return val !== undefined && val !== null;
}
const Cell = props => {
  const {
    itemPrefixCls,
    component,
    span,
    className,
    style,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon,
    type
  } = props;
  const Component = component;
  if (bordered) {
    return /*#__PURE__*/React.createElement(Component, {
      className: (0, _classnames.default)({
        [`${itemPrefixCls}-item-label`]: type === 'label',
        [`${itemPrefixCls}-item-content`]: type === 'content'
      }, className),
      style: style,
      colSpan: span
    }, notEmpty(label) && /*#__PURE__*/React.createElement("span", {
      style: labelStyle
    }, label), notEmpty(content) && /*#__PURE__*/React.createElement("span", {
      style: contentStyle
    }, content));
  }
  return /*#__PURE__*/React.createElement(Component, {
    className: (0, _classnames.default)(`${itemPrefixCls}-item`, className),
    style: style,
    colSpan: span
  }, /*#__PURE__*/React.createElement("div", {
    className: `${itemPrefixCls}-item-container`
  }, (label || label === 0) && (/*#__PURE__*/React.createElement("span", {
    className: (0, _classnames.default)(`${itemPrefixCls}-item-label`, {
      [`${itemPrefixCls}-item-no-colon`]: !colon
    }),
    style: labelStyle
  }, label)), (content || content === 0) && (/*#__PURE__*/React.createElement("span", {
    className: (0, _classnames.default)(`${itemPrefixCls}-item-content`),
    style: contentStyle
  }, content))));
};
var _default = exports.default = Cell;