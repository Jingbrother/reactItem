import React, { useState } from 'react';
import { Icon } from 'antd';
import { Button } from '@firesoon/ant-ui';
import { RedAlert, ProblemCase, UnreasonHospital } from '@firesoon/icons-react';
import YjDetail from './YjDetail';
import styles from './index.less';

const YjGroup = ({
  data = {
    feePredictWarnList: [],
    qualityControlList: [],
    unreasonableInList: [],
  },
}) => {
  const [visible, setVisible] = useState(false);
  const fyyj = data.feePredictWarnList.map(item => item.code).join('/');
  const zkwt = data.qualityControlList.length;
  const bhlry = data.unreasonableInList.length;

  const openYj = () => setVisible(true);

  return (
    <div className={styles.detailHeaderYj}>
      {fyyj && (
        <Button className={'fyyj'} onClick={openYj}>
          <RedAlert
            style={{
              fontSize: 14,
              margin: '2px 4px 0px 0px',
              color: '#E02020',
            }}
          />
          费用预警：{fyyj} <Icon type="right" />
        </Button>
      )}
      {zkwt > 0 && (
        <Button className={'zkwt'} onClick={openYj}>
          <ProblemCase
            style={{ fontSize: 14, margin: '2px 4px 0px 0px', color: 'orange' }}
          />
          {zkwt}条病历质控问题 <Icon type="right" />
        </Button>
      )}
      {bhlry > 0 && (
        <Button className={'bhlry'} onClick={openYj}>
          <UnreasonHospital
            style={{
              fontSize: 14,
              margin: '2px 4px 0px 0px',
              color: '#3367d6',
            }}
          />
          {bhlry}条不合理入院 <Icon type="right" />
        </Button>
      )}

      {visible && (
        <YjDetail
          visible={visible}
          onClose={() => setVisible(false)}
          fyyj={fyyj}
          zkwt={zkwt}
          bhlry={bhlry}
          {...data}
        />
      )}
    </div>
  );
};

export default YjGroup;
