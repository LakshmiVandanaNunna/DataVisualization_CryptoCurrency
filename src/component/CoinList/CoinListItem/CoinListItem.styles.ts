import { Typography, Card } from '@mui/material';
import styled from 'styled-components';

export const CoinCard = styled(Card)`
  width: 300px;
  height: 300px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: black;
    color: white;
 
`;

export const CoinTitle = styled(Typography).attrs({ variant: 'h5', component: 'div' })`
  text-align: center;
  margin-bottom: .6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CoinImageContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: .5rem;
  margin-top: 2.5rem;

`;

export const CoinImage = styled.img`
  width: 5rem;
  border-radius: 8px;
  height: 5rem;
`;
