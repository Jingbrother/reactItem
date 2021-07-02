import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import styles from './index.less';
import { Select } from '@firesoon/ant-ui';
import { debounce } from 'lodash';
import classname from 'classname';

const Index = ({
  visible,
  onClose,
  onSelect,
  changeMode,
  diagSelect,
  operaSelect,
  mainDiagnosis,
  mainSurgery,
  api,
  isSubmit,
}) => {
  const [check, setCheck] = useState<any>();
  const [operation, setOperation] = useState<any>();
  const [checkSearch, setCheckSearch] = useState([]);
  const [operationSearch, setOperationSearch] = useState([]);
  const { diagsAPI, operasAPI } = api;
  // console.log('check', check, mainDiagnosis);

  useEffect(() => {
    setCheck({ ...mainDiagnosis });
  }, [mainDiagnosis]);

  useEffect(() => {
    setOperation({ ...mainSurgery });
  }, [mainSurgery]);

  const onCheckSelect = index => {
    const option = checkSearch[index];
    onSelect({ mainDiagnosis: option });
    setCheck(option);
  };
  const onOperationSelect = index => {
    const option = operationSearch[index];
    onSelect({ mainSurgery: option });
    setOperation(option);
  };

  const onCheckSearch = async value => {
    const { data, httpCode } = await diagsAPI({ search: value, isSubmit });

    if (httpCode === 200) {
      setCheckSearch(data);
    }
  };
  const onOperationSearch = async value => {
    const { data, httpCode } = await operasAPI({ search: value, isSubmit });

    if (httpCode === 200) {
      setOperationSearch(data);
    }
  };

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      destroyOnClose={true}
      placement={'bottom'}
      getContainer={false}
      className={styles.drawerWrapper}
      style={{ position: 'absolute' }}
    >
      <div className={styles.simulationWrapper}>
        <div className={styles.simulationHeader}>模拟主诊主手</div>
        <div className={styles.simulationBody}>
          <div className={styles.simulationSelect}>
            <div>
              <header>当前主要诊断</header>
              <Select
                value={
                  check && check.diagnosisName && check.diagnosisCode
                    ? `${check.diagnosisName} (${check.diagnosisCode})`
                    : '无'
                }
                hasAll={false}
                onSelect={onCheckSelect}
                onSearch={debounce(onCheckSearch, 500)}
                hideLabel={true}
                wrapClassName={styles.simulationSelectWrapper}
                // loading={checkSelectLoading}
              >
                {checkSearch.map((item, index) => (
                  <Select.Option value={index} key={index}>
                    {item.diagnosisName}({item.diagnosisCode})
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className={styles.simulationList}>
              {diagSelect.map((item, index) => (
                <div key={index}>
                  <header>{item.name}</header>

                  {item.list.map((diag, idx) => (
                    <div
                      key={idx}
                      className={classname(styles.simulationItem, {
                        [styles.simulationActive]:
                          check && diag.diagnosisCode === check.diagnosisCode,
                      })}
                      onClick={() =>
                        onSelect({
                          mainDiagnosis: {
                            diagnosisName: diag.diagnosisName,
                            diagnosisCode: diag.diagnosisCode,
                            diagnosisTypeName: item.diagnosisTypeName,
                          },
                        })
                      }
                    >
                      <span>{(idx + 1).toString().padStart(2, '0')}</span>
                      <span>{`${diag.diagnosisName} (${diag.diagnosisCode})`}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.simulationSelect}>
            <div>
              <header>当前主要手术</header>
              <Select
                value={
                  operation && operation.surgeryName && operation.surgeryCode
                    ? `${operation.surgeryName} (${operation.surgeryCode})`
                    : '无'
                }
                hasAll={false}
                onSelect={onOperationSelect}
                onSearch={debounce(onOperationSearch, 500)}
                hideLabel={true}
                wrapClassName={styles.simulationSelectWrapper}
                // loading={operationSearchLoading}
              >
                {operationSearch.map((item, index) => (
                  <Select.Option value={index} key={index}>
                    {item.surgeryName}({item.surgeryCode})
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className={styles.simulationList}>
              {operaSelect.map((item, index) => (
                <div key={index}>
                  <header>第 {item.name ?? '-'} 组</header>
                  {item.list.map((opera, idx) => (
                    <div
                      key={idx}
                      className={classname(
                        styles.simulationItem,
                        operation &&
                          opera.surgeryCode === operation.surgeryCode &&
                          styles.simulationActive,
                      )}
                      onClick={() =>
                        onSelect({
                          mainSurgery: {
                            surgeryName: opera.surgeryName,
                            surgeryCode: opera.surgeryCode,
                            groupNo: opera.groupNo,
                          },
                        })
                      }
                    >
                      <span>{(idx + 1).toString().padStart(2, '0')}</span>
                      <span>{`${opera.surgeryName} (${opera.surgeryCode})`}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.simulationFooter}>
          <span>
            自定义主诊主手进行模拟预测分组，系统支持预览但不保存模拟信息
          </span>
          <div>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={changeMode}>
              预览分组
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
export default Index;
