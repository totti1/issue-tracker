// import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
// import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

// const NEWS = [...Array(5)].map((_, index) => {
//   const setIndex = index + 1;
//   return {
//     title: faker.name.title(),
//     description: faker.lorem.paragraphs(),
//     image: mockImgCover(setIndex),
//     postedAt: faker.date.soon()
//   };
// });

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ project }) {
  const { id, title, description } = project;
  const image = mockImgCover(id);
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function AppNewsUpdate({ projects }) {
  return (
    <Card>
      <CardHeader title="Most Highlighted Issues" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {projects.map((pro) => (
            <NewsItem key={pro.title} project={pro} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
