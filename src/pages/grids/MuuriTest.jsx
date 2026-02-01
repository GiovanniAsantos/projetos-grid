import React, { useEffect, useRef, useState } from 'react'
import { Typography, Card, Alert, Space, Button, Radio } from 'antd'
import { GithubOutlined, PlusOutlined } from '@ant-design/icons'
import Muuri from 'muuri'

const { Title, Paragraph, Text } = Typography

export default function MuuriTest() {
  const gridRef = useRef(null)
  const muuriRef = useRef(null)
  const [filter, setFilter] = useState('*')
  const [itemCount, setItemCount] = useState(6)

  useEffect(() => {
    if (gridRef.current && !muuriRef.current) {
      muuriRef.current = new Muuri(gridRef.current, {
        dragEnabled: true,
        dragSortHeuristics: {
          sortInterval: 50,
          minDragDistance: 10,
          minBounceBackAngle: 1
        },
        layoutDuration: 400,
        layoutEasing: 'ease',
        dragPlaceholder: {
          enabled: true,
          duration: 400,
          easing: 'ease',
          createElement: (item) => {
            return item.getElement().cloneNode(true)
          }
        },
        layout: {
          fillGaps: true,
          horizontal: false,
          alignRight: false,
          alignBottom: false
        }
      })
    }

    return () => {
      if (muuriRef.current) {
        muuriRef.current.destroy()
        muuriRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (muuriRef.current) {
      muuriRef.current.filter(filter)
    }
  }, [filter])

  const addItem = () => {
    if (muuriRef.current) {
      const newCount = itemCount + 1
      setItemCount(newCount)
      
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#a29bfe']
      const categories = ['red', 'blue', 'green']
      const category = categories[Math.floor(Math.random() * categories.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      const elem = document.createElement('div')
      elem.className = `item ${category}`
      elem.innerHTML = `
        <div class="item-content" style="
          background: ${color};
          padding: 20px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          text-align: center;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
          Item ${newCount}
        </div>
      `
      
      muuriRef.current.add(elem, { index: 0 })
    }
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>✨ Muuri</Title>
          <Paragraph>
            Biblioteca JavaScript para criar <Text strong>layouts responsivos, ordenáveis e arrastáveis</Text> com 
            animações suaves e suporte a filtros.
          </Paragraph>
        </div>

        <Alert
          message="✅ Biblioteca Implementada e Funcionando"
          description="Arraste os itens para reorganizar. Use os filtros abaixo para filtrar por categoria com animações suaves!"
          type="success"
          showIcon
        />

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ fontSize: 16 }}>⚙️ Filtros</Text>
            </div>
            
            <Space wrap size="large">
              <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
                <Radio.Button value="*">Todos</Radio.Button>
                <Radio.Button value=".red">Vermelhos</Radio.Button>
                <Radio.Button value=".blue">Azuis</Radio.Button>
                <Radio.Button value=".green">Verdes</Radio.Button>
              </Radio.Group>

              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={addItem}
              >
                Adicionar Item
              </Button>

              <Button 
                type="link" 
                icon={<GithubOutlined />}
                href="https://muuri.dev/"
                target="_blank"
              >
                Documentação
              </Button>
            </Space>
          </Space>
        </Card>

        <div 
          ref={gridRef}
          className="grid"
          style={{
            position: 'relative',
            minHeight: 400,
            background: '#fafafa',
            borderRadius: 8,
            padding: 10
          }}
        >
          {[
            { id: 1, color: '#ff6b6b', category: 'red' },
            { id: 2, color: '#4ecdc4', category: 'blue' },
            { id: 3, color: '#45b7d1', category: 'blue' },
            { id: 4, color: '#96ceb4', category: 'green' },
            { id: 5, color: '#ffeaa7', category: 'red' },
            { id: 6, color: '#a29bfe', category: 'green' }
          ].map(item => (
            <div key={item.id} className={`item ${item.category}`} style={{ width: '200px', height: '150px', margin: '5px' }}>
              <div className="item-content" style={{
                background: item.color,
                padding: 20,
                borderRadius: 8,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                cursor: 'move'
              }}>
                Item {item.id}
              </div>
            </div>
          ))}
        </div>

        <Card title="💡 Recursos do Muuri">
          <ul style={{ marginBottom: 0 }}>
            <li>Layouts tipo Masonry com drag & drop fluido</li>
            <li>Animações suaves e customizáveis</li>
            <li>Sistema de filtros e ordenação com animações</li>
            <li>Layouts responsivos automáticos</li>
            <li>Performance otimizada mesmo com muitos itens</li>
            <li>Suporte a nested grids</li>
            <li>API extensível e bem documentada</li>
          </ul>
        </Card>
      </Space>
    </div>
  )
}
