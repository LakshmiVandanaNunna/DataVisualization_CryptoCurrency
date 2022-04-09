import { CircularProgress } from '@mui/material';
import { LoadingIndicatorContainer } from './LoadingIndicator.styles';

function LoadingIndicator() {
  return (
    <LoadingIndicatorContainer>
      <CircularProgress />
    </LoadingIndicatorContainer>
  );
}

export default LoadingIndicator;
