import axios, { type AxiosResponse } from "axios";
import NotFoundImage from "../assets/404.png";

const getPokemon = async (id: string): Promise<any> => {
  try {
    const { data }: AxiosResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    data.src = getSrc(data);
    return data;
  } catch (error) {
    return { name: "not found" };
  }
};

const getSrc = (data: any): any => {
  return data?.id
    ? data?.sprites.other?.dream_world.front_default ||
        data?.sprites.other?.home.front_default ||
        data?.sprites.other?.official_artwork.front_default ||
        data?.sprites.front_default
    : NotFoundImage;
};

export { getPokemon, getSrc };
