import React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';
import { max } from 'lodash';

const avgCost = {
  3: {
    key: 'hosDrgAvgCost',
    name: '本院病组均费',
  },
  4: {
    key: 'areaDrgAvgCost',
    name: '地区病组均费',
  },
};

const Index = ({
  cost,
  divider,
  tooltip,
  error,
  color,
  jsFlag = true,
  progressBar,
}) => {
  const [first, setFirst] = useState<{ name?: string; percent?: number }>({});
  const [second, setSecond] = useState<{ name?: string; percent?: number }>({});
  const [avg, setAvg] = useState<{ name?: string; percent?: number }>({});
  const [now, setNow] = useState(0);
  const [placement, setPlacement] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let total = 0;
    const avg = avgCost[progressBar] ? divider[avgCost[progressBar].key] : 0;
    const minP = 0;

    switch (progressBar) {
      case '1': // 病组结算-超支结余控费-费用预警
        total = divider.high * 1.3;
        setFirst({
          name: `低倍界值：${divider.low}`,
          percent: Number((divider.low / total).toFixed(4)) * 100,
        });

        setSecond({
          name: `高倍界值：${divider.high}`,
          percent: Number((divider.high / total).toFixed(4)) * 100,
        });
        setAvg({});
        break;

      case '2': // 病组结算-超支结余控费-住院日预警
        total = divider.highDay * 1.2;

        setFirst({
          name: `平均住院日低倍界值：${divider.lowDay}`,
          percent: Number((divider.lowDay / total).toFixed(4)) * 100,
        });
        setSecond({
          name: `平均住院日高倍界值：${divider.highDay}`,
          percent: Number((divider.highDay / total).toFixed(4)) * 100,
        });
        setAvg({});
        break;

      case '3': // 病组结算-目标费用区间-本院均费
      case '4': // 病组结算-目标费用区间-地区均费
        // minP = min([divider.lowTarget, avg]) / 1.09;

        total = (max([divider.highTarget, avg]) - minP) * 1.3;
        // console.log('minP', minP, 'total', total);

        setFirst({
          name: `目标下限：${divider.lowTarget}`,
          percent:
            Number(((divider.lowTarget - minP) / total).toFixed(4)) * 100,
        });
        setSecond({
          name: `目标上限：${divider.highTarget}`,
          percent:
            Number(((divider.highTarget - minP) / total).toFixed(4)) * 100,
        });
        setAvg({
          name: `${
            avgCost[progressBar] ? avgCost[progressBar].name : ''
          }：${avg}`,
          percent: Number(((avg - minP) / total).toFixed(4)) * 100,
        });
        break;
      case '5': // 床日结算
        total = divider.yjjs * 2;
        setFirst({
          name: `${jsFlag ? '' : '预计'}结算金额：${divider.yjjs}`,
          percent: 50,
        });
        setSecond({});
        setAvg({});
        break;
      case '6': // 定额结算
        total = divider.quato * 2;
        setFirst({
          name: `定额标准：${divider.quato}`,
          percent: 50,
        });
        setSecond({});
        setAvg({});
        break;
      default:
        break;
    }

    setNow(Number(((cost - minP) / total).toFixed(4)) * 100);
  }, [cost, divider, jsFlag, progressBar]);

  useEffect(() => {
    if (!isNaN(now)) {
      setPlacement(now > 50 ? 'topRight' : 'topLeft');
      setVisible(true);
    }
  }, [now, first]);

  const toggleVisible = () => {
    if (!isNaN(now)) {
      setVisible(!visible);
    }
  };

  function judgeNowRange() {
    let num = now;
    let offset = '+ 0px';

    if (now < 0) {
      num = 0;
    }
    if (now > 100) {
      num = 100;
    }

    if (num > 50 && num <= 100) {
      offset = '+ 8px';
    } else if (num > 0) {
      offset = '- 12px';
    }

    return {
      num,
      offset,
    };
  }

  const isAvg = progressBar === '3' || progressBar === '4';
  const { num, offset } = judgeNowRange();

  return (
    <div
      className={styles.progressWrapper}
      id="Progress"
      onClick={toggleVisible}
    >
      {error ? (
        <>
          <div className={styles.progressOuter}></div>
          <div
            style={{
              position: 'absolute',
              top: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#666',
            }}
          >
            {error}
          </div>
        </>
      ) : (
        <>
          <div className={styles.progressOuter}></div>

          <div
            className={`${styles.progressBody} ${styles.avgProgress}`}
            style={{
              width: `${num}%`,
              backgroundColor: color || '#3367D6',
            }}
          ></div>

          <Tooltip
            title={tooltip}
            placement={placement}
            visible={visible}
            getPopupContainer={() => document.querySelector('#Progress')}
            overlayClassName={styles.progressTooltipWrapper}
          >
            <div
              className={styles.progressTooltip}
              style={{
                left: `calc(${num}% ${offset})`,
              }}
            ></div>
          </Tooltip>

          {first.percent != null && (
            <>
              <div
                className={styles.progressDashed}
                style={{ left: `${first.percent}%` }}
              ></div>
              <div
                className={styles.progressLabel}
                style={{ left: `${first.percent}%` }}
              >
                {first.name}
              </div>
            </>
          )}
          {second.percent != null && (
            <>
              <div
                className={`${styles.progressDashed} ${styles.avgSecDashed}`}
                style={{ left: `${second.percent}%` }}
              ></div>
              <div
                className={`${styles.progressLabel} ${styles.avgSecLabel}`}
                style={{ left: `${second.percent}%` }}
              >
                {second.name}
              </div>
            </>
          )}
          {avg.percent != null && (
            <>
              <div
                className={`${styles.progressDashed} ${styles.avgDashed}`}
                style={{ left: `${avg.percent}%`, height: 22, top: 58 }}
              ></div>
              <div
                className={styles.progressLabel}
                style={{ left: `${avg.percent}%`, top: 33 }}
              >
                {avg.name}
              </div>
            </>
          )}

          {(progressBar === '1' || progressBar === '2') && first && second && (
            <>
              <div
                className={styles.progressNormal}
                style={{ left: 0, width: `${first.percent}%` }}
              >
                低倍病例区间
              </div>
              <div
                className={styles.progressNormal}
                style={{
                  left: `${first.percent}%`,
                  width: `${second.percent - first.percent}%`,
                }}
              >
                正常病例区间
              </div>
              <div
                className={styles.progressNormal}
                style={{
                  left: `${second.percent}%`,
                  width: `${100 - second.percent}%`,
                }}
              >
                高倍病例区间
              </div>
            </>
          )}

          {isAvg && first && second && (
            <>
              <div
                className={styles.progressNormal}
                style={{ left: 0, width: `100%` }}
              >
                目标控费区间
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
