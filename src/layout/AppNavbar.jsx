import { 
  AppstoreOutlined, 
  BlockOutlined, 
  HomeOutlined, 
  LayoutOutlined,
  GoldOutlined,
  DragOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function SiderMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={[
        {
          key: "/",
          icon: <HomeOutlined />,
          label: "Home",
        },
        {
          key: "grids",
          icon: <AppstoreOutlined />,
          label: "Grid Libraries",
          children: [
            {
              key: "/react-grid-layout",
              icon: <BlockOutlined />,
              label: "React Grid Layout",
            },
            {
              key: "/gridstack",
              icon: <LayoutOutlined />,
              label: "Gridstack.js",
            },
            {
              key: "/muuri",
              icon: <GoldOutlined />,
              label: "Muuri",
            },
          ],
        },
        {
          key: "dnd",
          icon: <DragOutlined />,
          label: "Drag & Drop",
          children: [
            {
              key: "/dnd-kit",
              icon: <ThunderboltOutlined />,
              label: "dnd-kit",
            },
            {
              key: "/react-dnd",
              icon: <DragOutlined />,
              label: "React DnD",
            },
            {
              key: "/beautiful-dnd",
              icon: <AppstoreOutlined />,
              label: "Beautiful DnD",
            },
          ],
        },
      ]}
    />
  );
}

export default SiderMenu;
