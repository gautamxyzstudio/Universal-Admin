/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NotificationMessage } from './NotificationContext.types';
import { fetchToken, messaging } from '@/firebase';
import { useRouter } from 'next/navigation';
import { onMessage, Unsubscribe } from 'firebase/messaging';
import { useSnackBarContext } from '@/providers/SnackbarProvider';

export const NotificationContext = createContext<{
  notification: NotificationMessage | null;
  notificationPermissionStatus: NotificationPermission | null;
}>({
  notification: null,
  notificationPermissionStatus: null,
});

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null); // State to store the notification permission status.
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token.
  const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
  const isLoading = useRef(false); // Ref to keep
  const { displaySnackbar } = useSnackBarContext();

  useEffect(() => {
    if ('Notification' in window) {
      loadToken();
    }
  }, []);

  async function getNotificationPermissionAndToken() {
    if (!('Notification' in window)) {
      console.info('This browser does not support desktop notification');
      return null;
    }
    if (Notification.permission === 'granted') {
      return await fetchToken();
    }
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        return await fetchToken();
      }
    }
    console.log('Notification permission not granted.');
    return null;
  }

  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;
    const token = await getNotificationPermissionAndToken();
    if (Notification.permission === 'denied') {
      setNotificationPermissionStatus('denied');
      console.info(
        '%cPush Notifications issue - permission denied',
        'color: green; background: #c7c7c7; padding: 8px; font-size: 20px'
      );
      isLoading.current = false;
      return;
    }
    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert('Unable to load token, refresh the browser');
        console.info(
          '%cPush Notifications issue - unable to load token after 3 retries',
          'color: green; background: #c7c7c7; padding: 8px; font-size: 20px'
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error('An error occurred while retrieving token. Retrying...');
      isLoading.current = false;
      await loadToken();
      return;
    }
    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return;

      console.log(`onMessage registered with token ${token}`);
      const m = await messaging();
      if (!m) return;

      // Step 9: Register a listener for incoming FCM messages.
      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== 'granted') return;

        console.log('Foreground push notification received:', payload);
        // const link = payload.fcmOptions?.link || payload.data?.link;
        if (payload.notification?.title === 'New Client Request') {
          displaySnackbar(
            'notification',
            payload.notification?.title || 'New message',
            () => {
              router.push('/clientManagement/pendingRequests');
            }
          );
        } else {
          displaySnackbar(
            'notification',
            payload.notification?.title || 'New message'
          );
        }

        const n = new Notification(
          payload.notification?.title || 'New message',
          {
            body: payload.notification?.body || 'This is a new message',
          }
        );
        n.onclick = (event) => {
          event.preventDefault();
          const link = (event.target as any)?.data?.url;
          if (link) {
            router.push(link);
          } else {
            console.log('No link found in the notification payload');
          }
        };
        // -------------------------- ------------------
      });

      return unsubscribe;
    };

    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    return () => unsubscribe?.();
  }, [token, router]);

  return (
    <NotificationContext.Provider
      value={{
        notification: null,
        notificationPermissionStatus,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
