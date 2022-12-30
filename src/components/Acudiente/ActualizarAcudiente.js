import React, { useEffect, useState }  from 'react';
import Header from '../Header.js';
import Sidebar from '../Sidebar.js';
import crud from '../../utils/crud.js';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 
import Select from 'react-select';

const ActualizarAcudiente = () => {
  const navigate = useNavigate(); 

  const {id} = useParams();

  const [lista, setLista] = useState([]);
  const [datos, setDatos] = useState([]);
    
  const handleChange = selectedOption => {
    console.log("Opciones", selectedOption)
    setDatos(selectedOption.map(option => option.value));

  };

  console.log(datos);

    const [acudiente, setAcudiente] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        alumno:'' ,
        parentesco: '',
      })
      
      const cargarAcudiente = async () =>{
        const response = await crud.GET(`/api/acudientes/${id}`);
       console.log(id);
        setAcudiente(response.acudiente);
      }

      async function getNames() {
        const response = await crud.GET('/api/alumnos/');
        let nombreAlumnos = [];
        //console.log(response.alumno[0].nombre);
  
        for (let i = 0; i < response.alumno.length; i++) {
          let temporal = { value: response.alumno[i].nombre, label: response.alumno[i].nombre }
          console.log(temporal)
          nombreAlumnos.push(temporal);
        }
        console.log(nombreAlumnos);
        setLista(nombreAlumnos);
      }

      useEffect(() =>{ 
        cargarAcudiente();
        getNames();
      },[]);


    let { nombre, direccion, telefono, alumno, parentesco } = acudiente;

      const onChange = (e) =>{
        setAcudiente({
          ...acudiente,
          [e.target.name]: e.target.value
        })
      }

      const actualizarAcudiente = async () =>{
        const data = {
            id: id,
            nombre: acudiente.nombre,
            direccion: acudiente.direccion,
            telefono: acudiente.telefono,
            alumno: datos,
            parentesco: acudiente.parentesco
        }

        console.log(data);
        console.log(id);
        const response = await crud.PATCH(`/api/acudientes/${id}`, data);
        console.log(response);
        const mensaje1 = "El acudiente se actualizo correctamente";
        swal({
          title:'Información',
          text: mensaje1,
          icon: 'success',
          buttons:{
            confirm:{
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });
        navigate("/home-acudiente");
       
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      actualizarAcudiente();
    }
    
   
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className='text-4xl text-blue-600 font-bold text-center mb-5 md:mb-0'>
              Actualizar Acudiente
            </h1>
        </div>
        
        <div className='mt-10 flex justify-center' >
        <form 
                    className='my-10 bg-white shadow-orange-500 rounded-lg p-10' 
                    onSubmit={onSubmit}
                >
                    <div className='my-5'>
                      
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder='Digite el nombre'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={nombre}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            placeholder='Digite la dirección'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={direccion}
                            onChange={onChange}
                        />
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Teléfono</label>
                        <input
                            type="number"
                            id="telefono"
                            name="telefono"
                            placeholder='Digite el teléfono'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={telefono}
                            onChange={onChange}
                        />
                        
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Parentesco</label>
                        <input
                            type="text"
                            id="parentesco"
                            name="parentesco"
                            placeholder='Digite el parentesco'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={parentesco}
                            onChange={onChange}
                        />
                        <label className="uppercase text-gray-600 block text-xl font-bold">Id Alumnos</label>
                        <Select
                          isMulti
                          name="alumnos"
                          options={lista}
                          className="basic-multi-select text-slate-600 block w-full mt-3 p-3 border rounded-lg bg-gray-50"
                          classNamePrefix="select"
                          onChange={handleChange}
                        />  
                        <input 
                            type="submit"
                            value="Actualizar  Acudiente"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />
                    </div>
            </form>
        </div >
       

        </main>
      </div>
      </>
    );
}

export default ActualizarAcudiente;