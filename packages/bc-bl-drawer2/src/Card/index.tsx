import React from 'react';
import { Tooltip, Switch, Icon } from 'antd';
import { Button } from '@firesoon/ant-ui';
import { Detail } from '@firesoon/icons-react';
import { lockLabel, tips } from '../constant';
import styles from './index.less';
import { description, formatTypeInfo } from './config';
import { useState } from 'react';
import FeeDetail from '../FeeDetail';

const Index = ({
  info = {} as any,
  hasBedDay = false,
  showBedDay = true,
  changeBedDay,
  ycInfo = {} as any,
  isMock = false,
  hasLabel = true, // 是否展示已编码、未编码标签
  flag,
  onReset,
  feeStatistics = [],
  feeItemList = [],
  hasDetail,
}) => {
  const [visible, setVisible] = useState(false);
  const {
    type,
    jsFlag,
    patientInfo = {},
    diagnosisDetail = {},
    surgeryDetail = {},
    mainSettleType,
  } = info;
  const { name, jyk, addPoint } = ycInfo;
  const { mainDiagnosis = {}, secondDiagnosisList = [] } = diagnosisDetail;
  const { mainSurgery = {}, secondSurgeryList = [] } = surgeryDetail;

  // console.log('ycInfo', ycInfo, 'info', info);

  const openFeeDetail = () => {
    setVisible(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>
          {type === 'bedDay' ? '按床日' : '按病组'}
          {jsFlag ? '结算' : '预测'}
        </h3>

        {hasBedDay && showBedDay && (
          <div style={{ color: type === 'bedDay' ? '#3367d6' : 'black' }}>
            {tips[type][0]}
            <Tooltip title={tips[type][1]} placement={'topRight'}>
              <Switch
                checked={type === 'bedDay'}
                style={{ marginLeft: 9 }}
                onChange={changeBedDay}
              />
            </Tooltip>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.group}>
          {name ?? <p style={{ color: '#666' }}>暂无分组信息</p>}
        </div>

        <div className={styles.overview}>
          <div>
            <p>医疗总费用</p>
            {patientInfo.ylzfy != null ? (
              <p
                onClick={openFeeDetail}
                style={{ cursor: 'pointer' }}
                className="auto-track"
                data-name="查看费用明细"
              >
                {patientInfo.ylzfy}
                <Tooltip title={'点击查看费用明细'}>
                  <Button type="link">
                    <Detail style={{ color: '#3367d6', marginLeft: 4 }} />
                  </Button>
                </Tooltip>
              </p>
            ) : (
              <p>-</p>
            )}
          </div>
          <div>
            <p>{jsFlag ? '' : '预计'}结余</p>
            <p style={{ color: jyk < 0 && '#E02020' }}>{jyk ?? '-'}</p>
          </div>
          <div>
            <p>
              {type === 'quota'
                ? '定额标准'
                : `${jsFlag ? '结算' : '预计'}总点数`}
            </p>
            <p>
              {ycInfo.point ?? '-'}

              {ycInfo.special &&
                ycInfo.point > 0 &&
                ycInfo.special.point > 0 &&
                addPoint > 0 &&
                type === 'normal' && (
                  <Tooltip
                    overlayStyle={{ whiteSpace: 'nowrap', maxWidth: 400 }}
                    title={
                      <>
                        <div style={{ whiteSpace: 'nowrap' }}>
                          <span>
                            {`其中特殊药品耗材：${ycInfo.special.fee}`}元
                          </span>
                          &nbsp;&nbsp;&nbsp;
                          <span>{`折算点数：${ycInfo.special.point}`}</span>
                        </div>

                        <div>新技术奖励点数：{addPoint}</div>
                      </>
                    }
                  >
                    <Icon
                      type="exclamation-circle"
                      theme="filled"
                      style={{ color: '#faad14', marginLeft: 4 }}
                    />
                  </Tooltip>
                )}
            </p>
          </div>
          <div>
            <p>{type === 'bedDay' ? '床日类型' : '病例类型'}</p>
            {ycInfo.caseTypeName ? <p>{ycInfo.caseTypeName}</p> : <p>-</p>}
          </div>
          <div>
            <p>住院天数</p>
            {patientInfo.bedDays ? <p>{patientInfo.bedDays}天</p> : <p>-</p>}
          </div>
        </div>

        <div className={styles.details}>
          <div
            className={isMock ? styles.mockCard : ''}
            style={{ marginRight: 8 }}
          >
            <header className={styles.detailBodyCardZlInfo}>
              {!isMock ? (
                <>
                  <p>病历诊疗信息</p>

                  {hasLabel && lockLabel[patientInfo.lockStatus] && (
                    <div className={styles.detailBodyCodeLabel}>
                      {lockLabel[patientInfo.lockStatus]}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p>模拟诊疗信息</p>
                  {/* 模拟的时候不需要展示已编码未编码 */}
                  <div>
                    <Tooltip title={'恢复到默认病历诊疗信息'}>
                      <Button type="link" onClick={onReset}>
                        恢复
                      </Button>
                    </Tooltip>
                  </div>
                </>
              )}
            </header>
            <main>
              <div>
                <label>主要诊断：</label>
                <div>
                  {mainDiagnosis?.diagnosisName ||
                  mainDiagnosis?.diagnosisCode ? (
                    <>
                      {mainDiagnosis.diagnosisName} (
                      {mainDiagnosis.diagnosisCode})
                    </>
                  ) : (
                    <div style={{ color: '#666' }}>暂无</div>
                  )}
                </div>
              </div>
              <div>
                <label>其他诊断：</label>
                <div>
                  {secondDiagnosisList?.length > 0 ? (
                    secondDiagnosisList?.reduce(
                      (pre, cur, index) =>
                        `${index !== 0 ? `${pre}；` : ''}${cur.diagnosisName ??
                          ''} ${
                          cur.diagnosisCode ? `(${cur.diagnosisCode})` : ''
                        }`,
                      '',
                    )
                  ) : (
                    <div style={{ color: '#666' }}>暂无</div>
                  )}
                </div>
              </div>
              <div>
                <label>主要手术：</label>
                <div>
                  {mainSurgery?.surgeryName || mainSurgery?.surgeryCode ? (
                    <>
                      {mainSurgery.surgeryName} ({mainSurgery.surgeryCode})
                    </>
                  ) : (
                    <>
                      <div style={{ color: '#666' }}>
                        暂无
                        {flag && (
                          <Tooltip title={description}>
                            <Icon
                              type="exclamation-circle"
                              theme="filled"
                              style={{ color: '#faad14', marginLeft: 4 }}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label>其他手术：</label>
                <div>
                  {secondSurgeryList?.length > 0 ? (
                    secondSurgeryList?.reduce(
                      (pre, cur, index) =>
                        `${index !== 0 ? `${pre}；` : ''}${cur.surgeryName ??
                          ''} ${cur.surgeryCode ? `(${cur.surgeryCode})` : ''}`,
                      '',
                    )
                  ) : (
                    <div style={{ color: '#666' }}>暂无</div>
                  )}
                </div>
              </div>
            </main>
          </div>

          <div>
            <header>
              {type === 'bedDay'
                ? '床日信息'
                : `${jsFlag ? '结算' : '预测'}分组信息`}
            </header>

            <main>
              {mainSettleType != null ? (
                <>
                  <div className={styles.groupPoint}>
                    {formatTypeInfo(ycInfo, type)}
                  </div>

                  {type !== 'bedDay' && (
                    <>
                      <div>
                        <label>地区病组平均住院日：</label>
                        <span>{ycInfo.groupInfo.avgDays}</span>
                      </div>
                      <div>
                        <label>地区病组均费：</label>
                        <span>{ycInfo.groupInfo.avgArea}</span>
                      </div>
                      <div>
                        <label>医疗总费用占地区病组均费：</label>
                        <span>{ycInfo.groupInfo.avgAreaRate}</span>
                      </div>
                      <div>
                        <label>本院病组均费：</label>
                        <span>{ycInfo.groupInfo.avgHop}</span>
                      </div>
                      <div>
                        <label>医疗总费用占本院病组均费：</label>
                        <span>{ycInfo.groupInfo.avgHopRate}</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div style={{ color: '#666' }}>暂无</div>
              )}
            </main>
          </div>
        </div>
      </div>

      {visible && (
        <FeeDetail
          visible={visible}
          close={() => setVisible(false)}
          hasCharts={info.mainSettleType}
          feeStatistics={feeStatistics.concat([patientInfo.ylzfy])}
          feeList={feeItemList}
          hasDetail={hasDetail}
          feeYAxis={[
            '本院病组标准均费    ', // 空格为了占位，勿删
            '地区病组均费',
            `${jsFlag ? '' : '预估'}结算金额`,
            'DRG医疗总费用',
          ]}
        />
      )}
    </div>
  );
};

export default Index;
