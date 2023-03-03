import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';
import "./estilos.css";
const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {/* <StatCards />
            <TopSellingTable />
            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards /> */}

            <div>

              <section id="info">
                <div class="logo">
                  
                  <img src="https://res.cloudinary.com/museoq/image/upload/v1675428523/samples/Chemistry_Lab_Chemical_Logo_2_j9f3g9.png" alt="Logo del laboratorio clínico"/>
                </div>
                <div>
                  <h2>Bienvenidos a EXALAB</h2>
                  <p>Somos un laboratorio clínico con más de 20 años de experiencia en el sector. Ofrecemos una amplia variedad de servicios de diagnóstico y análisis clínicos para ayudar a nuestros pacientes a cuidar de su salud.</p>
                </div>

              </section>
              <section id="servicios">
                <h2>Nuestros servicios</h2>
                <div class="servicio">
                  <h3>Análisis de sangre</h3>
                  <p>Realizamos todo tipo de análisis de sangre, incluyendo análisis de hematología, química sanguínea y pruebas de coagulación.</p>
                </div>
                <div class="servicio">
                  <h3>Análisis de orina</h3>
                  <p>Ofrecemos análisis de orina para detectar infecciones urinarias, problemas renales y otros trastornos del sistema urinario.</p>
                </div>
                {/* <div class="servicio">
                  <h3>Análisis de heces</h3>
                  <p>Realizamos análisis de heces para detectar problemas digestivos, infecciones intestinales y otros trastornos gastrointestinales.</p>
                </div> */}
              </section>
              <section id="contacto">
                <h2>Contacto</h2>
                <p>Si desea ponerse en contacto con nosotros, puede hacerlo a través de los siguientes medios:</p>
                <ul>
                  <li>Teléfono: 555-1234</li>
                  <li>Email: info@laboratorioclinico.com</li>
                  <li>Dirección: Av. Principal #123, Ciudad, País</li>
                </ul>
              </section>
            </div>
          </Grid>

          {/* <Grid item lg={4} md={4} sm={12} xs={12}>
            {/* <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card> */}

            {/* <UpgradeCard />
            <Campaigns /> 
          </Grid> */}
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
