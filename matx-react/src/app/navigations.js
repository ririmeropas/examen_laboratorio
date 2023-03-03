export const navigations = [
  { name: 'INICIO', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'USUARIOS', type: 'label' },
  {
    name: 'Usuarios',
    icon: 'people',
    children: [
      { name: 'Crear Usuario', iconText: 'SI', path: '/material/crear_usuario' },
      { name: 'Ver Usuario', iconText: 'SU', path: '/material/ver_usuario' },

      
    ],
  },
  { label: 'EXAMENES LABORATORIO', type: 'label' },
  {
    name: 'Exámenes',
    icon: 'library_books',
    children: [
      { name: 'Biometría Hemática', path: '/material/biometria_hematica' },
      { name: 'Orina', path: '/material/crear_orina' },
      { name: 'Ver Examenes', path: '/material/ver_examenes' },
   
    ],
  },

  // { label: 'CUENTA', type: 'label' },
  // {
  //   name: 'Sesión',
  //   icon: 'account_box',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Editar Cuenta', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  // },
  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' },
  //   ],
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
];
