import { Card, Typography } from '@mui/material';
import styled from 'styled-components';

export const CoinDetailsImage = styled.img`
  width: 2rem;
  height: 2rem;
  display: inline;
  margin-right: .6rem;
  border-radius: 8px;
`;

export const CoinDetailsCard = styled(Card)`
  width: 100%;
`;

export const CoinDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: .8rem;
`;

export const CoinDetailsTitle = styled(Typography).attrs({ variant: 'h5', component: 'h1' })``;
