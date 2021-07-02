import React from 'react';
import { Drawer, Tooltip, Icon } from 'antd';
import { RedAlert, ProblemCase, UnreasonHospital } from '@firesoon/icons-react';
import { Button } from '@firesoon/ant-ui';
import { zkwtIcon } from './constant';
import styles from './index.less';

const YjDetail = ({
  visible,
  onClose,
  fyyj,
  feePredictWarnList,
  zkwt,
  qualityControlList,
  bhlry,
  unreasonableInList,
}) => {
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      destroyOnClose={true}
      width={400}
      className={styles.drawerWrapper}
    >
      <div className={styles.yjWrapper}>
        <div className={styles.yjHeader}>预警详情</div>
        <div className={styles.yjBody}>
          {fyyj && (
            <div>
              <header>
                <RedAlert
                  style={{
                    fontSize: 14,
                    margin: '2px 4px 0px 0px',
                    color: '#E02020',
                  }}
                />
                {`费用预警：${fyyj}`}
              </header>
              <main className={styles.yjListfyyj}>
                {feePredictWarnList.map((item, index) => (
                  <div key={index}>
                    <div>{item.code}</div>
                    {item.messageList?.map((ite, idx) => (
                      <div key={idx}>{ite}</div>
                    ))}
                  </div>
                ))}
              </main>
            </div>
          )}
          {zkwt > 0 && (
            <div>
              <header>
                <ProblemCase
                  style={{
                    fontSize: 14,
                    margin: '2px 4px 0px 0px',
                    color: 'orange',
                  }}
                />
                {`${zkwt}条病历质控问题`}
              </header>
              <main className={styles.yjListzkwt}>
                {qualityControlList.map((item, index) => (
                  <div key={index}>
                    <Tooltip title={zkwtIcon[item.serious].tooltip}>
                      <Icon
                        type="exclamation-circle"
                        theme="filled"
                        style={{
                          verticalAlign: 'top',
                          marginTop: 3,
                          color: zkwtIcon[item.serious].color,
                        }}
                      />
                    </Tooltip>
                    <div>
                      <span>{item.result}：</span>
                      <span>{item.reason}</span>
                      <p>影响：{item.effect}</p>
                    </div>
                  </div>
                ))}
              </main>
            </div>
          )}
          {bhlry > 0 && (
            <div>
              <header>
                <UnreasonHospital
                  style={{
                    fontSize: 14,
                    margin: '2px 4px 0px 0px',
                    color: '#3367d6',
                  }}
                />
                {`${bhlry}条不合理入院`}
              </header>
              <main className={styles.yjListbhlry}>
                {unreasonableInList.map((item, index) => (
                  <div key={index}>{item.message};</div>
                ))}
              </main>
            </div>
          )}
        </div>
        <div className={styles.yjFooter}>
          <div></div>
          <Button onClick={onClose}>关闭</Button>
        </div>
      </div>
    </Drawer>
  );
};

export default YjDetail;
