import React, { useState } from 'react';
import BlDrawer from '../dist';
import {
  getBlListDetail,
  getFlag,
  getCheckSelect,
  getOperationSelect,
  getBlDetailSimulation,
  updateBedQuitConfig,
  getBlListZryList,
} from '../services';
import { Button } from '@firesoon/ant-ui';

const Demo1: React.FC<any> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(!visible)}>
        病例详情
      </Button>
      {visible && (
        <BlDrawer
          visible={visible}
          pid={1}
          zryDays={12}
          hasDetail={true}
          onClose={() => setVisible(false)}
          api={{
            detailAPI: getBlListDetail,
            mockDetailAPI: getBlDetailSimulation,
            flagAPI: getFlag,
            diagsAPI: getCheckSelect,
            operasAPI: getOperationSelect,
            updateBedAPI: updateBedQuitConfig,
            zryListAPI: getBlListZryList,
          }}
        />
      )}
    </>
  );
};
export default Demo1;
