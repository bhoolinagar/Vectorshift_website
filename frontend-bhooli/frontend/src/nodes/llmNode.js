// llmNode.js

import { Handle, Position, useReactFlow } from 'reactflow';
import { useCallback } from 'react';
import { ImCancelCircle } from 'react-icons/im';
//import outputIcon from './assets/output_icon.png';

export const LLMNode = ({ id }) => {

  const instance = useReactFlow();
const handleDelete = useCallback(() => {
    instance.deleteElements({ nodes: [{ id }] });
  }, [instance, id])
  return (
    <div className='inputDocorator'
    //style={{width: 200, height: 80, border: '1px solid black'}}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{top: `${100/3}%`, 
          width: '12px',
          height: '12px',
         background: 'rgba(149, 164, 233, 0.958)', // Optional: Change color for better visibility
     border: '2.5px solid rgb(248, 8, 228)',
     margin:'2px -9px'
        }}
      
   >
  </Handle>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
       
        style={{top: `${200/3}%`,
        width: '12px',
        height: '12px',
       background: 'rgba(149, 164, 233, 0.958)',/* Optional: Change color for better visibility*/
      border: '2.5px solid rgb(248, 8, 228)',
      margin:'2px -9px',
         
        }}
      >
     
      </Handle>
      <div>
      <ImCancelCircle
              onClick={handleDelete}  // Call handleDelete on click
              size="20px"
              color="#57184d9d"
              className="top-right"
              style={{ margin:" -10px -20px"}}
            />
        <span>LLM</span>
      </div>
      <div>
        <span>This is a LLM.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{
          width: '12px',
          height: '12px',
         background: 'rgba(149, 164, 233, 0.958)', // Optional: Change color for better visibility
     border: '2.5px solid rgb(248, 8, 228)',
     margin:'2px -7px'
        }}
       > </Handle>
    </div>
  );
}
