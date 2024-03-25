import React, { useState } from 'react';
import { Button, Modal, View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarButton = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setCalendarVisible(false); // Hide the calendar after selecting a date
  };

  return (
    <View style={styles.container}>
      <Button title="Open Calendar" onPress={() => setCalendarVisible(true)} />
      <Modal visible={calendarVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{ [selectedDate]: { selected: true, selectedColor: 'blue' } }}
          />
          <Button title="Close Calendar" onPress={() => setCalendarVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
});

export default CalendarButton;
