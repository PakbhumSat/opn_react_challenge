import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  font-family: 'Trebuchet MS', sans-serif;
  display: flex;
  align-items: center;
  max-width: 100vw;
  flex-direction: column;
  color: #5c6785;
  @media (max-width: 599px) {
    padding: 0px 16px;
  }
  @media (min-width: 600px) {
    padding: 0px 16px;
  }
  @media (min-width: 900px) {
    padding: 0px 40px;
  }
  @media (min-width: 1200px) {
    padding: 0px 80px;
  }
  @media (min-width: 1400px) {
    padding: 0px 160px;
  }
  @media (min-width: 1800px) {
    padding: 0px 240px;
  }
  p {
    margin: 0px;
    line-height: 24px;
  }
`;
