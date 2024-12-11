// store.js

import { create } from "zustand";
import './index.css';

import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';
export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });


    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
      
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection,
           label:'X',
          labelBgStyle:{fill:'rgba(149, 164, 233, 0.958)', fillOpacity:0.97},
          labelStyle:{fill:'white', fontSize:'15px', },
          labelBgPadding:[7, 7],
      labelBgBorderRadius:100,
           type: 'smoothstep',
          animated: true,  style: {stroke: "rgba(149, 164, 233, 0.558)", strokeWidth: 2.5 , style: { width: "10px", height: "10px", backgroundColor: "blue", borderRadius: "50%" },
          borderRadius: "50%",}, markerEnd: { type: MarkerType.Arrow, height: '15px', width: '15px', color:'rgba(149, 164, 233, 0.958)'}}, get().edges),
    });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    removeNode: (nodeId) => {
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
        edges: state.edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId,
        ),
      }));
    },
  }));
