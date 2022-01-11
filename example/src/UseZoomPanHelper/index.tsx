import { useCallback } from 'react';

import ReactFlow, {
  Node,
  addEdge,
  Background,
  MiniMap,
  useZoomPanHelper,
  ReactFlowProvider,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 }, className: 'light' },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 }, className: 'light' },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, className: 'light' },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 }, className: 'light' },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

let id = 5;

const getId = () => `${id++}`;

const UseZoomPanHelperFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));
  const { project, setCenter, zoomIn, zoomOut } = useZoomPanHelper();

  const onPaneClick = useCallback(
    (evt) => {
      const projectedPosition = project({ x: evt.clientX, y: evt.clientY - 40 });

      setNodes((nds) =>
        nds.concat({
          id: getId(),
          position: projectedPosition,
          data: {
            label: `${projectedPosition.x}-${projectedPosition.y}`,
          },
        })
      );
    },
    [project]
  );

  const onNodeClick = useCallback(
    (_, element) => {
      const { x, y } = element.position;
      setCenter(x, y, { zoom: 1 });
    },
    [setCenter]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 100 }}>
        <button onClick={() => zoomIn({ duration: 1200 })}>zoomIn</button>
        <button onClick={() => zoomOut({ duration: 0 })}>zoomOut</button>
      </div>
      <Background />
      <MiniMap />
    </ReactFlow>
  );
};

const WrappedFlow = () => (
  <ReactFlowProvider>
    <UseZoomPanHelperFlow />
  </ReactFlowProvider>
);

export default WrappedFlow;