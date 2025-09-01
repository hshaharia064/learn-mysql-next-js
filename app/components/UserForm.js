'use client'
import { useState } from "react"
import { useRouter } from "next/router"


import React from 'react'

const UserForm = ({user=null, isEditing=false}) => {

    const router = useRouter()

    const [formData, setFormData] = useState({name : user?.name || '', email : user?.email || '', age : user?.age || ''})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = async (event)=>{
        event.preventDefault()
        setError('')
        isLoading(true)


        try{
            const url = isEditing ? `/api/users/${user.id}` : '/api/users';
            const method = isEditing ? 'PUT' : 'POST'


            const response = await fetch(url,{
                method : method,
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(formData)
            })


            const data = await response.json()

            if(!response.ok){
                router.push('/users')
                router.refresh()
            }else{
                
            }





        }catch(err){

        }

    }





  return (
    <div>UserForm</div>
  )
}

export default UserForm