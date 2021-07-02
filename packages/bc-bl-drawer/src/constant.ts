/** 结算类型 */
export const SETTLE_TYPE = {
  病组结算: 'normal',
  定额结算: 'quota',
  床日结算: 'bedDay',
};

export const SETTLE_KEY = Object.keys(SETTLE_TYPE);

export const normalTypeMap = {
  1: 'money',
  2: 'day',
};

export const zkwtIcon = [
  { color: '#F7B500', tooltip: '建议性问题' },
  { color: '#E02020', tooltip: '强制性问题' },
];

export const tips = {
  bedDay: [
    '关闭床日预测，启用病组预测',
    '当前病例符合床日预测规则，关闭后系统将按病组预测结算'
  ],
  normal: [
    '当前病例符合床日结算，启用床日预测',
    '启用床日后，系统将根据符合的床日规则来预测结算'
  ]
};

export const lockLabel = {
  0: '未编码',
  1: '已编码'
};

export const BYBZJF_TIP = '本院病组标准均费=地区病组均费*病组调整系数';