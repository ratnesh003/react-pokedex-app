import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios'
import { API_BASE_URL } from "@/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchApiData = async ({endpoint}:{endpoint: string}) => {
  try {
    return await axios.get(`${API_BASE_URL}/${endpoint}`);
  } catch (error: any) {
    console.log(error.message);
  }
}
