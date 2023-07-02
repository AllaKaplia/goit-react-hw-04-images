import styled from '@emotion/styled';

export const theme = {
  colors: {
    error: 'red',
  },
};

export const TextError = styled.div`
    font-size: 16px;
    color: ${p => p.theme.colors.error};
`;

export const ErrorMessage = ({ children }) => {
    return <TextError>{children}</TextError>;
};