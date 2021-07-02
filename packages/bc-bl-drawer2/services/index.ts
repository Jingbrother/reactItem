import request from 'umi-request';

// 模拟主诊主手 - 在院
export function getInHospitalSimulation(params) {
    return request('inhospital/v1/forecastInfo', {
        params,
    });
}
// // 模拟主诊主手 - 在院 //json
// export function getInHospitalSimulation(params) {
//   return request('/firesoon/json/bc-bl-drawer/inHospitalSimulation.json', {
//     params,
//   });
// }

// 事中 - 获取详情信息
export function getDetail(params) {
    return request('inhospital/v1/patientInfoDetail', {
        params,
    });
}
// // 事中 - 获取详情信息 //json
// export function getDetail(params) {
//   return request.get('/firesoon/json/bc-bl-drawer/detail.json', {
//     params,
//   });
// }

// // 病例列表 - 获取详情信息
// export function getBlListDetail(params) {
//     return request('surplus/v1/findPatientPortrait', {
//         params
//     });
// }
// // 病例列表 - 获取详情信息 //json
export function getBlListDetail(params) {
    return request.get('/firesoon/json/bc-bl-drawer/findPatientPortrait.json', {
        params,
    });
}


// 病例列表 - 模拟分组
export function getBlDetailSimulation(params) {
    return request('surplus/v1/forecastInfo', {
        params
    });
}
// // 病例列表 - 模拟分组 //json
// export function getBlDetailSimulation(params) {
//     return request('/firesoon/json/bc-bl-drawer/BlDetailSimulation.json', {
//       params
//     });
// }
// 病例列表 - 再入院信息
export function getBlListZryList(params) {
    return request.get('/firesoon/json/bc-bl-drawer/BlListZryList.json', {
        params,
    });
}
// // 病例列表 - 再入院信息 //json
// export function getBlListZryList(params) {
//     return request('surplus/v1/BlListZryList.json', {
//       prefix: analysis,
//       params
//     });
// }

// 获取诊断信息
export function getCheckSelect(params) {
    return request('v1/diagnosisDictionary', {
        params,
    });
}

// // 获取诊断信息 //json
// export function getCheckSelect(params) {
//   return request('/firesoon/json/bc-bl-drawer/checkSelect.json', {
//     params,
//   });
// }

// 获取手术信息
export function getOperationSelect(params) {
    return request('v1/surgeryDictionary', {
        params,
    });
}

// // 获取手术信息 //json
// export function getOperationSelect(params) {
//   return request('/firesoon/json/bc-bl-drawer/operationSelect.json', {
//     params,
//   });
// }

// 查询是否有手术文书
export function getFlag(params) {
    return request('v1/findSurgeryFlag', {
        params,
    });
}

// // 查询是否有手术文书 //json
// export function getFlag(params) {
//   return request('/firesoon/json/bc-bl-drawer/flag', {
//     params,
//   });
// }

// 保存床日
export function updateBedQuitConfig(params) {
    return request.post('v1/updateBedQuitConfig', {
        data: params,
    });
}

// // 保存床日 //json
// export function updateBedQuitConfig(params) {
//   return request.post('/firesoon/json/bc-bl-drawer/updateBedQuitConfig.json', {
//     data: params,
//   });
// }
