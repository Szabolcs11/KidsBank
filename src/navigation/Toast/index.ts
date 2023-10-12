import {Toast} from 'react-native-toast-message/lib/src/Toast';

type ToastType = 'success' | 'error' | 'info';

export const showToast = (type: ToastType, title: string, subtitle?: string) => {
  Toast.show({
    type: type,
    text1: title,
    text2: subtitle,
  });
};