import {useState, useEffect} from 'react';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Modal from './Modal';
import { useModal } from './useModal';

const defaultDb = [
    {"id": 1, "title": "remera", "price": "300000" , "img": "img/remera-azul-hombre.webp"},
    {"id": 2, "title": "pantalon", "price": "1100000", "img": "img/remera-azul-hombre.webp"},
    {"id": 3, "title": "camisa", "price": "450000", "img": "img/remera.webp"},
    {"id": 4, "title": "zapatillas", "price": "6000000", "img": "img/remera.webp"}
];

export const CrudFake= ()=>{
    const [db, setDb] = useState(defaultDb);
    const [dataToUpdate, setDataToUpdate] = useState(null);
    const [isOpenModal,openModal,closeModal] = useModal(false);
    const [product, setProduct] = useState(null);
    const [storeLoaded, setStoreLoaded] = useState(false);
    
    useEffect(() => {
        let storage = localStorage.getItem('storage');
        if(storage){
            storage = JSON.parse(storage);
            setDb(storage);
        }
        console.log("inicio: "+storage);
        setStoreLoaded(true);
    }, []);
    useEffect(() => {
        if(storeLoaded){
            localStorage.setItem('storage',JSON.stringify(db));
            console.log(localStorage.getItem('storage'))
        }
    }, [db]);

    const createData = (data) => {
        let i= 1;
        db.forEach(el=> {if(el.id >i)i= el.id;});
        data.id = i + 1;
        setDb([...db,data]);
    };
    const updateData = (data) => {
        let resData = db.map(el=> (el.id !== data.id) ? el : data);
        setDb(resData);
    };
    const deleteData = (id) => {
        openModal();
        setProduct(db.find(el => el.id === id));
    };
    const confirmDeleteData = () => {
        closeModal();
        let res = db.filter(el=> el.id !== product.id);
        setDb(res);
        setProduct(null);
    };

    return (<main className="row">
        <h1>Crud de productos</h1>
        {db && <CrudForm createData={createData} updateData={updateData} dataToUpdate={dataToUpdate} setDataToUpdate={setDataToUpdate}/>}
        {db && <CrudTable data={db} deleteData={deleteData} setDataToUpdate={setDataToUpdate}/>}
        <Modal isOpen={isOpenModal} close={closeModal} >
            {product && <p>Deseas eliminar "{product?.title}"</p>}
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal} data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={confirmDeleteData} >Eliminar</button>
            </div>
        </Modal>
    </main>);
}