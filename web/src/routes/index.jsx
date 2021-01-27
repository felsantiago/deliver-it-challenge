import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import BillsToPay from '~/pages/BillsToPay';
import NewBillsToPay from '~/pages/NewBillsToPay';
import NotFound from '../pages/404';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={BillsToPay} />
      <Route path="/new" component={NewBillsToPay} />

      <Route path="/" component={() => <NotFound />} />
    </Switch>
  );
}
