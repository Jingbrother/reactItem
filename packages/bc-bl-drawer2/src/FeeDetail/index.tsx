import React from 'react';
import styles from './index.less';
import ReactEcharts from 'echarts-for-react';
import { Button, Table } from '@firesoon/ant-ui';
import { Icon, Tooltip } from 'antd';
import { Drawer } from 'antd';
import { useState } from 'react';
import { feeColumns, feeDetailCols } from './constant';
import { BYBZJF_TIP } from '../constant';

interface FeeListProps {
  visible: boolean;
  close: () => void;
  hasCharts?: boolean;
  feeList?: any[];
  feeStatistics?: any[];
  feeYAxis?: any[];
  hasDetail?: boolean;
}
const Index = ({
  visible,
  close,
  hasCharts = true,
  feeList,
  feeStatistics,
  feeYAxis = [
    '本院病组标准均费    ', // 空格为了占位，勿删
    '地区病组均费',
    '预估结算金额',
    'DRG医疗总费用',
  ],
  hasDetail,
}: FeeListProps) => {
  const [index, setIndex] = useState(0);

  const calcMaxWidth = arr => {
    if (!hasCharts) return 0;
    let max = 0;
    arr.forEach(item => {
      max =
        typeof item === 'number' ? Math.max(max, item.toString().length) : max;
    });
    return max * 8;
  };
  const handleIndex = index => {
    if (!hasDetail) {
      return;
    }

    setIndex(index);
  };
  const feeChartsOptions = {
    grid: {
      top: 12,
      left: 130,
      height: 125,
      right: calcMaxWidth(feeStatistics),
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      data: feeYAxis,
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'right',
          color: '#666',
        },
        data: feeStatistics,
        barWidth: 20,
        itemStyle: {
          color: '#3367D6',
        },
      },
    ],
  };

  return (
    <Drawer
      visible={visible}
      onClose={close}
      destroyOnClose={true}
      width={hasDetail ? 600 : 400}
      className={styles.drawerWrapper}
    >
      <div className={styles.feeWrapper}>
        <div className={styles.feeHeader}>费用明细</div>
        <div className={styles.feeBody}>
          {hasCharts && (
            <div style={{ height: 175, position: 'relative' }}>
              <ReactEcharts
                option={feeChartsOptions}
                style={{ height: '100%' }}
              />

              <Tooltip title={BYBZJF_TIP}>
                <Icon type="info-circle" className={styles.iconTips} />
              </Tooltip>
            </div>
          )}

          <div className={hasDetail ? styles.tables : ''}>
            <Table
              columns={feeColumns}
              scroll={{ y: 'calc(100vh - 360px)' }}
              dataSource={feeList}
              pagination={false}
              onRow={(_, index) => {
                return {
                  onClick: () => handleIndex(index),
                };
              }}
              rowClassName={(_, i) =>
                i === index && hasDetail ? styles.activeRow : ''
              }
            />

            {hasDetail && (
              <Table
                columns={feeDetailCols}
                scroll={{ y: 'calc(100vh - 360px)' }}
                dataSource={feeList?.[index]?.itemList ?? []}
                pagination={false}
                style={{ marginLeft: 12 }}
              />
            )}
          </div>
        </div>
        <div className={styles.feeFooter}>
          <div></div>
          <Button onClick={() => close()}>关闭</Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Index;
