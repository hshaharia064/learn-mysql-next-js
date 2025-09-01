import pool from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET(){

try{

        const [rows] = await pool.execute('SELECT * FROM users ORDER BY created_at DESC');

        return NextResponse.json(rows, {status : 200});

}catch(err){
    console.log('Error from Database : ', err)

    return NextResponse.json(
        {error : 'Failed to fetch users'},
        {status : 500}
    );

}



}



export async function POST(request){
    try{

        const {name, email, age} = await request.json()

        if(!name || !email){
            return NextResponse.json(
                {error : 'Name and Email are required'},
                {status : 400}
            )
        }


    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [name, email, age])

    const [newUser] = await pool.execute(
        'SELECT * FROM users WHERE id=?',
        [result.insertId]
    );

    return NextResponse.json(newUser[0], {status : 201})


    }catch(error){

        console.log('Failed to create new user ', error)
        if(error.code === 'ER_DUB_ENTRY'){
            return NextResponse.json(
                {error : 'Email already exists'},
                {status : 409}
            )
        }

        return NextResponse.json(
            {error: 'Failed to create user'},
            {status : 500}
        )

    }
}