import React from 'react'
import { Card, Row, Col, Typography, Tag, Space } from 'antd'
import { 
  AppstoreOutlined, 
  DragOutlined, 
  ThunderboltOutlined,
  RocketOutlined 
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function Home() {
  const gridLibraries = [
    {
      name: 'React Grid Layout',
      icon: <AppstoreOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      description: 'Grid arrastável e redimensionável com breakpoints responsivos',
      tags: ['Drag & Drop', 'Responsive', 'Popular'],
      color: '#e6f7ff'
    },
    {
      name: 'Gridstack.js',
      icon: <AppstoreOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      description: 'Framework agnóstico com nested grids e multi-grid drag',
      tags: ['Framework Agnostic', 'Nested', 'Advanced'],
      color: '#f6ffed'
    },
    {
      name: 'Muuri',
      icon: <AppstoreOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
      description: 'Layouts responsivos com animações suaves e filtros',
      tags: ['Animations', 'Masonry', 'Filtering'],
      color: '#f9f0ff'
    }
  ]

  const dndLibraries = [
    {
      name: 'dnd-kit',
      icon: <ThunderboltOutlined style={{ fontSize: 24, color: '#faad14' }} />,
      description: 'Ferramenta moderna com API flexível para drag-and-drop',
      tags: ['Modern', 'Flexible', 'Performant'],
      color: '#fffbe6'
    },
    {
      name: 'React DnD',
      icon: <DragOutlined style={{ fontSize: 24, color: '#13c2c2' }} />,
      description: 'Biblioteca estabelecida para drag-and-drop no React',
      tags: ['Established', 'Flexible', 'HTML5'],
      color: '#e6fffb'
    },
    {
      name: 'Beautiful DnD',
      icon: <RocketOutlined style={{ fontSize: 24, color: '#eb2f96' }} />,
      description: 'Drag-and-drop acessível ideal para Kanban e listas',
      tags: ['Accessible', 'Kanban', 'Lists'],
      color: '#fff0f6'
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>🧪 Laboratório de Grid & Dashboards</Title>
        <Paragraph style={{ fontSize: 16 }}>
          Bem-vindo ao laboratório! Explore e compare diferentes bibliotecas de grid, 
          drag-and-drop e layouts dinâmicos para criar dashboards interativos.
        </Paragraph>
      </div>

      <Title level={3} style={{ marginTop: 32 }}>📦 Grid Libraries</Title>
      <Paragraph>Bibliotecas completas com grid arrastável e redimensionável</Paragraph>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {gridLibraries.map((lib, idx) => (
          <Col xs={24} md={12} lg={8} key={idx}>
            <Card 
              hoverable
              style={{ 
                height: '100%',
                borderRadius: 8,
                background: lib.color,
                border: 'none'
              }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div>{lib.icon}</div>
                <Title level={4} style={{ marginTop: 8, marginBottom: 8 }}>
                  {lib.name}
                </Title>
                <Paragraph style={{ marginBottom: 12 }}>
                  {lib.description}
                </Paragraph>
                <div>
                  {lib.tags.map((tag, i) => (
                    <Tag key={i} color="default" style={{ marginBottom: 4 }}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={3} style={{ marginTop: 32 }}>🎯 Drag & Drop Libraries</Title>
      <Paragraph>Ferramentas para habilitar interação drag-and-drop</Paragraph>
      <Row gutter={[16, 16]}>
        {dndLibraries.map((lib, idx) => (
          <Col xs={24} md={12} lg={8} key={idx}>
            <Card 
              hoverable
              style={{ 
                height: '100%',
                borderRadius: 8,
                background: lib.color,
                border: 'none'
              }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div>{lib.icon}</div>
                <Title level={4} style={{ marginTop: 8, marginBottom: 8 }}>
                  {lib.name}
                </Title>
                <Paragraph style={{ marginBottom: 12 }}>
                  {lib.description}
                </Paragraph>
                <div>
                  {lib.tags.map((tag, i) => (
                    <Tag key={i} color="default" style={{ marginBottom: 4 }}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Card 
        style={{ 
          marginTop: 32, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: 8
        }}
      >
        <div style={{ color: '#fff' }}>
          <Title level={4} style={{ color: '#fff', marginTop: 0 }}>
            💡 Como usar este laboratório
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 0 }}>
            Use o menu lateral para navegar entre as diferentes bibliotecas. 
            Cada página contém exemplos interativos onde você pode testar drag-and-drop, 
            redimensionamento e outros recursos. Compare as implementações para escolher 
            a melhor solução para seu projeto!
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}
