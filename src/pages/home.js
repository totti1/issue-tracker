// material
import { Box, Grid, Container, Typography } from '@mui/material';
import DashboardNavbar from '../layouts/dashboard/DashboardNavbar';
// components
import Page from '../components/Page';
import { AppNewsUpdate } from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <div>
      <DashboardNavbar />
      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <AppNewsUpdate />
        </Container>
      </Page>
    </div>
  );
}
