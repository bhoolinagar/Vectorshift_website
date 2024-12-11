import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {AlertBox} from "./nodes/AlertBox"

function App() {
  const {nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
  }));

  const [isDAG, setIsDAG] = useState(null); // State to hold DAG result
  const [showAlert, setShowAlert] = useState(false);
  const [numNodes, setNumNodes] = useState(0);
  const [numEdges, setNumEdges] = useState(0);

 useEffect(()=>{
  // Function to check if the graph is a DAG via the backend
  const checkDAG = async () => {
    try {
      const response = await axios.post('http://localhost:8000/pipelines/parse', {
        nodes: nodes.map((node) => ({ id: node.id })),
        edges: edges.map((edge) => ({ source: edge.source, target: edge.target })),
      });
      console.log("response: "+ JSON.stringify(response.data.is_dag));
      setIsDAG(response.data.is_dag);
    //  setShowAlert(true);// Show the alert box once the result is fetched
      setNumNodes(response.data.num_nodes);
      setNumEdges(response.data.num_edges);

      } 
    catch (error) {
      console.error('Error checking DAG:', error);
      setIsDAG(false); // If there's an error, assume it's not a DAG
      setShowAlert(true); // Show alert even on error
    }
  };
 // Check DAG whenever nodes or edges change
 if (nodes.length > 0 && edges.length > 0) {
  checkDAG();
}
}, [nodes, edges]);

const handleSubmit = () => {
    // Trigger the DAG check when the submit button is clicked
    setShowAlert(true); // Hide alert initially
   };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton onClick={handleSubmit} />
      <div>
      {showAlert && (
        <AlertBox
          title="Result"
          message={`Number of Nodes : ${numNodes} \nNumber of Edges : ${numEdges} \nIs direct acyclic graph : ${isDAG}`}
          onClose={closeAlert}
        />
      )}
    </div>
     
    </div>
  );
}
export default App;
