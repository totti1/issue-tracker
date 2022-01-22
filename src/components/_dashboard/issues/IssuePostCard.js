import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import {
  Link,
  Card,
  Grid,
  Typography,
  CardContent,
  Button,
  CardActions
} from '@mui/material';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// utils
import { fDate } from '../../../utils/formatTime';

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

IssuePostCard.propTypes = {
  issue: PropTypes.object.isRequired,
  index: PropTypes.number
};
const API =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_URL;
export default function IssuePostCard({ issue, index }) {
  const navigate = useNavigate();
  const { id, projectid, title, description } = issue;
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const latestIssueLarge = 0;
  const latestIssue = 0;
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      return false
    }
    const { data } = JSON.parse(userData);
    if (data) {
      setUser(data)
    }
  }, [user])
  const sendToJira = async () => {

    setLoading(true);
    let info = {
      title,
      description,
      projectID: projectid
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(info)
    };
    try {
      const response = await fetch(`${API}/issuetojira`, requestOptions);
      const data = await response.json();
      if (data.status === 200) {
        alert('Issue reported successful');
      } else {
        alert('Email or Password mismatch');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
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
        {user && user.isadmin &&
          <CardActions>
            <Button size="small" onClick={sendToJira}>{loading ? "Loading..." : "send to Jira"}</Button>
          </CardActions>
        }
      </CardContent>
    </Card>
  );
}
