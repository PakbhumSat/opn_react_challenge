import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
