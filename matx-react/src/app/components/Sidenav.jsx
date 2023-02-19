import { styled } from '@mui/system';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';
import { navavegar_usuario } from 'app/navegar_usuario';
import { Fragment, useEffect, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const usuario_local = JSON.parse(localStorage.getItem("usuario"));
  const [tipo_usuario, setTipo_usuario] = useState();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  //OBTENER DATOS DE USUARIOS
  const getDatosUsuarios = () => {
    fetch(`http://localhost:8000/api/Mostar_usuario/${usuario_local.id_usuario}`)
      .then((res) => res.json())
      .then((datos_usuario) => {
        console.log(datos_usuario);
        setTipo_usuario(datos_usuario.tipo_usuario);
        console.log(datos_usuario.tipo_usuario);
      });
  };

  useEffect(() => {
    getDatosUsuarios();
  }, []);
  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        {tipo_usuario==="A"?<MatxVerticalNav items={navigations} />:<MatxVerticalNav items={navavegar_usuario} /> }

        
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
