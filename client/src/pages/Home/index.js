import './home.css'
import BasicTable from '../../components/Table';
import { FaSearch } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='container-home'>
            <header>
                <h1>Agenda de Compromissos</h1>
                <button 
                    type='button' 
                    onClick={() => navigate('/')}
                    className='exit-btn'><p>Sair</p><IoExit size={20}/></button>
            </header>
            
            <div className='container-home--search-bar'>
                <input type='text' placeholder='Pesquisar em seus compromissos...'></input>
                <button type='submit'><FaSearch /></button>
            </div>
            <div className='container-home--table'>
                <BasicTable></BasicTable>
            </div>
            <button type='button' className='btn-home--add'>
                <IoMdAddCircleOutline />
                Adicionar compromisso
            </button>
        </div>
    )
};

export default Home;