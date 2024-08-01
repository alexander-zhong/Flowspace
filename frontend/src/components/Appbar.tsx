import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import logo from "../assets/Navbar.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  border: `1px solid ${theme.palette.divider}`,
}));

const Sidebar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: 240,
  alignItems: "center",
  paddingTop: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const LogoContainer = styled(Box)({
  marginBottom: "auto",
});

const TabsContainer = styled(Box)({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "center",
});

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Root>
      <Sidebar>
        <LogoContainer>
          <img src={logo} alt="Logo" />
        </LogoContainer>
        <TabsContainer>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              ".MuiTabs-indicator": {
                display: "none",
              },
              ".MuiTab-root": {
                borderBottom: `1px solid`,
                width: "100%",
                textAlign: "left",
              },
              ".MuiTab-root:last-child": {
                borderBottom: "none",
              },
              ".Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} />
          </Tabs>
        </TabsContainer>
      </Sidebar>
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </Root>
  );
}
