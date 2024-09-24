import PropTypes from 'prop-types';
import {memo} from 'react';
import {alpha, experimentalStyled as styled} from '@mui/material/styles';
import {AppBar, Box, Stack, Toolbar, Typography} from '@mui/material';
import {clearFromStorage} from '../common/misc/utils';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

Navbar.propTypes = {
    refreshBalance: PropTypes.bool
};

function Navbar() {

    const logout = () => {
        clearFromStorage('jwtToken');
        window.location.href = '/login';
    }

    return (
        <RootStyle>
        <ToolbarStyle>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
            <Typography
                style={{ fontWeight: 'bold', color: 'black', cursor: 'pointer' }}
                onClick={logout}
                variant="body2">
                Logout
            </Typography>
            </Stack>
        </ToolbarStyle>
        </RootStyle>
    );
}

export default memo(Navbar);