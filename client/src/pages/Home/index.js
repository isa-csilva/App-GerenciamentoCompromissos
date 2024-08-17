import './home.css'
import CardCompromisse from '../../components/Cards';
import { FaSearch } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import formatDate from '../../utils/DateFormatter'


const Home = () => {
    const [values, setValues] = useState();
    const [listCompromisses, setListCompromisses] = useState([]);

    const loadCards = () => {
        Axios.get('http://localhost:3001/getCards').then((response) => {
            setListCompromisses(response.data);
        });
    }

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
        }).then(() => {
            loadCards()
        });
    }

    const handleSearchCompromisse = () => {
        const filter = document.querySelector('.search-bar').value;

        if (filter) {
            Axios.post('http://localhost:3001/search', {
                title: filter,
                description: filter
            }).then((response) => {
                setListCompromisses([...response.data]);
            });
        } if (filter == '' || !filter) {
            loadCards();
        }
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/getCards').then((response) => {
            setListCompromisses(response.data);
        });
    }, []);    

    const navigate = useNavigate();

    return (
        <div className='container-home'>
            <header>
                <h1>Agenda de Compromissos</h1>
                <button 
                    type='button' 
                    onClick={() => navigate('/')}
                    className='exit-btn btn'> Sair <IoExit size={20}/></button>
            </header>
            
            <div className='container-home--search-bar'>
                <input 
                    className='search-bar'
                    type='text' 
                    placeholder='Pesquisar em meus compromissos...'
                    onChange={handleSearchCompromisse}
                ></input> <FaSearch />
            </div>

            <div className='container-home--card'>
                <Container>
                    <Row>
                        {listCompromisses.map((item) => 
                        <Col xs={6} lg={4}>
                        <CardCompromisse 
                            key={item.idcompromisso} 
                            listCompromisses={listCompromisses} 
                            setListCompromisses={setListCompromisses}
                            id={item.idcompromissos}
                            title={item.title}
                            description={item.description}
                            date={formatDate(item.date)}
                        />
                        </Col>
                )}
                    </Row>
                </Container>
            </div>

            <div className='container-home--add-compromise'>
                <h2>Adicione um compromisso à sua agenda!</h2>
                <input
                    type='text'
                    name='title'
                    placeholder='Título do compromisso'
                    className='add-compromise--input'
                    required='true'
                    onChange={handleChangedValues}
                />
                <input
                    type='text'
                    name='description'
                    placeholder='Descrição do compromisso'
                    className='add-compromise--input'
                    required='true'
                    onChange={handleChangedValues}
                />
                <input
                    id='date-input'
                    type='date'
                    name='date'
                    className='add-compromise--input'
                    required='true'
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