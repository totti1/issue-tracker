import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
// import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
// import shareFill from '@iconify/icons-eva/share-fill';
// import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { styled } from '@mui/material/styles';
import {
  // Box,
  Link,
  Card,
  Grid,
  // Avatar,
  Typography,
  CardContent,
  Button,
  CardActions
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// import { fShortenNumber } from '../../../utils/formatNumber';
// //
// import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

// const CardMediaStyle = styled('div')({
//   position: 'relative',
//   paddingTop: 'calc(100% * 3 / 4)'
// });

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

// const AvatarStyle = styled(Avatar)(({ theme }) => ({
//   zIndex: 9,
//   width: 32,
//   height: 32,
//   position: 'absolute',
//   left: theme.spacing(3),
//   bottom: theme.spacing(-2)
// }));

// const InfoStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexWrap: 'wrap',
//   justifyContent: 'flex-end',
//   marginTop: theme.spacing(3),
//   color: theme.palette.text.disabled
// }));

// const CoverImgStyle = styled('img')({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute'
// });

// ----------------------------------------------------------------------

IssuePostCard.propTypes = {
  issue: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function IssuePostCard({ issue, index }) {
  const { id, title, description } = issue;
  const latestIssueLarge = 0;
  const latestIssue = 0;
  return (
    // <Grid item xs={12} sm={latestIssueLarge ? 12 : 6} md={latestIssueLarge ? 6 : 3}>
    <Card>
      <CardContent
        sx={{
          pt: 4,
          ...((latestIssueLarge || latestIssue) && {
            bottom: 0,
            width: '100%',
            position: 'absolute'
          })
        }}
      >
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block' }}
        >
          {fDate(new Date())}
        </Typography>

        <TitleStyle
          to="#"
          color="inherit"
          variant="subtitle2"
          underline="hover"
          component={RouterLink}
          sx={{
            ...(latestIssueLarge && { typography: 'h5', height: 60 }),
            ...((latestIssueLarge || latestIssue) && {
              color: 'common.white'
            })
          }}
        >
          {title}
        </TitleStyle>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <CardActions>
          <Button size="small">send to Jira</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
