import { Helmet } from "react-helmet";
import { MainPageComponent } from "./components/mainPage/mainPage.component";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Helmet>
        <title>{"Valheim Management Dashboard"}</title>
      </Helmet>
      <MainPageComponent />
    </div>
  );
};

export default App;
