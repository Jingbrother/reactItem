import React from 'react';
import { normalTypeMap, SETTLE_KEY } from './constant';

// 进度条数字颜色
const generateColor = nums => {
  if (!nums) {
    return '#3367d6';
  }
  return nums >= 0 ? '#3367d6' : '#e02020';
};

const generateTooltip = (tooltip, patientInfo) => {
  // console.log(tooltip, patientInfo);

  // if (!tooltip) return null;
  const { first, second, type } = tooltip;
  const isDay = type === '2';
  let firstText;
  let secondText;

  if (isUndefined(first) && isUndefined(second)) return null;

  firstText = isDay
    ? `当前住院天数${first ?? patientInfo.days}天`
    : `当前费用${first ?? patientInfo.total}元`;

  if (second && second < 0) {
    secondText = isDay ? (
      <>
        ,已超过<span style={{ color: '#fff', fontWeight: 700 }}>{-second}</span>
        天
      </>
    ) : (
      <>
        ,已超支<span style={{ color: '#fff', fontWeight: 700 }}>{-second}</span>
        元
      </>
    );
  } else if (second && second >= 0) {
    secondText =
      type === 'day' ? `距超过还剩${second}天` : `距超支还剩${second}元`;
  } else {
    secondText = null;
  }

  return (
    <div>
      {firstText}
      {secondText}
    </div>
  );
};

function isUndefined(target) {
  return target == null;
}

// 判断进度条信息是否完整
const getError = ({
  empty = true,
  cost,
  divider,
  type,
  tooltip,
  jsFlag,
  progressBar,
}) => {
  let errMsg = '';

  if (empty) {
    return '当前病例无分组信息';
  }

  if (isUndefined(cost) || !tooltip) {
    return '缺少病例信息';
  }

  if (!type) {
    return '缺少分组类型';
  }

  switch (progressBar) {
    case '1':
      if (
        !isUndefined(divider.high) &&
        !isUndefined(divider.low) &&
        divider.high <= divider.low
      ) {
        errMsg = '高低倍率界值错误';
      } else if (isUndefined(divider.high) || isUndefined(divider.low)) {
        errMsg = '缺少高低倍界值';
      }
      break;
    case '2':
      if (
        !isUndefined(divider.highDay) &&
        !isUndefined(divider.lowDay) &&
        divider.highDay <= divider.lowDay
      ) {
        errMsg = '高低倍率界值错误';
      } else if (isUndefined(divider.highDay) || isUndefined(divider.lowDay)) {
        errMsg = '缺少高低倍界值';
      }
      break;
    case '3':
      if (isUndefined(divider.hosDrgAvgCost)) {
        errMsg = '缺少本院病组均费';
      }
      break;
    case '4':
      if (isUndefined(divider.areaDrgAvgCost)) {
        errMsg = '缺少地区病组均费';
      }
      break;
    case '5':
      if (isUndefined(divider.quato)) {
        errMsg = '缺少定额标准';
      }
      break;
    case '6':
      if (isUndefined(divider.yjjs)) {
        errMsg = `缺少${jsFlag ? '' : '预计'}结算金额`;
      }
      break;
    default:
      break;
  }

  return errMsg;
};

