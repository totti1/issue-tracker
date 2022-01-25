// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { fDate } from '../../../utils/formatTime';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

export default function AppWeeklySales({ issues }) {
  const issuesToday = issues.filter((i) => fDate(i.idate) == fDate(new Date()))
  const TOTAL = issues && issuesToday.length || 0
  return (
    <RootStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Issues today
      </Typography>
    </RootStyle>
  );
}
