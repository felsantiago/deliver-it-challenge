import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Container, Content, Section, FormIncident } from './styles';
import history from '../../services/history';
import CurrencyInput from 'react-currency-input-field';

import api from '../../services/api';

import logoImg from '~/assets/logo.png';

export default function NewIncident() {
  async function handleNewIncident({ name, dueDate, payDay }) {
    try {
      const originalValue = localStorage.getItem('originalValue');
      await api.post('bills-to-pay', {
        name,
        originalValue,
        dueDate,
        payDay,
      });

      history.push('/');
    } catch (err) {
      toast.error('Erro ao cadastrar, tente novamente.');
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <img src={logoImg} alt="Contas a pagar - Deliver IT" />

          <h1>Cadastrar conta a pagar</h1>
          <p>Preencha o formulário ao lado</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para contas a pagar
          </Link>
        </Section>

        <FormIncident>
          <Form onSubmit={handleNewIncident}>
            <Input name="name" placeholder="Nome" />
            <CurrencyInput
              name="originalValue"
              placeholder="Valor original"
              defaultValue={0}
              decimalsLimit={2}
              onValueChange={(value, name) => localStorage.setItem(name, value)}
            />
            <Input
              type="date"
              name="dueDate"
              placeholder="Data de vencimento"
            />
            <Input type="date" name="payDay" placeholder="Data de pagamento" />

            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </FormIncident>
      </Content>
    </Container>
  );
}
