import React from "react";
import Greeting from "./components/Greeting";
import DashboardSummary from "./components/DashboardSummary";
import QuickActions from "./components/QuickActions";

const Home = () => {
  return (
    <div>
      <Greeting />
      <DashboardSummary />
      <QuickActions />
    </div>
  );
};

export default Home;