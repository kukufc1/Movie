import { unit } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import { genStyleHooks, mergeToken } from '../../theme/internal';
const genRateStarStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-star`]: {
      position: 'relative',
      display: 'inline-block',
      color: 'inherit',
      cursor: 'pointer',
      '&:not(:last-child)': {
        marginInlineEnd: token.marginXS
      },
      '> div': {
        transition: `all ${token.motionDurationMid}, outline 0s`,
        '&:hover': {
          transform: token.starHoverScale
        },
        '&:focus': {
          outline: 0
        },
        '&:focus-visible': {
          outline: `${unit(token.lineWidth)} dashed ${token.starColor}`,
          transform: token.starHoverScale
        }
      },
      '&-first, &-second': {
        color: token.starBg,
        transition: `all ${token.motionDurationMid}`,
        userSelect: 'none'
      },
      '&-first': {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0
      },
      [`&-half ${componentCls}-star-first, &-half ${componentCls}-star-second`]: {
        opacity: 1
      },
      [`&-half ${componentCls}-star-first, &-full ${componentCls}-star-second`]: {
        color: 'inherit'
      }
    }
  };
};
const genRateRtlStyle = token => ({
  [`&-rtl${token.componentCls}`]: {
    direction: 'rtl'
  }
});
const genRateStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: 'inline-block',
      margin: 0,
      padding: 0,
      color: token.starColor,
      fontSize: token.starSize,
      lineHeight: 1,
      listStyle: 'none',
      outline: 'none',
      // disable styles
      [`&-disabled${componentCls} ${componentCls}-star`]: {
        cursor: 'default',
        '> div:hover': {
          transform: 'scale(1)'
        }
      }
    }), genRateStarStyle(token)), genRateRtlStyle(token))
  };
};
// ============================== Export ==============================
export const prepareComponentToken = token => ({
  starColor: token.yellow6,
  starSize: token.controlHeightLG * 0.5,
  starHoverScale: 'scale(1.1)',
  starBg: token.colorFillContent
});
export default genStyleHooks('Rate', token => {
  const rateToken = mergeToken(token, {});
  return [genRateStyle(rateToken)];
}, prepareComponentToken);