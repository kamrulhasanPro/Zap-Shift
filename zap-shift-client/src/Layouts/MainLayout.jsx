import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/share/Navbar";
import Footer from "../Pages/share/Footer";
import MyContainer from "../Components/MyContainer";

const MainLayout = () => {
  return (
    <MyContainer>
      <header className="my-7">{/* header */}
        <Navbar/>
      </header>

      {/* main */}
      <main className="min-h-[calc(100vh-462px)]">
        <Outlet />
      </main>

      <footer className="my-7">{/* footer */}
        <Footer/>
      </footer>
    </MyContainer>
  );
};

export default MainLayout;
