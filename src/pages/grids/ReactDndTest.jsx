import React, { useState } from 'react'
import { Typography, Card, Alert, Space, Button } from 'antd'
import { GithubOutlined, ReloadOutlined } from '@ant-design/icons'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const { Title, Paragraph, Text } = Typography

const ItemType = 'BOX'

function DraggableBox({ id, text, color, onDrop }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        userSelect: 'none',
      }}
    >
      <Card
        style={{
          background: color,
          color: '#fff',
          textAlign: 'center',
          border: 'none',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
        bodyStyle={{ padding: 0, width: '100%' }}
      >
        <div style={{ padding: 16 }}>
          {text}
        </div>
      </Card>
    </div>
  )
}

function DropZone({ onDrop, droppedItems }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const backgroundColor = isOver && canDrop ? '#e6f7ff' : canDrop ? '#f0f2f5' : '#fafafa'

  return (
    <div
      ref={drop}
      style={{
        minHeight: 200,
        border: `2px dashed ${isOver && canDrop ? '#1890ff' : '#d9d9d9'}`,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: backgroundColor,
        padding: 16,
        transition: 'all 0.3s ease',
      }}
    >
      {droppedItems.length === 0 ? (
        <Text type="secondary" style={{ fontSize: 16 }}>
          {isOver ? 'Solte aqui!' : 'Arraste itens para esta área'}
        </Text>
      ) : (
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <Text strong>Itens coletados:</Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {droppedItems.map((item, index) => (
              <Card
                key={index}
                size="small"
                style={{
                  background: item.color,
                  color: '#fff',
                  border: 'none',
                  minWidth: '80px',
                }}
                bodyStyle={{ padding: '8px 12px' }}
              >
                {item.text}
              </Card>
            ))}
          </div>
        </Space>
      )}
    </div>
  )
}

function ReactDndContent() {
  const initialBoxes = [
    { id: 'box1', text: 'Box A', color: '#1890ff' },
    { id: 'box2', text: 'Box B', color: '#52c41a' },
    { id: 'box3', text: 'Box C', color: '#fa8c16' },
    { id: 'box4', text: 'Box D', color: '#eb2f96' },
  ]

  const [boxes, setBoxes] = useState(initialBoxes)
  const [droppedItems, setDroppedItems] = useState([])

  const handleDrop = (boxId) => {
    const box = boxes.find(b => b.id === boxId)
    if (box && !droppedItems.find(item => item.id === boxId)) {
      setDroppedItems([...droppedItems, box])
    }
  }

  const reset = () => {
    setDroppedItems([])
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>🎯 React DnD</Title>
          <Paragraph>
            Biblioteca <Text strong>estabelecida e robusta</Text> para implementar 
            drag-and-drop em React usando HTML5 drag-and-drop API.
          </Paragraph>
        </div>

        <Alert
          message="✅ Biblioteca Implementada e Funcionando"
          description="Arraste os boxes coloridos para a área de drop abaixo. Baseado na HTML5 drag and drop API com abstração poderosa!"
          type="success"
          showIcon
        />

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ fontSize: 16 }}>⚙️ Controles</Text>
            </div>
            
            <Space wrap size="large">
              <Button 
                icon={<ReloadOutlined />}
                onClick={reset}
              >
                Resetar
              </Button>

              <Button 
                type="link" 
                icon={<GithubOutlined />}
                href="https://react-dnd.github.io/react-dnd/"
                target="_blank"
              >
                Documentação
              </Button>
            </Space>
          </Space>
        </Card>

        <Card title="🎨 Drag Sources">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 16,
            }}
          >
            {boxes.map((box) => (
              <DraggableBox
                key={box.id}
                id={box.id}
                text={box.text}
                color={box.color}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </Card>

        <Card title="📥 Drop Target">
          <DropZone onDrop={handleDrop} droppedItems={droppedItems} />
        </Card>

        <Card title="💡 Recursos do React DnD">
          <ul style={{ marginBottom: 0 }}>
            <li>Abstração poderosa sobre HTML5 drag and drop</li>
            <li>Controle fino sobre o comportamento de drag & drop</li>
            <li>Suporte a backends customizados (HTML5, Touch, Test)</li>
            <li>Composable e declarativo com hooks</li>
            <li>Amplamente testado e usado em produção</li>
            <li>Drag previews customizáveis</li>
            <li>Multi-backend support (HTML5 + Touch simultâneo)</li>
          </ul>
        </Card>
      </Space>
    </div>
  )
}

export default function ReactDndTest() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ReactDndContent />
    </DndProvider>
  )
}
