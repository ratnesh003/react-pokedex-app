import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import axios from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const fetchApiData = async ({
//   endpoint,
//   params
// }:{
//   endpoint: string,
//   params: Array<string>
// }) => {
//   try {
//     return await axios.get(`${process.env.API_BASE_URL}/${endpoint}?${params.}`);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// }
