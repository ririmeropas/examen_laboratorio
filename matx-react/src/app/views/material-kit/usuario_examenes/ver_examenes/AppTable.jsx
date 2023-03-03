import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import VerUsuaio from "./VerExamenes";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = () => {
  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box> */}

      <SimpleCard title="Exámenes">
        <VerUsuaio />
      </SimpleCard>

      {/* <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard> */}
    </Container>
  );
};

export default AppTable;
