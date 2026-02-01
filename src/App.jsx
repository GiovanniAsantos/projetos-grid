
import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons'
import Home from './pages/Home'
import ReactGridLayoutTest from './pages/ReactGridLayoutTest'

const { Header, Sider, Content } = Layout

function SiderMenu() {
  const navigate = useNavigate()
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["/"]}
      onClick={({ key }) => navigate(key)}
      items={[
        { key: '/', icon: <HomeOutlined />, label: 'Home' },
        { key: '/react-grid', icon: <AppstoreOutlined />, label: 'React Grid' },
      ]}
    />
  )
}

function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)' }} />
        <SiderMenu />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px' }}>
          <h3 style={{ margin: 0 }}>Projeto Grid</h3>
        </Header>
        <Content style={{ margin: 16 }}>
          <div style={{ padding: 16, background: '#fff', minHeight: 360 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/react-grid" element={<ReactGridLayoutTest />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
