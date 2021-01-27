import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F3F3;
`;

export const Content = styled.div`
  width: 100%;
  padding: 96px;
  background: #FFF;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  a {
    color: #41414d;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Section = styled.section`
  width: 100%;
  max-width: 380px;

  h1 {
    margin: 60px 0 32px;
    font-size: 32px;
  }

  p {
    font-size: 18px;
    color: #737388;
    line-height: 32px;
  }
`;
export const FormIncident = styled.form`
  width: 100%;
  max-width: 450px;

  input,
  textarea {
    margin-top: 8px;
  }
`;
