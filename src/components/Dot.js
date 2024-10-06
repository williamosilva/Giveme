import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled, { keyframes } from "styled-components";
const bounce = keyframes `
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;
const wave = keyframes `
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;
const DotsWrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Dot = styled.div `
  /* Prop transitória ($delay) */
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: #3498db;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both,
    /* Animação de pulsação */ ${wave} 1.4s infinite ease-in-out both; /* Animação de movimento vertical */
  animation-delay: ${({ $delay }) => $delay}; /* Uso de $delay */
`;
const Dots = () => {
    return (_jsxs(DotsWrapper, { children: [_jsx(Dot, { "$delay": "0s" }), _jsx(Dot, { "$delay": "0.2s" }), _jsx(Dot, { "$delay": "0.4s" })] }));
};
export default Dots;
