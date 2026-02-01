import React, { useState } from 'react'
import { Typography, Card, Alert, Space, Button } from 'antd'
import { GithubOutlined, MenuOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const { Title, Paragraph, Text } = Typography

const initialData = {
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-4', 'task-5'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-6', 'task-7'],
    },
  },
  tasks: {
    'task-1': { id: 'task-1', content: '🎨 Design novo layout' },
    'task-2': { id: 'task-2', content: '📝 Escrever documentação' },
    'task-3': { id: 'task-3', content: '🔧 Configurar ambiente' },
    'task-4': { id: 'task-4', content: '💻 Desenvolver feature X' },
    'task-5': { id: 'task-5', content: '🐛 Corrigir bug Y' },
    'task-6': { id: 'task-6', content: '✅ Review de código' },
    'task-7': { id: 'task-7', content: '🚀 Deploy em produção' },
  },
  columnOrder: ['todo', 'in-progress', 'done'],
}

export default function BeautifulDndTest() {
  const [data, setData] = useState(initialData)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startColumn = data.columns[source.droppableId]
    const finishColumn = data.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      }

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      })
    } else {
      const startTaskIds = Array.from(startColumn.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finishColumn.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      }

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      })
    }
  }

  const addTask = () => {
    const taskId = `task-${Object.keys(data.tasks).length + 1}`
    const newTask = {
      id: taskId,
      content: `📋 Nova tarefa ${Object.keys(data.tasks).length + 1}`,
    }

    const todoColumn = data.columns['todo']
    const newTaskIds = [...todoColumn.taskIds, taskId]

    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [taskId]: newTask,
      },
      columns: {
        ...data.columns,
        'todo': {
          ...todoColumn,
          taskIds: newTaskIds,
        },
      },
    })
  }

  const reset = () => {
    setData(initialData)
  }

  const columnColors = {
    'todo': '#ff6b6b',
    'in-progress': '#4ecdc4',
    'done': '#52c41a',
  }

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>🚀 React Beautiful DnD</Title>
          <Paragraph>
            Biblioteca para drag-and-drop <Text strong>bonito e acessível</Text>, 
            ideal para listas, boards Kanban e interfaces de gestão.
          </Paragraph>
        </div>

        <Alert
          message="✅ Biblioteca Implementada e Funcionando"
          description="Arraste as tarefas entre as colunas para reorganizar seu Kanban board. Animações fluidas e acessível via teclado!"
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
                onClick={addTask}
              >
                Adicionar Tarefa
              </Button>

              <Button 
                icon={<ReloadOutlined />}
                onClick={reset}
              >
                Resetar Board
              </Button>

              <Button 
                type="link" 
                icon={<GithubOutlined />}
                href="https://github.com/hello-pangea/dnd"
                target="_blank"
              >
                Documentação
              </Button>
            </Space>
          </Space>
        </Card>

        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ 
            display: 'flex', 
            gap: 16, 
            overflowX: 'auto',
            padding: '16px 0'
          }}>
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId]
              const tasks = column.taskIds.map(taskId => data.tasks[taskId])

              return (
                <div 
                  key={column.id}
                  style={{ 
                    minWidth: 280,
                    flex: 1,
                    background: '#f5f5f5',
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 12
                  }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: columnColors[column.id]
                    }} />
                    <Text strong style={{ fontSize: 16 }}>
                      {column.title}
                    </Text>
                    <Text type="secondary" style={{ marginLeft: 'auto' }}>
                      {tasks.length}
                    </Text>
                  </div>
                  
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          minHeight: 200,
                          background: snapshot.isDraggingOver ? '#e6f7ff' : 'transparent',
                          borderRadius: 8,
                          padding: 8,
                          transition: 'background-color 0.2s ease',
                        }}
                      >
                        <Space direction="vertical" style={{ width: '100%' }} size="small">
                          {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  size="small"
                                  style={{
                                    cursor: 'move',
                                    background: '#fff',
                                    userSelect: 'none',
                                    opacity: snapshot.isDragging ? 0.8 : 1,
                                    transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
                                    boxShadow: snapshot.isDragging 
                                      ? '0 8px 16px rgba(0,0,0,0.2)' 
                                      : '0 1px 3px rgba(0,0,0,0.1)',
                                    transition: 'box-shadow 0.2s ease',
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <Space>
                                    <MenuOutlined style={{ color: '#8c8c8c' }} />
                                    <Text>{task.content}</Text>
                                  </Space>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Space>
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>

        <Card title="💡 Recursos do Beautiful DnD">
          <ul style={{ marginBottom: 0 }}>
            <li>Animações fluidas e naturais out-of-the-box</li>
            <li>Acessibilidade completa (teclado, screen readers, ARIA)</li>
            <li>Ótima para Kanban boards, listas e ordenação</li>
            <li>API simples e intuitiva</li>
            <li>Zero configuração necessária para começar</li>
            <li>Suporte a nested lists</li>
            <li>Performance otimizada para grandes listas</li>
          </ul>
        </Card>
      </Space>
    </div>
  )
}
