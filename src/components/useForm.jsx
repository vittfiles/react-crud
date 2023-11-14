import { useState } from 'react';

export const useForm = (defaultForm,validateForm) => {
    const [form, setForm] = useState(defaultForm);
    const [error, setError] = useState({});
    const [valid, setValid] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
        handleBlur(e);
    }
    const handleBlur = (e) => {
        const [err,val] = validateForm(error,valid,e.target);
        setError(err);
        setValid(val);
    }
    const handleClear = () => {
        setForm(defaultForm);
        setError({});
        setValid({});
    }
    const handleSubmit = e => {
        e.preventDefault();
        let errTotal= {}, valTotal = {};
        let send = true;
        Object.keys(form).forEach(key => {
            let target = {
                name: key,
                value: form[key],
            };
            let [err,val] = validateForm(error,valid,target);
            errTotal = {...errTotal,...err};
            valTotal = {...valTotal,...val};
            if(!val[key]) send = false;
        });
        setError(errTotal);
        setValid(valTotal);
        if(send){
            setForm(defaultForm);
            setError({});
            setValid({});
        }
        return send;
    }
    return {form,setForm,error,valid,handleChange,handleBlur,handleSubmit,handleClear};
}