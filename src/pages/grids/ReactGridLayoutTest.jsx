import React, { useState } from 'react'
import GridLayout from 'react-grid-layout'
import { Typography, Card, Space, Button, Alert, Switch, InputNumber } from 'antd'
import { GithubOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const { Title, Paragraph, Text } = Typography

export default function ReactGridLayoutTest() {
  const [isDraggable, setIsDraggable] = useState(true)
  const [isResizable, setIsResizable] = useState(true)
  const [cols, setCols] = useState(12)
  const [rowHeight, setRowHeight] = useState(30)
  
  const [layout, setLayout] = useState([
    { i: 'a', x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
    { i: 'b', x: 4, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
    { i: 'c', x: 8, y: 0, w: 4, h: 4, minW: 2, minH: 2 },
    { i: 'd', x: 0, y: 4, w: 6, h: 4, minW: 2, minH: 2 },
    { i: 'e', x: 6, y: 4, w: 6, h: 4, minW: 2, minH: 2 },
  ])

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout)
  }

  const addItem = () => {
    const newItem = {
      i: `item-${layout.length}`,
      x: (layout.length * 2) % cols,
      y: Infinity,
      w: 4,
      h: 4,
      minW: 2,
      minH: 2
    }
    setLayout([...layout, newItem])
  }

  const removeItem = (id) => {
    setLayout(layout.filter(item => item.i !== id))
  }

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dfe6e9', '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e'
  ]

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>⚡ React Grid Layout</Title>
          <Paragraph>
            Biblioteca React popular para <Text strong>grids arrastáveis e redimensionáveis</Text> com 
            suporte a breakpoints responsivos. Ideal para dashboards onde o usuário pode reorganizar os widgets.
          </Paragraph>
        </div>

        <Alert
          message="✅ Biblioteca Implementada e Funcionando"
          description="Arraste os cards pela barra superior ou redimensione pelos cantos. Configure as opções abaixo para testar diferentes comportamentos."
          type="success"
          showIcon
        />

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ fontSize: 16 }}>⚙️ Configurações</Text>
            </div>
            
            <Space wrap size="large">
              <Space>
                <Text>Arrastar:</Text>
                <Switch checked={isDraggable} onChange={setIsDraggable} />
              </Space>
              
              <Space>
                <Text>Redimensionar:</Text>
                <Switch checked={isResizable} onChange={setIsResizable} />
              </Space>
              
              <Space>
                <Text>Colunas:</Text>
                <InputNumber 
                  min={6} 
                  max={24} 
                  value={cols} 
                  onChange={setCols}
                  style={{ width: 80 }}
                />
              </Space>
              
              <Space>
                <Text>Altura da linha:</Text>
                <InputNumber 
                  min={20} 
                  max={100} 
                  value={rowHeight} 
                  onChange={setRowHeight}
                  style={{ width: 80 }}
                />
              </Space>

              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={addItem}
              >
                Adicionar Item
              </Button>
            </Space>

            <div>
              <Button 
                type="link" 
                icon={<GithubOutlined />}
                href="https://github.com/react-grid-layout/react-grid-layout"
                target="_blank"
              >
                Documentação Oficial
              </Button>
            </div>
          </Space>
        </Card>

        <div style={{ marginTop: 16 }}>
          <GridLayout 
            className="layout" 
            layout={layout}
            cols={cols}
            rowHeight={rowHeight}
            width={1200}
            isDraggable={isDraggable}
            isResizable={isResizable}
            onLayoutChange={onLayoutChange}
            draggableHandle=".drag-handle"
          >
            {layout.map((item, index) => (
              <div 
                key={item.i}
                style={{ 
                  background: colors[index % colors.length],
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="drag-handle"
                  style={{ 
                    background: 'rgba(0,0,0,0.1)',
                    padding: '8px 12px',
                    cursor: 'move',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  <Text strong style={{ color: '#fff' }}>
                    Card {item.i}
                  </Text>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<MinusOutlined />}
                    onClick={() => removeItem(item.i)}
                    style={{ color: '#fff' }}
                  />
                </div>
                <div style={{ 
                  padding: 16, 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>
                    Posição: x={item.x}, y={item.y}
                  </Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>
                    Tamanho: {item.w}x{item.h}
                  </Text>
                </div>
              </div>
            ))}
          </GridLayout>
        </div>

        <Card title="💡 Recursos do React Grid Layout">
          <ul style={{ marginBottom: 0 }}>
            <li>Drag and drop de itens dentro do grid</li>
            <li>Redimensionamento de itens</li>
            <li>Breakpoints responsivos (não implementado neste exemplo)</li>
            <li>Layouts estáticos (itens fixos)</li>
            <li>Configuração de limites mínimos/máximos</li>
            <li>Salvar/carregar layouts (não implementado neste exemplo)</li>
            <li>Compactação vertical automática</li>
          </ul>
        </Card>
      </Space>
    </div>
  )
}
