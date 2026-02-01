import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import MuuriTest from "../pages/grids/MuuriTest.jsx";
import DndKitTest from "../pages/grids/DndKitTest.jsx";
import BeautifulDndTest from "../pages/grids/BeautifulDndTest.jsx";
import SiderMenu from "./AppNavbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import ReactGridLayoutTest from "../pages/grids/ReactGridLayoutTest.jsx";
import GridstackTest from "../pages/grids/GridstackTest.jsx";
import ReactDndTest from "../pages/grids/ReactDndTest.jsx";

function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={260}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 64,
            margin: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          Grid Lab 🧪
        </div>
        <SiderMenu />
      </Sider>
      <Layout style={{ marginLeft: 260 }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <h2
            style={{
              margin: 0,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Laboratório de Grid & Dashboards
          </h2>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: "calc(100vh - 112px)",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/react-grid-layout"
                element={<ReactGridLayoutTest />}
              />
              <Route path="/gridstack" element={<GridstackTest />} />
              <Route path="/muuri" element={<MuuriTest />} />
              <Route path="/dnd-kit" element={<DndKitTest />} />
              <Route path="/react-dnd" element={<ReactDndTest />} />
              <Route path="/beautiful-dnd" element={<BeautifulDndTest />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
