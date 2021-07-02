---
title: bc-bl-drawer(病例详情)
nav:
  title: 组件
  path: /component
group:
  title: 组件
  path: /components
---

# bc-bl-drawer(病例详情)

病例详情抽屉组件

## 下载

```
$ yarn add @firesoon/bc-bl-drawer
or
$ npm i @firesoon/bc-bl-drawer
```

## 代码演示

### 基础用法

<code src="../packages/bc-bl-drawer/demo/index.tsx" />

## API

通用 API

| 属性          | 说明                                     | 类型               | 默认值   | 必填 |
| ------------- | ---------------------------------------- | ------------------ | -------- | ---- |
| visible       | 抽屉显示隐藏状态                         | `boolean`          | false    | 是   |
| onClose       | 抽屉点击关闭的回调函数                   | `(e: any) => void` | --       | 是   |
| pid           | 病历 ID                                  | `number`           | --       | 是   |
| zryDays       | 再入院天数                               | `number`           | --       | 是   |
| api           | 病例详情所需要请求的接口(详情查看`IApi`) | `object(IApi)`     | --       | 是   |
| timeType      | 出院时间或入院时间                       | `string`           | 入院时间 | 否   |
| hasDetail     | 是否有病例明细                           | `boolean`          | false    | 否   |
| hasLabel      | 是否展示已编码、未编码标签               | `boolean`          | true     | 否   |
| hasYj         | 是否显示有问题病例标签                   | `boolean`          | true     | 否   |
| patientStatus | 病人状态                                 | `any`              | null     | 否   |
| showBedDay    | 是否显示床日预测开关                     | `boolean`          | true     | 否   |

### IApi

api 所需要传递的接口信息
| 属性 | 说明 | 类型 | 默认值 | 必填 |
| ------------- | ----------------------- | ------------------------ | ------ | ---- |
| detailAPI | 病例列表 - 获取详情信息 | `(params?: any) => void` | -- | 是 |
| mockDetailAPI | 病例列表 - 模拟分组 | `(params?: any) => void` | -- | 是 |
| flagAPI | 查询是否有手术文书 | `(params?: any) => void` | -- | 是 |
| diagsAPI | 获取诊断信息 | `(params?: any) => void` | -- | 是 |
| operasAPI | 获取手术信息 | `(params?: any) => void` | -- | 是 |
| updateBedAPI | 保存床日 | `(params?: any) => void` | -- | 是 |
| zryListAPI | 病例列表 - 再入院信息 | `(params?: any) => void` | -- | 是 |
