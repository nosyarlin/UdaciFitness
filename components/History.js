// import React from 'react';
// import { connect } from 'react-redux';
// import { View, Text } from 'react-native';
// import { receiveEntries, addEntry } from '../actions';
// import { timeToString, getDailyReminderValue } from '../utils/helpers';
// import { fetchCalendarResults } from '../utils/api';
// import UdaciFitnessCalendar from 'udacifitness-calendar';

// function mapStateToProps(entries) {
//   return {
//     entries,
//   };
// }

// export class History extends React.Component {
//   componentDidMount() {
//     const { dispatch } = this.props;
//     fetchCalendarResults()
//       .then((entries) => dispatch(receiveEntries(entries)))
//       .then(({ entries }) => {
//         if (!entries[timeToString()]) {
//           dispatch(addEntry({
//             [timeToString()]: getDailyReminderValue(),
//           }))
//         }
//       });
//   }

//   renderItem = ({ today, ...metrics }, formattedDate, key) => (
//     <View>
//       {today
//         ? <Text>{JSON.stringify(today)}</Text>
//         : <Text>{JSON.stringify(metrics)}</Text>
//       }
//     </View>
//   );

//   renderEmptyDate = (formattedDate) => {
//     return (
//       <View>
//         <Text>No Date for this day</Text>
//       </View>
//     );
//   }

//   render() {
//     const { entries } = this.props;
//     return (
//       <UdaciFitnessCalendar
//         items={entries}
//         renderItem={this.renderItem}
//         renderEmptyDate={this.renderEmptyDate}
//       />
//     );
//   }
// }

// export default connect(
//   mapStateToProps,
// // Implement map dispatch to props
// )(History)
