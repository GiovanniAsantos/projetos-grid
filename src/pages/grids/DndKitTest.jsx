import React, { useState } from 'react'
import { Typography, Card, Alert, Space, Button } from 'antd'
import { GithubOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const { Title, Paragraph, Text } = Typography

function SortableItem({ id, index }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e']

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card
        style={{
          background: colors[index % colors.length],
          color: '#fff',
          cursor: isDragging ? 'grabbing' : 'grab',
          textAlign: 'center',
          border: 'none',
          userSelect: 'none',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
        bodyStyle={{ padding: 0, width: '100%' }}
      >
        <div style={{ padding: 20 }}>
          Item {id}
        </div>
      </Card>
    </div>
  )
}

export default function DndKitTest() {
  const [items, setItems] = useState(['1', '2', '3', '4', '5', '6'])
  const [activeId, setActiveId] = useState(null)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const addItem = () => {
    const newId = String(Math.max(...items.map(Number)) + 1)
    setItems([...items, newId])
  }

  const removeItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1))
    }
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>⚡ dnd-kit</Title>
          <Paragraph>
            Toolkit <Text strong>moderna e performática</Text> para criar funcionalidades 
            de drag-and-drop em React com API flexível e extensível.
          </Paragraph>
        </div>

        <Alert
          message="✅ Biblioteca Implementada e Funcionando"
          description="Arraste os cards para reorganizá-los. Funciona com mouse, touch e teclado (Tab + Espaço/Enter)!"
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
                type="primary" 
                icon={<PlusOutlined />}
                onClick={addItem}
              >
                Adicionar Item
              </Button>

              <Button 
                icon={<MinusOutlined />}
                onClick={removeItem}
                disabled={items.length <= 1}
              >
                Remover Item
              </Button>

              <Button 
                type="link" 
                icon={<GithubOutlined />}
                href="https://dndkit.com/"
                target="_blank"
              >
                Documentação
              </Button>
            </Space>
          </Space>
        </Card>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
                padding: '16px',
                background: '#fafafa',
                borderRadius: '8px',
              }}
            >
              {items.map((id, index) => (
                <SortableItem key={id} id={id} index={index} />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <Card
                style={{
                  background: '#1890ff',
                  color: '#fff',
                  cursor: 'grabbing',
                  textAlign: 'center',
                  border: 'none',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
                bodyStyle={{ padding: 0, width: '100%' }}
              >
                <div style={{ padding: 20 }}>
                  Item {activeId}
                </div>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>

        <Card title="💡 Recursos do dnd-kit">
          <ul style={{ marginBottom: 0 }}>
            <li>API moderna e flexível com hooks</li>
            <li>Performance otimizada com zero re-renders desnecessários</li>
            <li>Suporte completo a acessibilidade (ARIA, teclado, screen readers)</li>
            <li>Funciona com mouse, touch e teclado</li>
            <li>Extensível com sensores e modifiers customizados</li>
            <li>Tree-shakeable e modular</li>
            <li>TypeScript first</li>
          </ul>
        </Card>
      </Space>
    </div>
  )
}
