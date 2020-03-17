import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

// eslint-disable-next-line import/prefer-default-export
export const useIsMobile = (size) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(size));

  return isMobile;
};
