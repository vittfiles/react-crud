import { useState , useEffect, useRef } from 'react';
import { useForm } from './useForm';

const defaultForm = {
    title: "",
    price: 0,
    img: "img/remera.webp",
    id: null
}

const validateForm = (err,val,target) =>{
    const error = {...err};
    const valid = {...val};
    
    if(target.name === "title"){
        if(!target.value.trim()){
            error.title = "Compoletar el campo Título";
            valid.title = null;
        }else{
            valid.title = "correcto";
            error.title = null;
        }
    }
    if(target.name === "price"){
        if(target.value <= 0){
            error.price = "Compoletar el campo Precio";
            valid.price = null;
        }else{
            valid.price = "correcto";
            error.price = null;
        }
    }
    return [error,valid];
}

const CrudForm = ({createData,updateData,dataToUpdate,setDataToUpdate}) => {
    /* const [form, setForm] = useState(defaultForm); */
    const {form,setForm,error,valid,handleChange,handleBlur,handleSubmit,handleClear} = useForm(defaultForm,validateForm);
    const inputElement = useRef();
    const imageElement = useRef();
    const [imgLoaded, setImgLoaded] = useState(false);
    
    const validTitle = `${error.title && "is-invalid"} ${valid.title && "is-valid"}`;
    const validPrice = `${error.price && "is-invalid"} ${valid.price && "is-valid"}`;

    useEffect(() => {
        if(dataToUpdate){
            setForm(dataToUpdate);
            imageElement.current.src = dataToUpdate.img;
            setImgLoaded(true);
        }else{
            setForm(defaultForm);
            setImgLoaded(false);
        }
    }, [dataToUpdate]);
   /*  const handleChange = (e) => {
        setForm({...form,
            [e.target.name]: e.target.value,
        });
    }; */
    const handleReset = (e) => {
        /* setForm(defaultForm); */
        handleClear();
        imageElement.current.src = '';
        setImgLoaded(false);
        setDataToUpdate(null);
    };
    const handleSend = (e) => {
        e.preventDefault();
        /* if(form.title === "" || form.price === "") return; */
        if(!handleSubmit(e)) return;
        if(form.id){
            updateData(form);
            handleReset();
        }else{
            createData(form);
            handleReset();
        }
    };
    const handleImage = (e) =>{
        inputElement.current.click();
    }
    const handleFile = (e) =>{
        let files = Array.from(e.target.files);
        let imgUrl = URL.createObjectURL(files[0])
        imageElement.current.src = imgUrl;
            
        setForm({...form,
            img: imgUrl,
        });
        setImgLoaded(true);
    }
    
    return ( 
        <form className='col-12 col-lg-4 pb-4'>
            <h3>{form.id ? "Actualizar" : "Crear nuevo"}</h3>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input type="text" onChange={handleChange} onBlur={handleBlur} className={`form-control ${validTitle}`} name="title" id="title" aria-describedby="titleHelp" value={form.title}/>
                <div id="titleHelp" className="form-text">Ingrese el nombre del producto, debe ser único</div>
                {error.title && <div className='invalid-feedback'>{error.title}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio</label>
                <input type="number" onChange={handleChange} onBlur={handleBlur} className={`form-control ${validPrice}`} name='price' id="price" aria-describedby="priceHelp" value={form.price}/>
                <div id="priceHelp" className="form-text">El precio debe ser en dolares y con los decimales sin el punto. Ej: para $10.00 ingresar 1000</div>
                {error.price && <p className='invalid-feedback'>{error.price}</p>}
            </div>
            <div className="mb-3 d-flex flex-column align-items-start">
                <img className={imgLoaded ? 'img-thumbnail':'img-thumbnail invisible'} style={{width: "50%"}} ref={imageElement} src=""/>
                <button type="button" onClick={handleImage} onBlur={handleBlur} className="btn btn-outline-primary me-3">
                    {imgLoaded ? 'cambiar' : 'agregar'} imagen
                </button>
                <input type="file" ref={inputElement} onChange={handleFile} style={{display: 'none'}} name="img_files" id="img_files" />
            </div>
            <div className="mb-3 d-flex flex-row">
                <button type="submit" onClick={handleSend} className="btn btn-outline-primary me-3">Guardar</button>
                <button type="reset" onClick={handleReset} className="btn btn-outline-danger">Resetear</button>
            </div>
        </form>
     );
}
 
export default CrudForm;