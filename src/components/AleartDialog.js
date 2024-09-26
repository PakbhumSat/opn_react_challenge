import styled from 'styled-components';

export const BackdropOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const AlertDialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e7e7e7;
  padding: 24px;
  z-index: 10;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
