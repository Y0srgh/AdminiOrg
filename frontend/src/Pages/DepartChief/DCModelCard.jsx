import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import DCModalSingleCard from './DCModelSingleCard';
const DCModalCard = ({ model, route }) => {
  console.log("model : ",model);
  console.log("route : ",route);
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {model.map((item) => (
        <DCModalSingleCard key={item._id} model={item} route={route}/>
      ))}
    </div>
  );  
}

export default DCModalCard
