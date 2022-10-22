import React, { useState, useEffect} from 'react'
import { firestore } from "../config/firebaseConfig"
import { collection, getDocs } from 'firebase/firestore'

export default function ListSiswa() {

    //state
    const [dataSiswa, setDataSiswa] = useState([])
    
    //get data dari firebase
    //kenapa pakai async karena transaksi nya butuh waktu 
    const getDataSiswa = async () => {
        let arrDataSiswa = []
        let dataSiswaRef = await collection(firestore, "data_siswa")
        let compileData = await getDocs(dataSiswaRef).then(res => {
            res.forEach((e) => {
                arrDataSiswa.push(e.data())
            })
        })
        return arrDataSiswa
    }

    //cls
    useEffect(() => {
        getDataSiswa().then(res => {
            console.info(res)
            setDataSiswa(res)
        })
    }, [])
  return (
      <div className='w-full flex flex-col'>
          <h1 className='text-2xl'>List Siswa</h1>
          <table className='w-full'>
              <thead>
                  <tr>
                      <th>id</th>
                      <th>nama lengkap</th>
                      <th>nis</th>
                      <th>alamat</th>
                      <th>dibuat</th>
                      <th>action</th>
                  </tr>
              </thead>
              <tbody>
                  {dataSiswa.map((e, i) => (
                      <tr key={e.id}>
                          <td>{ i+1 }</td>
                          <td>{ e.nama_lengkap }</td>
                          <td>{ e.nis }</td>
                          <td>{ e.alamat }</td>
                          <td>{e.createdAt}</td>
                          <td>
                              <div className='flex gap-2'>
                                  <button>Edit</button>
                                  <button>Delete</button>
                              </div>
                          </td>
                      </tr>

                  )) }
              </tbody>
          </table>
    </div>
  )
}
