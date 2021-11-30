import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import notifee, { TimestampTrigger, TriggerType, AndroidCategory, AndroidImportance, EventType } from '@notifee/react-native';


notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  console.log('BACKGROUND EVENT', type, detail);
});


const App = () => {
  useEffect(() => {
    async function boot() {
      const scheduled = await notifee.getTriggerNotifications();
      console.log('### SCHEDULED NOTIFICATIONS ##', scheduled);
    }
    boot()
  }, [])

  const onCreateNotification = async (min) => {
    const date = new Date(Date.now());
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes() + min); // 2 minutes from now
    date.setSeconds(0)
    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire in 1 minute
      alarmManager: true
    };
    await notifee.createChannel({
      id: '123',
      name: '123',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: '123',
        },
      },
      trigger,
    );
    console.log(date)
  }

  return (
    <SafeAreaView>
      <TouchableOpacity style={{ marginTop: 50 }} onPress={() => onCreateNotification(1)}><Text>Create Schuduled Notification(fires in 1min)</Text></TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 50 }} onPress={() => onCreateNotification(2)}><Text>Create Schuduled Notification(fires in 2min)</Text></TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 50 }} onPress={() => onCreateNotification(3)}><Text>Create Schuduled Notification(fires in 3min)</Text></TouchableOpacity>
    </SafeAreaView>
  );
};


export default App;
