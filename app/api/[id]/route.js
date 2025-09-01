import pool from "@/app/lib/db";
import { NextResponse } from "next/server";



// get user by id 
export async function GET(request, {params}){
    try{
        const {id} = params
        const [rows] = await pool.execute('SELECT * FROM users WHERE id=?', [id]);

        if(rows.length == 0){
            return NextResponse.json(
                {error : 'User not found'},
                {status : 404}
            )
        }

        return NextResponse.json(rows[0], {status : 200})




    }catch(error){
        console.log('Unable to fetch the individual user', error);
        return NextResponse.json(
            {error : 'Failed to fetch the individual user'},
            {status : 500}
        )


        

    }
}



// Update user by id 

export async function PUT(request, {params}) {

    try{

        const {id} = params
        const {name, email, age} = await request.json()

        if(!name || !email){
            return NextResponse.json({
                error : 'Name and Email are required'
            },{
                status : 400
            })
        }

        const query = 'UPDATE users SET name=?, email=?, age=? WHERE id=?'
        const result = await pool.execute(query, [name, email, age, id])

        if(result.affectedRows===0){
            return NextResponse.json(
                {error : 'User not found'},
                {status : 404}
            )
        }


        const [updatedUser] = await pool.execute('SELECT * FROM users WHERE id=?', [id])

        return NextResponse.json(
            updatedUser[0], {status : 200}
        )


    }catch(error){
        console.log('Error occured while updating the user');

        if(error.code === 'ER_DUP_ENTRY'){
            return NextResponse.json({error : 'User already exists'}, {status : 409})
        }



        return NextResponse.json(
            {error : 'Failed to update user'},
            {status : 500}
        )

    }
    
}



export async function DELETE(request, {params}){
    try{

        const {id} = params

        const [result] = await pool.execute('DELETE FROM users WHERE id=?', [id])

        if(result.affectedRows ===0){
            return NextResponse.json(
                {error : 'User not found'},
                {status : 404}
            )
        }

        return NextResponse.json(
            {message : 'User deleted successfully'},
            {status : 200}
        )

    }catch(error){

        console.error('Error while deleting the user');
        return NextResponse.json(
            {error : 'Failed to delete user' },
        {status : 500})
        

    }
}