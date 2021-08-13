import React from 'react';

import EntrySummaryChart from './EntrySummaryChart';
import EntrySummaryList from './EntrySummaryList';
import Container from '../Core/Container';

const EntrySummary = ({navigation, onPressActionButton}) => {
  return (
    <Container
      title="Categorias"
      actionLabelText="Últimos 7 dias"
      actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}>
      <EntrySummaryChart />
      <EntrySummaryList />
    </Container>
  );
};

export default EntrySummary;
