export const navavegar_usuario = [
    { name: 'INICIO', path: '/dashboard/default', icon: 'dashboard' },
    { label: 'USUARIOS', type: 'label' },
    
    { label: 'EXAMENES LABORATORIO', type: 'label' },
    {
      name: 'Examenes',
      icon: 'library_books',
      children: [
        {
          name: 'HEMATOLOGÍA',
          children: [
            { name: 'Biometria Hematica', path: '/material/form' },
          ]
        },
        {
          name: 'HECES',
          children: [
            { name: 'Coprocultivo', path: '/material/form' },
          ]
        },
      ],
    },
   
  ];
  