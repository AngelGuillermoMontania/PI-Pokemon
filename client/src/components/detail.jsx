import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, getPokemonName } from '../redux/actions';
import { useParams, useLocation } from 'react-router-dom';
import Loading from './loading';
import CardDetail from './cardDetail';
import detail from './detail.module.css';
import imgPokemons from '../images/home2.jpg';
import thunder from '../images/thunder.png';

function useQuery() {
    return new URLSearchParams(useLocation().search)
};

const Detail = () => {
      
    const dispatch = useDispatch();
    const state = useSelector(state => state.pokemon);
    const {id} = useParams();
    const query = useQuery();
    const name = query.get("name");

    React.useEffect(() => {
        if(id){
            dispatch(getDetail(id))
        }
    }, [dispatch, id]);

    React.useEffect(() => {
        if(name) {
            dispatch(getPokemonName(name))
        }
    }, [dispatch, name]);
     
    return ( 
        <div className={detail.containDetail}>
            <img src={thunder} className={detail.thunder} alt="" />
            <img src={imgPokemons} className={detail.font} alt="" />
            {
                typeof(state) === 'string' && <div className={detail.error}>
                    <h1>"The searched pokemon does not exist. Search exact with full name"</h1>
                </div>
            }
            {
                !state.name ? <Loading /> : <CardDetail state={state} />
            }
        </div>
    )
};

export default Detail;