import { Avatar, Hidden, Icon, IconButton, MenuItem, useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../components/Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import ShoppingCart from '../../ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const Layout1Topbar = () => {
  //navegar a login
  const navigate = useNavigate();

  const usuario_local = JSON.parse(localStorage.getItem("usuario"));

  const theme = useTheme();
  const { settings, updateSettings } = useSettings();

  const { logout, user } = useAuth();


  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };
  //INICIAR FORMULARIO
  const initialForm = {
    ruc_usuario: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  };
  const [form, setForm] = useState(initialForm);
  //OBTENER DATOS DE USUARIOS
  const getDatosUsuarios = () => {
    fetch(`http://localhost:8000/api/Mostar_usuario/${usuario_local.id_usuario}`)
      .then((res) => res.json())
      .then((datos_usuario) => {
        console.log(datos_usuario);
        setForm({
          ...form,
          nombre: datos_usuario.nombres +" " +datos_usuario.apellidos,
        });
      });
  };

 


  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const cerrar_sesion = () => {
    // setLoading(false);
    navigate('/session/signin');
  }
  useEffect(() => {
    getDatosUsuarios();
  }, []);

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>
          {/* ICONOS TOPBAR */}
          {/* <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox> */}
        </Box>
        {/* TOPBAR */}
        <Box display="flex" alignItems="center">
          {/* BUSQUEDA */}
          {/* <MatxSearchBox /> */}
          {/* NOTIFICACIONES */}
          {/* <NotificationProvider>
            <NotificationBar />
          </NotificationProvider> */}
          {/* CART */}
          {/* <ShoppingCart /> */}

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    {/* Bienvenido <strong>{user.name}</strong> */}
                    Bienvenido! <strong>{form.nombre}</strong>
                  </Span>
                </Hidden>
                {/* <Avatar src={user.avatar} sx={{ cursor: 'pointer' }} /> */}
                <Avatar src="" sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            {/* <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem> */}

            {/* <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Perfil </Span>
              </Link>
            </StyledItem> */}

            {/* <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem> */}


            <StyledItem onClick={cerrar_sesion}>
              <Icon> power_settings_new </Icon>
              <Span> Cerrar Sesión </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);
