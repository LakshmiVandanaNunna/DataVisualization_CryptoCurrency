import { Typography } from '@mui/material';
import styled from 'styled-components';

export const DataRowTitle = styled(Typography).attrs({
  variant: 'body2', color: 'text.secondary', component: 'span',
})`
  font-weight: 600;
  margin-right: .5rem;
`;

export const DataRowText = styled(Typography).attrs({ variant: 'body2', component: 'span' })``;
