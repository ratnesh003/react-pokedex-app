import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  let { pokemon } = useParams();

    useEffect(() => {
    },[])

    return <div>PokemonDetails : {pokemon}</div>;
};

export default PokemonDetails;
