// textNode.js
import { useState, useCallback, useEffect } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { IoReaderOutline } from 'react-icons/io5';
import { Handle, Position ,useReactFlow} from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [variables, setVariables] = useState([]);
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const instance = useReactFlow();


  const handleDelete = useCallback(() => {
    instance.deleteElements({ nodes: [{ id }] });
  }, [instance, id]); // Add all external dependencies here

  const handleTextChange = (e) => {
//to set current input text
   setCurrText(e.target.value);
  };
  useEffect(() => {
    //remove {{input}} for
    const vars = currText.replace(/\{\{.*?\}\}/g, "");
    
    setVariables(vars);
  }, [currText]);

  // Handle auto resizing of the textarea based on content
  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset the height to shrink if necessary
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to fit the content
  };

  return (
    <div className='text-node'
    //style={{width: 200, height: 80, border: '1px solid black'}}
    >
      <div className='span'>
        <IoReaderOutline size={'20px'} color='#57184d9d' className='top-left'/>

        <span className='top-middle'>Text</span>
        <ImCancelCircle size={'20px'} color='#57184d9d' className='top-right' onClick={handleDelete}/>
      </div>
      <br/>
      <div >
        <label>
          Text:
          <textarea 
            type="text" 
            value={currText} 
            onInput={handleInput}
           
            
            onChange={handleTextChange} 
          />
        </label>
      </div>
      <div>
          <Handle
       type="source"
        position={Position.Right}
        id={`${id}-output`}
  style={{
    width: '15px',
    height: '15px',
   background: 'rgba(149, 164, 233, 0.958)', /*Optional: Change color for better visibility*/
  border: '2.5px solid rgb(248, 8, 228)',
  margin:'2px -9px'
}}
        > <span className='text-message'>{variables}</span>
       </Handle>
       
      </div>
    
    </div>
  );
}
