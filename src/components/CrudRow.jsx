import Modal from './Modal';
import { useModal } from './useModal';

const CrudRow = ({el,deleteData,setDataToUpdate}) => {
    const [isOpenImg,openImg,closeImg] = useModal(false);
    return (
        <>
            <tr>
                <td scope="row">{el.id}</td>
                <td>{el.title}</td>
                <td>{el.price}</td>
                <td><img className='img-thumbnail' onClick={openImg} style={{width: "50px"}} src={el.img}/></td>
                <td>
                    <button  type="button" className="btn btn-outline-success" onClick={(e)=>setDataToUpdate(el)}>Editar</button>
                </td>
                <td>
                    <button type="button" className="btn btn-outline-danger" onClick={(e)=>deleteData(el.id)}>Eliminar</button>
                </td>
            </tr>
            <Modal isOpen={isOpenImg} close={closeImg} color={"rgb(0,0,0,0)"}>
                <img className='img-thumbnail' src={el.img}/>
            </Modal>
        </>
);
}
 
export default CrudRow;