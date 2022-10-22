import React from 'react'
import { doc, setDoc } from "firebase/firestore"
import { firestore } from "../config/firebaseConfig"

export default function AddSiswa() {
    //handle submit
    const handleSubmit = (e) => {
        
        //matikan
        e.preventDefault()

        //tangkap value
        let nama_lengkap = e.target.nama_lengkap.value
        let nis = e.target.nis.value
        let alamat = e.target.alamat.value
        console.info({ nama_lengkap, nis, alamat })

        //clear form ketika di submit dia akan hilang
        e.target.nama_lengkap.value = ""
        e.target.nis.value = ""
        e.target.alamat.value = ""
        
        
        //firebase store
        let dataSiswaRef = doc(firestore, "data_siswa", Date.now().toString())
        setDoc(dataSiswaRef, {
            id: Date.now(),
            nama_lengkap :nama_lengkap,
            nis :nis,
            alamat :alamat,
            createdAt : Date.now()
        })
            .then(res => (console.info("data berhasil di store ke firebase")))
            .catch(err=>{console.error(err)})

    }
  return (
      <div>
          <form action="" className='w-[500px] p-6 flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className='flex gap-2 justify-between items-center'>
                  <label htmlFor="nama_lengkap" className='' >Nama lengkap</label>
                  <input type="text" id='nama_lengkap' className='h-10 px-3 border-[1px] border-gray-300 rounded-md w-[250px]'/>
              </div>
              <div className='flex gap-2 justify-between items-center'>
                  <label htmlFor="nis" className='' >Nomor Induk Siswa</label>
                  <input type="text" id='nis' className='h-10 px-3 border-[1px] border-gray-300 rounded-md w-[250px]'/>
              </div>
              <div className='flex gap-2 justify-between items-start'>
                  <label htmlFor="alamat" className='' >Alamat</label>
                  <textarea type="text" id='alamat' className='h-[200px] p-3 border-[1px] border-gray-300 rounded-md w-[250px]'></textarea>
              </div>
              <div className='flex mt-4 gap-2 ml-auto'>
                  <button type='reset' className='h-10 w-[120px] bg-gray-400 text-white rounded-md'>reset</button>
                  <button type='submit' className='h-10 w-[120px] bg-orange-500 text-white rounded-md'>submit</button>
              </div>
          </form>
    </div>
  )
}
