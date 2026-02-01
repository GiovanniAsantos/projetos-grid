import React from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default function ReactGridLayoutTest() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 4, h: 2 },
    { i: 'b', x: 4, y: 0, w: 4, h: 2 },
    { i: 'c', x: 8, y: 0, w: 4, h: 2 },
  ]

  return (
    <div>
      <h2>React Grid Layout Test</h2>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a" style={{ padding: 8, background: '#fff', border: '1px solid #e8e8e8' }}>Box A</div>
        <div key="b" style={{ padding: 8, background: '#fff', border: '1px solid #e8e8e8' }}>Box B</div>
        <div key="c" style={{ padding: 8, background: '#fff', border: '1px solid #e8e8e8' }}>Box C</div>
      </GridLayout>
    </div>
  )
}
