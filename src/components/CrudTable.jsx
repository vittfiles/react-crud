import CrudRow from './CrudRow';

const CrudTable = ({data,deleteData,setDataToUpdate}) => {
    return ( 
    <div className='col-12 col-lg-8 ps-lg-5'>
    <table className='table'>
        <thead>
            <tr>
                <th scope='col'>id</th>
                <th scope='col'>título</th>
                <th scope='col'>precio</th>
                <th scope='col'>img</th>
                <th scope='col' colSpan={2}>acción</th>
            </tr>
        </thead>
        <tbody className='table-group-divider'>
        {data.map((el)=><CrudRow key={el.id} el={el} deleteData={deleteData} setDataToUpdate={setDataToUpdate} />)}
        </tbody>
    </table>
    </div> );
}
 
export default CrudTable;