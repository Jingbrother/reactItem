export const feeColumns = [
  {
    dataIndex: 'itemName',
    title: '收费类型'
  },
  {
    dataIndex: 'totalCost',
    title: '总费用'
  },
  {
    dataIndex: 'costRate',
    title: '费用占比',
    render: (text: any) => `${text.toFixed(2)}%`
  }
];

export const feeDetailCols = [
  {
    dataIndex: 'itemName',
    title: '项目明细'
  },
  {
    dataIndex: 'amount',
    title: '数量',
    render: (text, record) => `${text}${record.medSpecification ?? ''}`,
    width: 60
  },
  {
    dataIndex: 'totalFee',
    title: '金额',
    width: 60
  }
];