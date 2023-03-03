import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));
const CrearUsuario = Loadable(lazy(() => import('./usuario/crear_usuario/AppForm')));
const VerUsuario = Loadable(lazy(() => import('./usuario/ver_usuario/AppTable')));
const EditarUsuario = Loadable(lazy(() => import('./usuario/editar_usuario/AppForm_editar')));
const BiometriaHematica = Loadable(lazy(() => import('./usuario_examenes/hematologia/biometria_hematica/AppForm_biometira_hematica')));
const VerExamenesUsuario = Loadable(lazy(() => import('./usuario_examen/ver_examenes/AppTable')));
const VerExamenes = Loadable(lazy(() => import('./usuario_examenes/ver_examenes/AppTable')));
const EditarBiometriaHematica = Loadable(lazy(() => import('./usuario_examenes/hematologia/editar_hematologia/AppForm_biometira_hematica')));
const Orina = Loadable(lazy(() => import('./usuario_examenes/orina/crear_examen/AppForm_Orina')));
const EditarOrina = Loadable(lazy(() => import('./usuario_examenes/orina/editar_examen/AppForm_Orina')));


const materialRoutes = [
  {
    path: '/material/table',
    element: <AppTable />,
  },
  {
    path: '/material/form',
    element: <AppForm />,
  },
  {
    path: '/material/buttons',
    element: <AppButton />,
  },
  {
    path: '/material/icons',
    element: <AppIcon />,
  },
  {
    path: '/material/progress',
    element: <AppProgress />,
  },
  {
    path: '/material/menu',
    element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    element: <AppRadio />,
  },
  {
    path: '/material/slider',
    element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    element: <AppSnackbar />,
  },
  {
    path: '/material/crear_usuario',
    element: <CrearUsuario />,
  },
  {
    path: '/material/ver_usuario',
    element: <VerUsuario />,
  },
  {
    path: '/material/editar_usuario/:id_usuario',
    element: <EditarUsuario />,
  },
  {
    path: '/material/biometria_hematica',
    element: <BiometriaHematica />,
  },
  {
    path: '/material/ver_examenes',
    element: <VerExamenes />,
  },
  {
    path: '/material/ver_examenes_usuario',
    element: <VerExamenesUsuario />,
  },
  {
    path: '/material/editar_biometria_hematica/:id_examen',
    element: <EditarBiometriaHematica />,
  },
  {
    path: '/material/crear_orina',
    element: <Orina />,
  },
  {
    path: '/material/editar_orina/:id_examen',
    element: <EditarOrina />,
  },
];

export default materialRoutes;