export const fomratProps = data => {
  const {
    feeWarnSubType,
    type,
    forecastInfoList = [],
    mainSettleType,
    patientInfo = {},
    jsFlag,
  } = data;

  const item =
    forecastInfoList.find(item => item.settleType === mainSettleType) ?? {};
  const isDay = item.progressBar === '2'; // 是否床日预警 && 是否病组结算
  const isAvg = item.progressBar === '3' || item.progressBar === '4';

  const ycInfo = {
    ...item,
    progressDetail: formatProgressDetail(item, patientInfo.ylzfy),
    cost:
      (isDay ? item.bedDays : patientInfo.ylzfy) ??
      (isDay ? patientInfo.bedDays : patientInfo.ylzfy),
    divider: {
      high: item.drgCaseTypeUpper,
      low: item.drgCaseTypeDown,
      highDay: item.drgAvgDaysUpper,
      lowDay: item.drgAvgDaysDown,
      highTarget: item.targetUpper,
      lowTarget: item.targetLower,
      quato: item.jsje,
      yjjs: item.jsje,
      hosDrgAvgCost: item.hosDrgAvgCost,
      areaDrgAvgCost: item.areaDrgAvgCost,
    },
    normalType: normalTypeMap[feeWarnSubType] ?? 'money',
    progressBar: item.progressBar,
  };

  return {
    type,
    cost: ycInfo.cost,
    // normalType: ycInfo.normalType,
    divider: ycInfo.divider,
    tooltip: generateTooltip(ycInfo.progressDetail, patientInfo),
    color: isDay
      ? generateColor(ycInfo.bedDaysCount)
      : isAvg
      ? ''
      : generateColor(ycInfo.jyk),
    error: getError({
      empty: !(ycInfo.drgCode && ycInfo.drgName),
      cost: ycInfo.cost,
      divider: ycInfo.divider,
      type,
      tooltip: ycInfo.progressDetail,
      progressBar: ycInfo.progressBar,
      jsFlag,
    }),
    jsFlag,
    progressBar: ycInfo.progressBar,
  };
};

function formatProgressDetail(data, ylzfy) {
  const { progressBar, jyk, bedDays, bedDaysCount } = data;
  // console.log('data', data);

  const detail: any = {
    type: progressBar,
  };

  switch (progressBar) {
    case '1':
    case '5':
    case '6':
      detail.first = ylzfy;
      detail.second = jyk;
      break;
    case '2':
      detail.first = bedDays;
      detail.second = bedDaysCount;
      break;
    case '3':
    case '4':
      detail.first = ylzfy;
      break;
    default:
      break;
  }

  return detail;
}

export const formatCardProps = info => {
  const { forecastInfoList = [], type, feeItemList } = info;
  const item = getCurrentInfo(info);

  const ycInfo = {
    ...item,
    name:
      item.drgCode && item.drgName ? `${item.drgCode} ${item.drgName}` : null,
    point: type === 'quota' ? item.jsje : item.predictPoints,
    special:
      !isUndefined(item.specialFee) && !isUndefined(item.specialPoint)
        ? {
            fee: item.specialFee,
            point: item.specialPoint,
          }
        : null,
    groupInfo: {
      basePoint: item.basePoints ?? '-',
      quato: item.jsje ?? '-',
      bzxs: item.adjustCoefficient ?? '-',
      avgDays: item.areaDrgAvgDays ?? '-',
      avgArea: item.areaDrgAvgCost ?? '-',
      avgAreaRate: item.costAreaDrgAvgCost ?? '-',
      avgHop: item.hosDrgAvgCost ?? '-',
      avgHopRate: item.costHospitalDrgAvgCost ?? '-',
      basePointDay: item.dayBaseRule ?? [],
    },
  };

  return {
    info,
    ycInfo,
    hasBedDay:
      forecastInfoList.findIndex(item => item.settleType === SETTLE_KEY[2]) >=
      0,
    feeStatistics: [
      item.hospitalDrgStandardAvg,
      ycInfo?.groupInfo.avgArea,
      ycInfo?.jsje,
    ],
    feeItemList,
  };
};

export const formatDiagSelect = ({
  mainDiagnosis,
  secondDiagnosisList = [],
}) => {
  const list = secondDiagnosisList ? [...secondDiagnosisList] : [];

  if (mainDiagnosis) {
    list.unshift(mainDiagnosis);
  }

  const types = [...new Set(list.map(item => item.diagnosisTypeName))];

  return types?.map(item => {
    return {
      name: item,
      list: list.filter(ite => ite.diagnosisTypeName === item),
    };
  });
};

export const formatOperaSelect = ({ mainSurgery, secondSurgeryList = [] }) => {
  const list = secondSurgeryList ? [...secondSurgeryList] : [];

  if (mainSurgery) {
    list.unshift(mainSurgery);
  }

  const types = [...new Set(list.map(item => item.groupNo))];

  return types?.map(item => {
    return {
      name: item,
      list: list.filter(ite => ite.groupNo === item),
    };
  });
};

export const getCurrentInfo = info => {
  const { forecastInfoList = [], mainSettleType } = info;
  const item =
    forecastInfoList.find(item => item.settleType === mainSettleType) ?? {};

  return item;
};
