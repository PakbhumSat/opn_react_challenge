import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  margin: 10px;
  border: 1px solid #e7e7e750;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const CardDetail = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

export const HoverCard = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffffdd;
  border: 1px solid #ccc;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in;
  z-index: 2;
  border-radius: 8px;
`;
