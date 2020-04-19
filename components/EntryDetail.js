import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import TextButton from'./TextButton';

function mapStatetoProps(state, { navigation, route }) {
  const { entryId } = route.params;
  return {
    entryId,
    navigation,
    metrics: state[entryId],
  }
}

function mapDispatchToProps(dispatch, { navigation, route }) {
  const { entryId } = route.params;
  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null,
    })),
    goBack: () => navigation.goBack(),
  }
}

class EntryDetail extends React.Component {
  reset = () => {
    const { remove, entryId, goBack } = this.props;
    remove();
    goBack();
    removeEntry(entryId);
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const { navigation, entryId, metrics } = this.props;
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);
    navigation.setOptions({ title: `${day}/${month}/${year}` });

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics}/>
        <TextButton onPress={this.reset} style={{margin: 20}}>
          Reset
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(EntryDetail);

