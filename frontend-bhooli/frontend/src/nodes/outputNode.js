// outputNode.js
import React, { useState , useCallback} from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { LuLogOut } from 'react-icons/lu';
import { Handle, Position,useReactFlow } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(40);

  const instance = useReactFlow();


  const handleDelete = useCallback(() => {
    instance.deleteElements({ nodes: [{ id }] });
  },[instance, id])


  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setWidth(200 + inputValue.length * 6);
    setHeight(30 + Math.min(10, inputValue.length));
    setCurrName(e.target.value);
  };

  return (
    <div className='inputDocorator'
    //style={{width: 200, height: 80, border: '1px solid black'}}
    >
    <div>
    <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{
          width: '15px',
  height: '15px',
  background: 'rgba(149, 164, 233, 0.958)', /* Optional: Change color for better visibility*/
border: '2px solid rgb(248, 8, 228)',
margin:'2px -9px'
        }}>
          <span style={{
      margin:'10px -66px',
      width: '20px',
      height: 'fit-content',
      fontSize: '15px',
      color: '#57184d9d',
      position: 'relative',
      display: 'block',
      fontWeight: 500,
       }}> {currName}</span>
     </Handle>
 
    </div>
      <div>
        <LuLogOut size={'20px'} color='#57184d9d' className='top-left'/>
        <span className='top-middle'>Output</span>
        <ImCancelCircle size={'20px'} color='#57184d9d' className='top-right' onClick={handleDelete}/>
      </div>
      <br/>
      <div>
        <label>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
            style={{
              left: '10px',
              right: '10px',
              width: `${width}px`,
              height: `${height}px`,
              padding: '8px',
              fontSize: '16px',
              transition: 'width 0.2s, height 0.2s ease-in-out',
              overflow: 'hidden',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          />
        </label>
        <br/>
        <label >
          Type:
          <select className='custom-select' value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
}
