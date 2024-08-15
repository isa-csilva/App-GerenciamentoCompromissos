import './home.css'
import CardCompromisse from '../../components/Cards';
import { FaSearch } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const Home = () => {
    const [values, setValues] = useState();
    const [listCompromisses, setListCompromisses] = useState([]);

    const handleChangedValues = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    }

    const handleSubmitCompromisse = () => {
        Axios.post('http://localhost:3001/add', {
            title: values.title,
            description: values.description,
            date: values.date
        });
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/getCards').then((response) => {
            setListCompromisses(response.data);
        });
    }, [listCompromisses]);    

    const navigate = useNavigate();

    return (
        <div className='container-home'>
            <header>
                <h1>Agenda de Compromissos</h1>
                <button 
                    type='button' 
                    onClick={() => navigate('/')}
                    className='exit-btn btn'><p>Sair</p><IoExit size={20}/></button>
            </header>
            
            <div className='container-home--search-bar'>
                <input type='text' placeholder='Pesquisar em seus compromissos...'></input>
                <button className='btn' type='submit'><FaSearch /></button>
            </div>

            <div className='container-home--card'>
                {listCompromisses.map((item) => 
                    <CardCompromisse 
                        key={item.idcompromissos} 
                        listCompromisses={listCompromisses} 
                        setListCompromisses={setListCompromisses}
                        id={item.idcompromissos}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                    />
                )}
            </div>

            <div className='container-home--add-compromise'>
                <h2>Adicione um compromisso à sua agenda!</h2>
                <input
                    type='text'
                    name='title'
                    placeholder='Título do compromisso'
                    className='add-compromise--input'
                    onChange={handleChangedValues}
                />
                <input
                    type='text'
                    name='description'
                    placeholder='Descrição do compromisso'
                    className='add-compromise--input'
                    onChange={handleChangedValues}
                />
                <input
                    id='date-input'
                    type='date'
                    name='date'
                    className='add-compromise--input'
                    onChange={handleChangedValues}
                />
                
                <button type='button' className='btn-home--add btn' onClick={() => handleSubmitCompromisse()}>
                    <IoMdAddCircleOutline />
                    Adicionar compromisso
                </button> 
            </div>
            
        </div>
    )
};

export default Home;