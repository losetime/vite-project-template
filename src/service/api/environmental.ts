import { $http } from '../http'

enum Api {
  getWeatherSituation = '/person/environmentalmonitor/selectEnvironmentalLatest',
  getSevenDaysWeather = '/person/weather/selectFutureSevenDay',
  getNoiseSituation = '/person/environmentalmonitor/selectNoiseList',
  getTemperatureInfo = '/person/environmentalmonitor/selectTem',
  getHumidityInfo = '/person/environmentalmonitor/selectHumidity',
}

// -------------------------------------- 环境监测 -----------------------------------------------

/**
 * @description: 获取当天实况天气情况
 */
export function apiGetWeatherSituation() {
  return $http.request({
    url: Api.getWeatherSituation,
    method: 'POST',
  })
}

/**
 * @description: 获取七天的天气情况
 */
export function apiGetSevenDaysWeather() {
  return $http.request({
    url: Api.getSevenDaysWeather,
    method: 'GET',
  })
}

/**
 * @desc 获取温度变化
 */
export function apiGetTemperatureInfo() {
  return $http.request({
    url: Api.getTemperatureInfo,
    method: 'POST',
  })
}

/**
 * @desc 获取湿度变化
 */
export function apiGetHumidityInfo() {
  return $http.request({
    url: Api.getHumidityInfo,
    method: 'POST',
  })
}

/**
 * @description: 获取噪音情况
 */
export function apiGetNoiseSituation() {
  return $http.request({
    url: Api.getNoiseSituation,
    method: 'POST',
  })
}
