import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Config } from './Config';

const devMode = () => {
  return __DEV__;
};


const getUniqueID = async () => {
  try {
    let device_id = null;

    if (Platform.OS === 'android') {
      device_id = Application.getAndroidId();
    } else if (Platform.OS === 'ios') {
      device_id = await Application.getIosIdForVendorAsync();
    }

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
  app_version: Application.nativeApplicationVersion,
  region: Config.region,
  language: Config.language,
  os: Platform.OS,
  os_version: Device.osVersion,
  deviceIdentifier: Device.deviceName, 
  deviceModel: Device.modelName,
  deviceBrand: Device.brand,
  deviceIsTablet: Device.deviceType === Device.DeviceType.TABLET,
  deviceType: Device.deviceType,
};

const getDeviceData = () => {
  return DeviceData;
};

export { DeviceData, devMode, getDeviceData };
