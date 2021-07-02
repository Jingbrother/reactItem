import React from 'react';

export const formatTypeInfo = (ycInfo, type) => {
  const { groupInfo = {} } = ycInfo;
  const result = {
    normal: (
      <>
        <div>
          <label>基准点数：</label>
          <span>{groupInfo.basePoint}</span>
        </div>
        <div>
          <label>病组调整系数：</label>
          <span>{groupInfo.bzxs}</span>
        </div>
      </>
    ),
    quota: (
      <div>
        <label>定额标准：</label>
        <span>{groupInfo.quato}</span>
      </div>
    ),
    bedDay: (
      <div>
        <p>日基准点数：</p>
        {groupInfo.basePointDay?.length > 0 ? (
          groupInfo.basePointDay.map((item, index) => (
            <p key={index}>{`${item.rule}${
              item.point == null ? '' : `，${item.point}`
            }`}</p>
          ))
        ) : (
          <div style={{ color: '#666' }}>暂无</div>
        )}
      </div>
    ),
  };
  return result[type];
};

export const description =
  '手术、操作文书已填写，但手术记录、手术编码缺失。为保证分组准确性，请及时补充手术记录及手术编码';
