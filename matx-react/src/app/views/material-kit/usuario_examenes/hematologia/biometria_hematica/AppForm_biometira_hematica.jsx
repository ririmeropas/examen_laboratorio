import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import Biometria_hematica from "./Biometria_hematica";
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

const AppForm_biometria_hematica = () => {
  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Form" }]} />
      </Box> */}

      <Stack spacing={3}>
        <SimpleCard title="Examen Biometria Hematica">
          <Biometria_hematica />
        </SimpleCard>

        {/* <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard> */}
      </Stack>
    </Container>
  );
};

export default AppForm_biometria_hematica;