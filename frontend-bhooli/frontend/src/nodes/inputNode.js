import { useState, useCallback } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { ImInfo, ImCancelCircle } from 'react-icons/im';
import { Handle, Position ,useReactFlow} from 'reactflow';
 // Correct path to your Zustand store


export const InputNode = ({ id, data }) => {
  const instance = useReactFlow();
const handleDelete = useCallback(() => {
    instance.deleteElements({ nodes: [{ id }] },
     
    );
  },[instance,id])

  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(40);

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setWidth(200 + inputValue.length * 6);
    setHeight(30 + Math.min(10, inputValue.length));
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    
      <div className="inputDocorator">
        <div>
          <span className="span">
            <BiLogIn size="25px" color="#57184d9d" className="top-left" />
            <div className="top-middle">Input</div>
            <ImInfo
              style={{ position: 'absolute', right: '53px', top: '5px', padding: '5px' }}
              size="20px"
              color="#57184d9d"
            />
            <ImCancelCircle
              onClick={handleDelete}  // Call handleDelete on click
              size="20px"
              color="#57184d9d"
              className="top-right"
            />
          </span>
        </div>
        <br />
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
          <br />
          <label>
            Type:
            <select className="custom-select" value={inputType} onChange={handleTypeChange}>
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        </div>
        <div>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-value`}
            style={{
              width: '15px',
              height: '15px',
              background: 'rgba(149, 164, 233, 0.958)',
              border: '2.5px solid rgb(248, 8, 228)',
              margin: '2px -7px',
            }}
          >
            <div
              style={{
                margin: '15px 15px',
                maxWidth: 'auto',
                width: '200px',
                height: 'fit-content',
                fontSize: '15px',
                color: '#57184d9d',
                display: 'flex',
                fontWeight: '600',
                position: 'relative',
              }}
            >
              {currName}
            </div>
          </Handle>
        </div>
      </div>
   
  );
};
