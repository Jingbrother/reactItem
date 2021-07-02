import React from 'react';
import { Drawer } from 'antd';
import styles from './index.less';
import { Button } from '@firesoon/ant-ui';
import { useCallback, useEffect, useState } from 'react';
import noDrg from '../assets/no-drg.png';

interface ZryDrawerProps {
  visible: boolean;
  close: () => void;
  zryDays: number;
  data: any;
  api: (params: any) => any;
}

const Index = ({ visible, close, zryDays, data, api }: ZryDrawerProps) => {
  const [zryList, setZryList] = useState([]);
  const { pid, patientStatus, primaryCheck, name, code } = data;

  const fetchList = useCallback(
    async function() {
      const { httpCode, data } = await api({ pid, patientStatus });

      if (httpCode === 200) {
        const list = formatList(data ?? []);

        setZryList(list);
      }
    },
    [api, pid, patientStatus],
  );

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  function formatList(list = []) {
    return list.map(item => ({
      ryTime: item.ryrq,
      cyTime: item.cyrq,
      days: item.bedDays,
      inpNo: item.inpNo,
      pid: item.pid,
      ks: item.departmentName,
      drgCode: item.drgCode,
      drgName: item.drgName,
      caseId: item.caseId,
      caseRange: item.caseRange,
      primaryCheck: item.diagnosisDetail?.mainDiagnosis && {
        name: item.diagnosisDetail.mainDiagnosis.diagnosisName,
        code: item.diagnosisDetail.mainDiagnosis.diagnosisCode,
      },
      otherCheck: item.diagnosisDetail?.secondDiagnosisList?.map(ite => ({
        name: ite.diagnosisName,
        code: ite.diagnosisCode,
      })),
      primaryOperation: item.surgeryDetail?.mainSurgery && {
        name: item.surgeryDetail.mainSurgery.surgeryName,
        code: item.surgeryDetail.mainSurgery.surgeryCode,
      },
      otherOperation: item.surgeryDetail?.secondSurgeryList?.map(ite => ({
        name: ite.surgeryName,
        code: ite.surgeryCode,
      })),
    }));
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      destroyOnClose={true}
      width={500}
      className={styles.drawerWrapper}
    >
      <div className={styles.zryWrapper}>
        <div className={styles.zryHeader}>
          <span>{zryDays}天再入院信息</span>
          <span>*红色表示与当前入院信息一致</span>
        </div>

        <div className={styles.zryBody}>
          {zryList?.map((item, index) => (
            <div key={index}>
              <header>
                <span>{`入院时间：${item.ryTime || '-'}`}</span>
                <span>{`出院时间：${item.cyTime || '-'}`}</span>
                <span>{`住院天数：${item.days || '-'}`}</span>
              </header>
              <main>
                <header>
                  <span>
                    <span>住院号：</span>
                    <span>{item.inpNo || '-'}</span>
                  </span>
                  <span>
                    <span>病案号：</span>
                    <span>{item.caseId || '-'}</span>
                  </span>
                  <span>
                    <span>科室：</span>
                    <span>{item.ks || '-'}</span>
                  </span>
                </header>
                <main>
                  <header>
                    {item.drgCode && item.drgName ? (
                      <span
                        className={
                          item.drgCode === code && item.drgName === name
                            ? styles.same
                            : ''
                        }
                      >
                        {item.drgCode} {item.drgName}
                      </span>
                    ) : (
                      <span style={{ color: 'grey' }}>暂无病组信息</span>
                    )}

                    {String(item.caseRange) === '0' && (
                      <img src={noDrg} className={styles.noDrg} />
                    )}
                  </header>
                  <main>
                    <div>
                      <span
                        className={
                          item.primaryCheck &&
                          primaryCheck &&
                          item.primaryCheck.code === primaryCheck.diagnosisCode
                            ? styles.same
                            : ''
                        }
                      >
                        主要诊断：
                      </span>
                      <span>
                        {item.primaryCheck?.code
                          ? `${item.primaryCheck.name ?? '-'} (${item
                              .primaryCheck.code ?? '-'})`
                          : '-'}
                      </span>
                    </div>
                    <div>
                      <span>其它诊断：</span>
                      <span>
                        {item.otherCheck?.length
                          ? `${item.otherCheck.reduce(
                              (pre, cur, index) =>
                                `${pre}${index !== 0 ? '；' : ''}${cur.name} (${
                                  cur.code
                                })`,
                              '',
                            )}`
                          : '-'}
                      </span>
                    </div>
                    <div>
                      <span>主要手术：</span>
                      <span>
                        {item.primaryOperation?.code
                          ? `${item.primaryOperation.name ?? '-'} (${item
                              .primaryOperation.code ?? '-'})`
                          : '-'}
                      </span>
                    </div>
                    <div>
                      <span>其他手术：</span>
                      <span>
                        {item.otherOperation?.length
                          ? `${item.otherOperation.reduce(
                              (pre, cur, index) =>
                                `${pre}${index !== 0 ? '；' : ''}${cur.name} (${
                                  cur.code
                                })`,
                              '',
                            )}`
                          : '-'}
                      </span>
                    </div>
                  </main>
                </main>
              </main>
            </div>
          ))}
        </div>

        <div className={styles.zryFooter}>
          <div></div>
          <Button onClick={close}>关闭</Button>
        </div>
      </div>
    </Drawer>
  );
};
export default Index;
