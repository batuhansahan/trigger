import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import notifee, {
  TimestampTrigger,
  TriggerType,
  AndroidCategory,
  AndroidImportance,
  EventType,
  AndroidColor,
} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  console.log('BACKGROUND EVENT', type, detail);
});

const App = () => {
  useEffect(() => {
    async function boot() {
      const scheduled = await notifee.getTriggerNotifications();
      console.log('### SCHEDULED NOTIFICATIONS ##', scheduled);
    }
    boot();
  }, []);

  const onCreateNotification = async (sec, lights) => {
    const date = new Date().getTime() + sec * 1000;
    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date, // fire in 1 minute
      alarmManager: true,
    };
    await notifee.createChannel({
      id: '123',
      name: '123',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      lightColor: AndroidColor.PURPLE,
      lights: true,
    });

    const androidConfigWithLights = {
      channelId: '123',
      lights: [AndroidColor.PURPLE, 1000, 1000],
    };

    const androidConfigWithoutLights = {
      channelId: '123',
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: lights ? androidConfigWithLights : androidConfigWithoutLights,
      },
      trigger,
    );
    console.log(date);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{marginTop: 50}}
        onPress={() => onCreateNotification(5, false)}>
        <Text>Create Notification Without Lights(fires in 5 sec)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 50}}
        onPress={() => onCreateNotification(10, true)}>
        <Text>Create Notification With Lights(fires in 5 sec)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
