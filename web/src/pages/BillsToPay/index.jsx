import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import api from '~/services/api';
import Layout from '../../component/Layout';

import Styles from './style';

const columns = [
  { field: 'name', headerName: 'Nome', width: 140 },
  { field: 'originalValue', headerName: 'Valor Original', width: 140 },
  {
    field: 'dueDate',
    headerName: 'Vencimento',
    type: 'date',
    width: 140,
  },
  {
    field: 'payDay',
    headerName: 'Pagamento',
    type: 'date',
    width: 140,
  },
  { field: 'correctedValue', headerName: 'Valor Corrigido', width: 150 },
  {
    field: 'numberOfDaysLate',
    headerName: 'Dias em atraso',
    type: 'number',
    width: 150,
  },
  {
    field: 'delayRate',
    headerName: 'Multa',
    type: 'number',
    width: 140,
  },
  {
    field: 'interestDay',
    headerName: 'Juros/Mora',
    type: 'number',
    width: 140,
  },
];

export default function Profile() {
  const [billToPaymenties, setBillToPaymenties] = useState([]);

  useEffect(() => {
    api.get('bills-to-pay').then((res) => {
      setBillToPaymenties(res.data);
    });
  }, []);

  const classes = Styles();

  return (
    <Layout>
      <Grid
        container
        spacing={2}
        item
        md={12}
        justify="flex-start"
        className={classes.wrapper}
      >
        <Grid item md={9} className={classes.title}>
          <h2>Lista de Contas a pagar</h2>
        </Grid>
        <Grid item md={3}>
          <Link className="button" to="/new">
            Cadastrar conta a pagar
          </Link>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            justify="flex-end"
            alignItems="flex-start"
            style={{ background: '#fff' }}
          >
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={billToPaymenties.map((item, index) => {
                  return {
                    id: index,
                    name: item.name,
                    originalValue: item.originalValue,
                    dueDate: item.dueDate,
                    payDay: item.payDay,
                    correctedValue: item.correctedValue,
                    numberOfDaysLate: item.numberOfDaysLate,
                    delayRate: item.delayRate,
                    interestDay: item.interestDay,
                  };
                })}
                columns={columns}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

Profile.defaultProps = {
  title: 'Fale com<br />o Minu.club!',
  text: 'Sua opinião é muito importante<br />para nossa evolução!',
  description:
    'Se ainda tiver dúvidas fale com a<br />gente pelo <strong>Chat</strong> ou entre em contato com<br />nosso time de atendimento pelo e-mail:<br /><strong>atendimento@minu.club</strong>',
};

Profile.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
};
