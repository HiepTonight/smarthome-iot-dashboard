import React, { useEffect, useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";
import { utcToZonedTime } from 'date-fns-tz';
import moment from 'moment-timezone';
import { formatDistanceToNow, format } from 'date-fns';
import deleteDevice from '@/apis/Devices/DeleteDevice';
import triggerDevice from '@/apis/Devices/TriggerDevice';

const DeviceCard = ({ device, removeDevice, isEditMode, homePodId }) => {
  const [isChecked, setIsChecked] = useState(device.status === 1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsChecked(device.status === 1);
  }, [device.status]);

  const handleToggle = async () => {
    const newStatus = isChecked ? 0 : 1;
    setIsChecked(!isChecked);
    try {
      await triggerDevice(device.id, homePodId);
      console.log('Device triggered:', device.id, homePodId);
    } catch (error) {
      console.error('Error triggering device:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDevice(device.id);
      removeDevice(device.id);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  const updatedAt = moment(device.updatedAt).tz('Asia/Ho_Chi_Minh');
  const isDeviceOn = device.status === 1;
  const timeZone = 'Asia/Ho_Chi_Minh';
  const currentTime = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');

  console.log(`Current time in ${timeZone}: ${currentTime}`);
  const timeText = isChecked
  ? `${moment().tz(timeZone).fromNow()}`
  : `${moment().tz(timeZone).format('MMM DD, YYYY, hh:mm:ss A')}`;

  return (
    <div className='flex flex-col justify-around items-center bg-[#272a30] rounded-xl shadow-lg p-4 relative'>
    <button
      onClick={handleDelete}
      className={`flex justify-center items-center absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      <IoTrashOutline />
    </button>
    <div className='flex justify-between w-full px-4'>
      <div className={`transition-colors duration-500 ${isChecked ? 'text-green-500' : 'text-gray-400'}`}>
        {isChecked ? 'ON' : 'OFF'}
      </div>
      <Switch checked={isChecked} onCheckedChange={handleToggle} />
    </div>
    <div className='flex justify-center items-center mt-4 bg-[#373b41] rounded-full p-2 w-20 h-20'>
      <span className='text-3xl'>{React.createElement(device.icon)}</span>
    </div>
    <div className='mt-4 flex flex-col mt-2 justify-around items-center gap-1'>
      <h2>{device.name}</h2>
      <div className='flex items-center gap-2'>
        <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${isChecked ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
        <p className='font-light text-gray-400'>{timeText}</p>
      </div>
    </div>
  </div>
  );
};

export default DeviceCard;