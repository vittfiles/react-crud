import { useEffect,useState } from "react";

const Modal = ({isOpen,close,children,color="" }) => {
    const [show, setShow] = useState("");
    const [style, setStyle] = useState({});
    const [styleM, setStyleM] = useState(color? {background: color,border: "none"}: {});
    useEffect(() => {
        if(isOpen){
            setStyle({background: "rgb(0,0,0,0.5",display: "block"});
            setTimeout(() => {
                setShow("show");
            }, 400);
        }else{
            setTimeout(() => {
                setStyle({});
            }, 400);
            setShow("");
        }
    },[isOpen]);
    return ( <div className={`modal fade ${show}`} style={style}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content "  style={styleM}>
                <div className="modal-header" style={styleM}>
                    <button type="button" style={{backgroundColor: "#FFF"}} onClick={close} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    </div> );
}
 
export default Modal;