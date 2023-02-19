import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import Crear_usuario from "./Crear_usuario";
// import SimpleForm from "./SimpleForm";
// import StepperForm from "./StepperForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {
  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Form" }]} />
      </Box> */}

      <Stack spacing={3}>
        <SimpleCard title="Registrar de Usuarios">
          <Crear_usuario />
        </SimpleCard>

        {/* <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard> */}
      </Stack>
    </Container>
  );
};

export default AppForm;