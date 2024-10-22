import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  let { pokemon } = useParams();

  useEffect(() => {}, []);

  return (
    <div className='w-full h-[calc(100vh-64px)] block'>
      PokemonDetails : {pokemon}
    </div>
  );
};

export default PokemonDetails;
