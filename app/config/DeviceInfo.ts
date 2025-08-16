import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Config } from './Config';

const devMode = () => {
  return __DEV__;
};

const getUniqueID = async () => {
  try {
    const device_id = await DeviceInfo.getUniqueId();
    console.log('device_id: ', device_id);
    return device_id;
  } catch (err) {
    console.log('err: ', err);
    return null;
  }
};

const uniqueID = getUniqueID();

const DeviceData = {
  device_id: uniqueID,
  app_version: DeviceInfo.getVersion(),
  region: Config.region,
  language: Config.language,
  os: Platform.OS,
  os_version: DeviceInfo.getSystemVersion() || Platform.Version,
  deviceIdentifier: DeviceInfo.getDeviceId(),
  deviceModel: DeviceInfo.getModel(),
  deviceBrand: DeviceInfo.getBrand(),
  deviceIsTablet: DeviceInfo.isTablet(),
  deviceType: DeviceInfo.getDeviceType(),
};

const getDeviceData = () => {
  return DeviceData;
};

export {devMode, DeviceData, getDeviceData};
