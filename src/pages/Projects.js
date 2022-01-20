// import { filter } from 'lodash';
// import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState } from 'react';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  // Card,
  // Table,
  Stack,
  // Avatar,
  // Button,
  // Checkbox,
  // TableRow,
  // TableBody,
  // TableCell,
  Container,
  Typography,
  // TableContainer,
  // TablePagination,
  TextField,
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { ProjectCard } from '../components/home';
import { BasicModal } from '../components/_dashboard/projects';
import Page from '../components/Page';
// import Label from '../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
// import USERLIST from '../_mocks_/user';
import { projectsMock } from '../__mocks__/projectsMock';
// import projectsData from '../_mocks_/projects';
// import { projectsData } from '../__mocks__/projects';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Project Name', alignRight: false },
//   { id: 'description', label: 'Project Description', alignRight: false },
//   { id: 'company', label: 'Company', alignRight: false },
//   { id: 'clients', label: 'Clients', alignRight: false },
//   { id: 'status', label: 'Status', alignRight: false },
//   { id: '' }
// ];

// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function Projects() {
  // const [page, setPage] = useState(0);
  // const [order, setOrder] = useState('asc');
  // const [selected, setSelected] = useState([]);
  // const [orderBy, setOrderBy] = useState('name');
  // const [filterName, setFilterName] = useState('');
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  // const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {projectsMock.map((items) => (
            <Grid item xs={4}>
              <ProjectCard
                issueTitle={items.title}
                issueDescription={items.description}
                issueDateCreated={items.createdAt}
                onClick={handleOpen}
                redirectTo="/dashboard/issues"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <BasicModal open={open} onClose={handleClose}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Invite Client
        </Typography>
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Send Invitation
        </LoadingButton>
      </BasicModal>
    </Page>
  );
}
