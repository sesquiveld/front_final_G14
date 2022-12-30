import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import HeaderAcudiente from "./HeaderAcudiente";
import SidebarAcudiente from "./SidebarAcudiente";
import crud from "../../utils/crud";

const VerBoletinA = () => {

    let navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {

            const token = localStorage.getItem("token")
            //console.log(token)
            if (!token) {
                navigate("/login");
            }
        }
        autenticarUsuario()

    }, [navigate]);

    const [boletin, setBoletines] = useState([]);

    const cargarBoletines = async () => {

        const response = await crud.GET('/api/boletines/all');
        //console.log(response)
        //const mensaje_res = response.msg;
        setBoletines(response)
    }


    useEffect(() => {
        cargarBoletines();
    },[])

    
    return (
        <>
            <HeaderAcudiente />
            <div className='md:flex md:min-h-screen'>
                <SidebarAcudiente />
                <main className="min-h-screen">
                    <div>
                        
                        <h1 className='text-4xl mt-10 text-slate-200 font-bold text-center mb-9 md:mb-0'>
                            Listado de Boletines
                        </h1>

                        <div className="mx-10 inline-block">
                            <table className="rounded-xl border table-fixed w-full" >
                                <thead className='bg-slate-400'>
                                    <tr>
                                        {/* <th style={{ width: '20%' }}>Id</th> */}
                                        <th style={{ width: '15%' }}>Materia</th>
                                        <th style={{ width: '15%' }}>ID Alumno</th>
                                        <th style={{ width: '20%' }}>Notas</th>
                                        <th style={{ width: '20%' }}>Observaciones</th>
                                        <th style={{ width: '30%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-slate-300 rounded-t-xl border">
                                    {
                                        boletin.map(
                                            item =>
                                                <tr key={item._id}>
                                                    {/* <td>{item._id}</td> */}
                                                    <td>{item.materia}</td>
                                                    <td>{item.alumno}</td>
                                                    <td>{item.notas.join(", ")} </td>
                                                    <td>{item.observaciones} </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Link className="text-slate-300 mt-5 hover:text-gray-500 block text-center text-lg font-bold uppercase" 
                            to={"/menu-boletinA"}
                            >Regresar
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}
export default VerBoletinA;