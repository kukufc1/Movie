"use client";

import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import useMultipleSelect from '../_util/hooks/useMultipleSelect';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { groupDisabledKeysMap, groupKeysMap } from '../_util/transKeys';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import { FormItemInputContext } from '../form/context';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import useData from './hooks/useData';
import useSelection from './hooks/useSelection';
import List from './list';
import Operation from './operation';
import Search from './search';
import useStyle from './style';
const Transfer = props => {
  const {
    dataSource,
    targetKeys = [],
    selectedKeys,
    selectAllLabels = [],
    operations = [],
    style = {},
    listStyle = {},
    locale = {},
    titles,
    disabled,
    showSearch = false,
    operationStyle,
    showSelectAll,
    oneWay,
    pagination,
    status: customStatus,
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    selectionsIcon,
    filterOption,
    render,
    footer,
    children,
    rowKey,
    onScroll,
    onChange,
    onSearch,
    onSelectChange
  } = props;
  const {
    getPrefixCls,
    renderEmpty,
    direction: dir,
    transfer
  } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('transfer', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  // Fill record with `key`
  const [mergedDataSource, leftDataSource, rightDataSource] = useData(dataSource, rowKey, targetKeys);
  // Get direction selected keys
  const [
  // Keys
  sourceSelectedKeys, targetSelectedKeys,
  // Setters
  setSourceSelectedKeys, setTargetSelectedKeys] = useSelection(leftDataSource, rightDataSource, selectedKeys);
  const [leftMultipleSelect, updateLeftPrevSelectedIndex] = useMultipleSelect(item => item.key);
  const [rightMultipleSelect, updateRightPrevSelectedIndex] = useMultipleSelect(item => item.key);
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Transfer');
    process.env.NODE_ENV !== "production" ? warning(!pagination || !children, 'usage', '`pagination` not support customize render list.') : void 0;
  }
  const setStateKeys = useCallback((direction, keys) => {
    if (direction === 'left') {
      const nextKeys = typeof keys === 'function' ? keys(sourceSelectedKeys || []) : keys;
      setSourceSelectedKeys(nextKeys);
    } else {
      const nextKeys = typeof keys === 'function' ? keys(targetSelectedKeys || []) : keys;
      setTargetSelectedKeys(nextKeys);
    }
  }, [sourceSelectedKeys, targetSelectedKeys]);
  const setPrevSelectedIndex = (direction, value) => {
    const isLeftDirection = direction === 'left';
    const updatePrevSelectedIndex = isLeftDirection ? updateLeftPrevSelectedIndex : updateRightPrevSelectedIndex;
    updatePrevSelectedIndex(value);
  };
  const handleSelectChange = useCallback((direction, holder) => {
    if (direction === 'left') {
      onSelectChange === null || onSelectChange === void 0 ? void 0 : onSelectChange(holder, targetSelectedKeys);
    } else {
      onSelectChange === null || onSelectChange === void 0 ? void 0 : onSelectChange(sourceSelectedKeys, holder);
    }
  }, [sourceSelectedKeys, targetSelectedKeys]);
  const getTitles = transferLocale => {
    var _a;
    return (_a = titles !== null && titles !== void 0 ? titles : transferLocale.titles) !== null && _a !== void 0 ? _a : [];
  };
  const handleLeftScroll = e => {
    onScroll === null || onScroll === void 0 ? void 0 : onScroll('left', e);
  };
  const handleRightScroll = e => {
    onScroll === null || onScroll === void 0 ? void 0 : onScroll('right', e);
  };
  const moveTo = direction => {
    const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
    const dataSourceDisabledKeysMap = groupDisabledKeysMap(mergedDataSource);
    // filter the disabled options
    const newMoveKeys = moveKeys.filter(key => !dataSourceDisabledKeysMap.has(key));
    const newMoveKeysMap = groupKeysMap(newMoveKeys);
    // move items to target box
    const newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(targetKey => !newMoveKeysMap.has(targetKey));
    // empty checked keys
    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    setStateKeys(oppositeDirection, []);
    handleSelectChange(oppositeDirection, []);
    onChange === null || onChange === void 0 ? void 0 : onChange(newTargetKeys, direction, newMoveKeys);
  };
  const moveToLeft = () => {
    moveTo('left');
    setPrevSelectedIndex('left', null);
  };
  const moveToRight = () => {
    moveTo('right');
    setPrevSelectedIndex('right', null);
  };
  const onItemSelectAll = (direction, keys, checkAll) => {
    setStateKeys(direction, prevKeys => {
      let mergedCheckedKeys = [];
      if (checkAll === 'replace') {
        mergedCheckedKeys = keys;
      } else if (checkAll) {
        // Merge current keys with origin key
        mergedCheckedKeys = Array.from(new Set([].concat(_toConsumableArray(prevKeys), _toConsumableArray(keys))));
      } else {
        const selectedKeysMap = groupKeysMap(keys);
        // Remove current keys from origin keys
        mergedCheckedKeys = prevKeys.filter(key => !selectedKeysMap.has(key));
      }
      handleSelectChange(direction, mergedCheckedKeys);
      return mergedCheckedKeys;
    });
    setPrevSelectedIndex(direction, null);
  };
  const onLeftItemSelectAll = (keys, checkAll) => {
    onItemSelectAll('left', keys, checkAll);
  };
  const onRightItemSelectAll = (keys, checkAll) => {
    onItemSelectAll('right', keys, checkAll);
  };
  const leftFilter = e => onSearch === null || onSearch === void 0 ? void 0 : onSearch('left', e.target.value);
  const rightFilter = e => onSearch === null || onSearch === void 0 ? void 0 : onSearch('right', e.target.value);
  const handleLeftClear = () => onSearch === null || onSearch === void 0 ? void 0 : onSearch('left', '');
  const handleRightClear = () => onSearch === null || onSearch === void 0 ? void 0 : onSearch('right', '');
  const handleSingleSelect = (direction, holder, selectedKey, checked, currentSelectedIndex) => {
    const isSelected = holder.has(selectedKey);
    if (isSelected) {
      holder.delete(selectedKey);
      setPrevSelectedIndex(direction, null);
    }
    if (checked) {
      holder.add(selectedKey);
      setPrevSelectedIndex(direction, currentSelectedIndex);
    }
  };
  const handleMultipleSelect = (direction, data, holder, currentSelectedIndex) => {
    const isLeftDirection = direction === 'left';
    const multipleSelect = isLeftDirection ? leftMultipleSelect : rightMultipleSelect;
    multipleSelect(currentSelectedIndex, data, holder);
  };
  const onItemSelect = (direction, selectedKey, checked, multiple) => {
    const isLeftDirection = direction === 'left';
    const holder = _toConsumableArray(isLeftDirection ? sourceSelectedKeys : targetSelectedKeys);
    const holderSet = new Set(holder);
    const data = _toConsumableArray(isLeftDirection ? leftDataSource : rightDataSource).filter(item => !(item === null || item === void 0 ? void 0 : item.disabled));
    const currentSelectedIndex = data.findIndex(item => item.key === selectedKey);
    // multiple select by hold down the shift key
    if (multiple && holder.length > 0) {
      handleMultipleSelect(direction, data, holderSet, currentSelectedIndex);
    } else {
      handleSingleSelect(direction, holderSet, selectedKey, checked, currentSelectedIndex);
    }
    const holderArr = Array.from(holderSet);
    handleSelectChange(direction, holderArr);
    if (!props.selectedKeys) {
      setStateKeys(direction, holderArr);
    }
  };
  const onLeftItemSelect = (selectedKey, checked, e) => {
    onItemSelect('left', selectedKey, checked, e === null || e === void 0 ? void 0 : e.shiftKey);
  };
  const onRightItemSelect = (selectedKey, checked, e) => {
    onItemSelect('right', selectedKey, checked, e === null || e === void 0 ? void 0 : e.shiftKey);
  };
  const onRightItemRemove = keys => {
    setStateKeys('right', []);
    onChange === null || onChange === void 0 ? void 0 : onChange(targetKeys.filter(key => !keys.includes(key)), 'left', _toConsumableArray(keys));
  };
  const handleListStyle = direction => {
    if (typeof listStyle === 'function') {
      return listStyle({
        direction
      });
    }
    return listStyle || {};
  };
  const formItemContext = useContext(FormItemInputContext);
  const {
    hasFeedback,
    status
  } = formItemContext;
  const getLocale = transferLocale => Object.assign(Object.assign(Object.assign({}, transferLocale), {
    notFoundContent: (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Transfer')) || /*#__PURE__*/React.createElement(DefaultRenderEmpty, {
      componentName: "Transfer"
    })
  }), locale);
  const mergedStatus = getMergedStatus(status, customStatus);
  const mergedPagination = !children && pagination;
  const leftActive = rightDataSource.filter(d => targetSelectedKeys.includes(d.key) && !d.disabled).length > 0;
  const rightActive = leftDataSource.filter(d => sourceSelectedKeys.includes(d.key) && !d.disabled).length > 0;
  const cls = classNames(prefixCls, {
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-customize-list`]: !!children,
    [`${prefixCls}-rtl`]: dir === 'rtl'
  }, getStatusClassNames(prefixCls, mergedStatus, hasFeedback), transfer === null || transfer === void 0 ? void 0 : transfer.className, className, rootClassName, hashId, cssVarCls);
  const [contextLocale] = useLocale('Transfer', defaultLocale.Transfer);
  const listLocale = getLocale(contextLocale);
  const [leftTitle, rightTitle] = getTitles(listLocale);
  const mergedSelectionsIcon = selectionsIcon !== null && selectionsIcon !== void 0 ? selectionsIcon : transfer === null || transfer === void 0 ? void 0 : transfer.selectionsIcon;
  return wrapCSSVar(/*#__PURE__*/React.createElement("div", {
    className: cls,
    style: Object.assign(Object.assign({}, transfer === null || transfer === void 0 ? void 0 : transfer.style), style)
  }, /*#__PURE__*/React.createElement(List, Object.assign({
    prefixCls: `${prefixCls}-list`,
    titleText: leftTitle,
    dataSource: leftDataSource,
    filterOption: filterOption,
    style: handleListStyle('left'),
    checkedKeys: sourceSelectedKeys,
    handleFilter: leftFilter,
    handleClear: handleLeftClear,
    onItemSelect: onLeftItemSelect,
    onItemSelectAll: onLeftItemSelectAll,
    render: render,
    showSearch: showSearch,
    renderList: children,
    footer: footer,
    onScroll: handleLeftScroll,
    disabled: disabled,
    direction: dir === 'rtl' ? 'right' : 'left',
    showSelectAll: showSelectAll,
    selectAllLabel: selectAllLabels[0],
    pagination: mergedPagination,
    selectionsIcon: mergedSelectionsIcon
  }, listLocale)), /*#__PURE__*/React.createElement(Operation, {
    className: `${prefixCls}-operation`,
    rightActive: rightActive,
    rightArrowText: operations[0],
    moveToRight: moveToRight,
    leftActive: leftActive,
    leftArrowText: operations[1],
    moveToLeft: moveToLeft,
    style: operationStyle,
    disabled: disabled,
    direction: dir,
    oneWay: oneWay
  }), /*#__PURE__*/React.createElement(List, Object.assign({
    prefixCls: `${prefixCls}-list`,
    titleText: rightTitle,
    dataSource: rightDataSource,
    filterOption: filterOption,
    style: handleListStyle('right'),
    checkedKeys: targetSelectedKeys,
    handleFilter: rightFilter,
    handleClear: handleRightClear,
    onItemSelect: onRightItemSelect,
    onItemSelectAll: onRightItemSelectAll,
    onItemRemove: onRightItemRemove,
    render: render,
    showSearch: showSearch,
    renderList: children,
    footer: footer,
    onScroll: handleRightScroll,
    disabled: disabled,
    direction: dir === 'rtl' ? 'left' : 'right',
    showSelectAll: showSelectAll,
    selectAllLabel: selectAllLabels[1],
    showRemove: oneWay,
    pagination: mergedPagination,
    selectionsIcon: mergedSelectionsIcon
  }, listLocale))));
};
if (process.env.NODE_ENV !== 'production') {
  Transfer.displayName = 'Transfer';
}
Transfer.List = List;
Transfer.Search = Search;
Transfer.Operation = Operation;
export default Transfer;