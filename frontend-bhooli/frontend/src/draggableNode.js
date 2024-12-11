// draggableNode.js
import customIcon from './assets/Input_icon.png';
import outputIcon from './assets/output_icon.png';
import LLIcon from './assets/llm-removebg-preview.png';
import textIcon from './assets/text_input-removebg-preview.png';
import { MdInput } from 'react-icons/md';
export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
      };
  
const getIcons=()=>{
  switch(type){
    case 'customInput':
      return(
        <div>
          <img src={customIcon} alt="custom Icon" className="Images"/>
        </div>
      )
      case 'llm':
        return (
<div>
  <img src={LLIcon} alt='LLM Icon' className='Images'/>
</div>
        )
        case 'customOutput':
          return (
            <div>
              <img src={outputIcon} alt='output icon' className='Images'/>
            </div>
          )
          case 'text':
            return(
              <div>
                <img src={textIcon} alt="Custom Icon"  className="Images"/>
              </div>
            )
            default:
              return <MdInput  size="30px" color="gray"/>
            }
}
return (
      <div
        className={type}
        onDragStart={ (event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab',
    minWidth: '100px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '25px',
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: 'red',
    border: '2px solid transparent',
    borderImage: 'radial-gradient(circle, rgb(7, 221, 236) 0%, rgb(248, 8, 228) 100%)',
    borderImageSlice: '5',
    
          
        }} 
        draggable
      >
        {getIcons()}
          <span style={{ color: 'gray' }}>{label}</span>
      </div>
    );
  };
  