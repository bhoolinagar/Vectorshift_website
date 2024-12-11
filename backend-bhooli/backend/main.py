from collections import defaultdict
from typing import Dict, List
from fastapi import FastAPI, Form
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware ;


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Edge(BaseModel):
    source: str
    target: str


class Node(BaseModel):
    id: str


class GraphData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: GraphData):

    try:
        # Parse the input string into a GraphData object
    
        nodes = pipeline.nodes
        edges = pipeline.edges 
        # Calculate the number of nodes, edges, and DAG status
        num_nodes = len(nodes)
        num_edges = len(edges)
        is_acyclic = is_dag(nodes, edges)

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_acyclic
        }
    except Exception as e:
        return {"error": str(e)}


# Helper function for detecting cycles (DAG check)
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = {node.id: [] for node in nodes}

    # Build the graph from the edges
    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = set()  # To track visited nodes
    stack = set()    # To track nodes in the current path (for cycle detection)

    def dfs(node_id):
        if node_id in stack:
            return False  # Cycle detected
        if node_id in visited:
            return True   # Already processed node

        stack.add(node_id)
        for neighbor in graph[node_id]:
            if not dfs(neighbor):
                return False

        stack.remove(node_id)
        visited.add(node_id)
        return True

    # Run DFS on all nodes
    for node in nodes:
        if node.id not in visited:
            if not dfs(node.id):
                return False  # Cycle detected

    return True  # No cycle detected (DAG)
