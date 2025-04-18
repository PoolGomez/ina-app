"use server"

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";


export const LogInAction = async (email: string, password: string) => {

    try {
        const userData = await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            throw new Error(getErrorMessage(error.code));
          });
        const token =  await userData.user.getIdToken()
        return token;

    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Error LogInAction"
        );
    }
    
}

export const LogOutAction = async () => {
  try {
    await signOut(auth)
        .catch((error) => {
            throw new Error(error.code);
          });
  } catch (error) {
    throw new Error(
        error instanceof Error ? error.message : "Error LogOutAction"
    );
  }
}


// Función para obtener un mensaje de error legible
const getErrorMessage = (errorCode:string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/user-disabled':
        return 'El usuario ha sido deshabilitado.';
      case 'auth/user-not-found':
        return 'No se encontró ningún usuario con ese correo electrónico.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/invalid-credential':
        return 'Credenciales Invalidas'
      default:
        return 'Error desconocido. Inténtalo de nuevo.';
    }
  };