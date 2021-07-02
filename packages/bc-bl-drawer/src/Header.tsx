import React from 'react';
import { Tag } from '@firesoon/ant-ui';
import { Divider, Icon } from 'antd';
import styles from './index.less';

type IData = {
  name: string;
  sex: string;
  age: number | string;
  bedNo: string;
  readmissionStatus?: boolean;
  zryDays: number | string;
  inpNo: string;
  empiId: string;
  doctorName: string;
  ryrq?: string;
  cyrq?: string;
  insuranceNatureName: string;
};

interface HeaderP {
  data: IData;
  timeType: string;
  openZry?: () => void;
  readmissionStatus: boolean;
}

const Header = ({
  data = {} as IData,
  readmissionStatus,
  openZry,
  timeType,
}: HeaderP) => {
  return (
    <>
      <div className={styles.title}>
        <span>{data.name ?? '-'}</span>
        <Divider type="vertical"></Divider>
        <span>{data.sex ?? '-'}</span>
        <Divider type="vertical"></Divider>
        <span>{data.age ?? '-'}</span>
        <Divider type="vertical"></Divider>
        <span>床位号：{data.bedNo ?? '-'}</span>
        <Divider type="vertical"></Divider>
        <span>{data.insuranceNatureName ?? '-'}</span>

        {readmissionStatus && (
          <Tag onClick={openZry} className={styles.tag}>
            {`${data.zryDays}天再入院`}
            <Icon type="right" style={{ marginLeft: 4 }} />
          </Tag>
        )}
      </div>
      <div className={styles.subTitle}>
        <span>住院号：{data.inpNo ?? '-'}</span>
        <span>患者ID：{data.empiId ?? '-'}</span>
        <span>主治医生：{data.doctorName ?? '-'}</span>
        <span>
          {timeType}：{timeType === '入院时间' ? data.ryrq : data.cyrq}
        </span>
      </div>
    </>
  );
};

export default Header;
