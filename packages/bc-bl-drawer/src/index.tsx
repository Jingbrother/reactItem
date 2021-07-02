import { Drawer, Spin } from 'antd';
import { Button } from '@firesoon/ant-ui';
import React, { useCallback, useEffect } from 'react';
import { useSetState } from 'ahooks';
import Header from './Header';
import YjGroup from './YjGroup';
import CostProgress from './CostProgress';
import {
  fomratProps,
  formatCardProps,
  formatDiagSelect,
  formatOperaSelect,
  getCurrentInfo,
} from './config';
import Simulation from './Simulation';
import ZryDrawer from './ZryDrawer';
import Card from './Card';
import noDrg from './assets/no-drg.png';

import styles from './index.less';
import { SETTLE_TYPE } from './constant';

interface State {
  info: any;
  loading: any;
  isMock: boolean; // 是否模拟主诊主手
  flag: boolean; // 是否有手术文书
  simulationVisible: boolean;
  params: any;
  diagAndOpera: any;
  zryVisible: boolean;
}

const Index = ({
  visible = false,
  onClose,
  api,
  pid,
  zryDays,
  timeType = '入院时间',
  hasYj = true,
  patientStatus = null,
  showBedDay = true,
  hasDetail = true, // 是否有病例明细
  hasLabel = true,
}) => {
  const {
    detailAPI,
    flagAPI,
    diagsAPI,
    operasAPI,
    mockDetailAPI,
    updateBedAPI,
    zryListAPI,
  } = api;
  const [
    {
      info,
      loading,
      isMock,
      flag,
      simulationVisible,
      params,
      diagAndOpera,
      zryVisible,
    },
    setState,
  ] = useSetState<State>({
    info: {},
    loading: {
      detailAPI: false,
    },
    isMock: false,
    flag: false,
    simulationVisible: false,
    zryVisible: false,
    params: {
      pid,
      simulationGroupFlag: false,
      patientStatus,
    },
    diagAndOpera: {
      diags: {},
      operas: {},
    },
  });

  const {
    patientInfo = {},
    readmissionStatus,
    mainSettleType,
    feePredictWarnList = [],
    qualityControlList = [],
    unreasonableInList = [],
    diagnosisDetail,
    surgeryDetail,
  } = info;

  const fetchFlag = useCallback(
    async isSubmit => {
      const params = {
        pid,
        isSubmit,
      };
      const { httpCode, data } = await flagAPI(params);

      if (httpCode === 200 && data) {
        setState({
          flag: true,
        });
      }
    },
    [flagAPI, pid, setState],
  );

  const fetchInfo = useCallback(async () => {
    const api = params.simulationGroupFlag ? mockDetailAPI : detailAPI;

    setState({
      loading: {
        detailAPI: true,
      },
    });

    try {
      const { httpCode, data } = await api(params);
      if (httpCode === 200) {
        const { patientInfo, ...rest } = data;
        const status = patientStatus ?? patientInfo?.patientStatus;

        setState(pre => {
          return {
            info: {
              ...pre.info,
              ...rest,
              patientInfo: patientInfo ?? pre.info.patientInfo ?? {},
              type: SETTLE_TYPE[rest.mainSettleType],
              patientStatus: pre.params.patientStatus ?? status,
              jsFlag: String(status) === '5', // 已结算标识
            },
            loading: {
              detailAPI: false,
            },
            // 需要保持模拟分组可选列表顺序不变
            diagAndOpera: params.simulationGroupFlag
              ? pre.diagAndOpera
              : {
                  diags: rest.diagnosisDetail,
                  operas: rest.surgeryDetail,
                },
          };
        });

        if (!rest.surgeryDetail.mainSurgery?.surgeryCode) {
          fetchFlag(patientInfo.isSubmit);
        }
      } else {
        setState({
          loading: {
            detailAPI: false,
          },
        });
      }
    } catch (error) {
      setState({
        loading: {
          detailAPI: false,
        },
      });
    }
  }, [detailAPI, mockDetailAPI, patientStatus, setState, params, fetchFlag]);

  const updateBed = async status => {
    await updateBedAPI({
      pid,
      status,
    });
  };

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo, fetchFlag]);

  const openSimulation = () => {
    setState({ simulationVisible: true });
  };

  const formatFeeWarn = () => {
    const item = feePredictWarnList.find(
      item => item.settleType === mainSettleType,
    );

    return item?.feePredictWarnList ?? [];
  };
  const selectOpt = opt => {
    const mainDiagnosis = opt.mainDiagnosis ?? diagnosisDetail.mainDiagnosis;
    const mainSurgery = opt.mainSurgery ?? surgeryDetail.mainSurgery;

    const simulation = {
      adjustDiagnosis: mainDiagnosis?.diagnosisCode,
      adjustDiagnosisName: mainDiagnosis?.diagnosisName,
      adjustSurgery: mainSurgery?.surgeryCode,
      adjustSurgeryName: mainSurgery?.surgeryName,
    };

    setState({
      params: {
        ...params,
        ...simulation,
        simulationGroupFlag: true,
        patientStatus: info.patientStatus,
      },
    });
  };
  const changeMode = () => {
    setState({
      isMock: true,
      simulationVisible: false,
    });
  };
  const resetDetail = () => {
    setState(pre => {
      const newS: any = {
        isMock: false,
        params: {
          pid,
          simulationGroupFlag: false,
          patientStatus: pre.info.patientStatus,
        },
      };

      if (simulationVisible) {
        newS.simulationVisible = false;
      }

      return newS;
    });
  };
  const changeBedDay = isCheck => {
    const mainSettleType = isCheck ? '床日结算' : '病组结算';
    setState(pre => {
      return {
        info: {
          ...pre.info,
          mainSettleType,
          type: SETTLE_TYPE[mainSettleType],
        },
      };
    });
    updateBed(isCheck ? 0 : 1);
  };
  const openZry = () => {
    setState({
      zryVisible: true,
    });
  };

  const currentInfo = getCurrentInfo(info);

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      width={650}
      destroyOnClose={true}
      className={styles.drawerWrapper}
    >
      <Spin spinning={loading.detailAPI}>
        <div className={styles.main}>
          <div className={styles.header}>
            <Header
              data={{ ...patientInfo, zryDays }}
              openZry={openZry}
              readmissionStatus={readmissionStatus}
              timeType={timeType}
            />

            {hasYj && (
              <YjGroup
                data={{
                  feePredictWarnList: formatFeeWarn(),
                  qualityControlList,
                  unreasonableInList,
                }}
              />
            )}

            {patientInfo?.caseRange === '0' && (
              <img src={noDrg} className={styles.noDrg} />
            )}
          </div>

          <div className={styles.body}>
            <CostProgress {...fomratProps(info)} />

            <Card
              {...formatCardProps(info)}
              showBedDay={showBedDay}
              isMock={isMock}
              flag={flag}
              onReset={resetDetail}
              changeBedDay={changeBedDay}
              hasDetail={hasDetail}
              hasLabel={hasLabel}
            />
          </div>

          <div className={styles.footer}>
            <div>
              {!info.jsFlag && (
                <Button type={'primary'} onClick={openSimulation}>
                  模拟主诊主手
                </Button>
              )}
            </div>

            <Button onClick={onClose}>关闭</Button>
          </div>
        </div>

        {simulationVisible && (
          <Simulation
            visible={simulationVisible}
            diagSelect={formatDiagSelect(diagAndOpera.diags)}
            operaSelect={formatOperaSelect(diagAndOpera.operas)}
            mainDiagnosis={diagnosisDetail?.mainDiagnosis}
            mainSurgery={surgeryDetail?.mainSurgery}
            onClose={resetDetail}
            onSelect={selectOpt}
            api={{ diagsAPI, operasAPI }}
            changeMode={changeMode}
            isSubmit={patientInfo.isSubmit}
          />
        )}

        {zryVisible && (
          <ZryDrawer
            visible={zryVisible}
            close={() => setState({ zryVisible: false })}
            data={{
              pid,
              patientStatus,
              primaryCheck: diagnosisDetail.mainDiagnosis,
              name: currentInfo.drgName,
              code: currentInfo.drgCode,
            }}
            zryDays={zryDays}
            api={zryListAPI}
          />
        )}
      </Spin>
    </Drawer>
  );
};

export default Index;
