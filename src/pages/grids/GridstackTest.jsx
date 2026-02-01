import React, { useEffect, useRef } from 'react'
import { Typography, Card, Alert, Space, Button, Switch } from 'antd'
import { GithubOutlined, PlusOutlined } from '@ant-design/icons'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

const { Title, Paragraph, Text } = Typography

export default function GridstackTest() {
  const gridRef = useRef(null)
  const gridInstanceRef = useRef(null)

  useEffect(() => {
    if (gridRef.current && !gridInstanceRef.current) {
      // Inicializar Gridstack
      gridInstanceRef.current = GridStack.init({
        cellHeight: 80,
        margin: 10,
        float: false,
        animate: true,
      }, gridRef.current)

      // Adicionar widgets iniciais
      const items = [
        { x: 0, y: 0, w: 4, h: 2, content: 'Widget 1' },
        { x: 4, y: 0, w: 4, h: 2, content: 'Widget 2' },
        { x: 8, y: 0, w: 4, h: 2, content: 'Widget 3' },
        { x: 0, y: 2, w: 6, h: 3, content: 'Widget 4' },
        { x: 6, y: 2, w: 6, h: 3, content: 'Widget 5' },
      ]

      items.forEach(item => {
        gridInstanceRef.current.addWidget({
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          content: `<div style="padding: 16px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; font-size: 18px; font-weight: bold;">${item.content}</div>`
        })
      })
    }

    return () => {
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy(false)
        gridInstanceRef.current = null
      }
    }
  }, [])

  const addWidget = () => {
    if (gridInstanceRef.current) {
      const count = gridRef.current.children.length + 1
      gridInstanceRef.current.addWidget({
        w: 4,
        h: 2,
        content: `<div style="padding: 16px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); color: white; border-radius: 8px; font-size: 18px; font-weight: bold;">Widget ${count}</div>`
      })
    }
  }

  const toggleFloat = (checked) => {
    if (gridInstanceRef.current) {
      gridInstanceRef.current.float(checked)
    }
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>📊 Gridstack.js</Title>
          <Paragraph>
            Biblioteca moderna <Text strong>framework agnóstica</Text> para criar dashboards 
            com drag, drop, resize, nested grids e multi-grid support.
          </Paragraph>
        </div>

        <Alert
          message="✅ Biblioteca Implementada e Funcionando"
          description="Arraste os widgets ou redimensione-os. Esta biblioteca é framework agnóstica e funciona perfeitamente com React!"
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
                <Text>Float Mode:</Text>
                <Switch onChange={toggleFloat} />
              </Space>

              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={addWidget}
              >
                Adicionar Widget
              </Button>

              <Button 
                type="link" 
                icon={<GithubOutlined />}
                href="https://gridstackjs.com/"
                target="_blank"
              >
                Documentação
              </Button>
            </Space>
          </Space>
        </Card>

        <div 
          ref={gridRef}
          className="grid-stack"
          style={{
            minHeight: 400,
            background: '#fafafa',
            borderRadius: 8,
            padding: 10
          }}
        />

        <Card title="💡 Recursos do Gridstack.js">
          <ul style={{ marginBottom: 0 }}>
            <li>Framework agnóstico (funciona com qualquer framework)</li>
            <li>Drag & drop entre múltiplos grids</li>
            <li>Nested grids (grids dentro de grids)</li>
            <li>Touch support para mobile</li>
            <li>Serialização e deserialização de layouts</li>
            <li>One column mode para mobile responsivo</li>
            <li>API rica e extensível</li>
          </ul>
        </Card>
      </Space>
    </div>
  )
}
