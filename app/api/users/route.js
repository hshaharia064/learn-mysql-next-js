// app/api/users/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/users - Fetch all users
export async function GET() {
  try {
    // Execute SQL query to get all users
    const [rows] = await pool.execute('SELECT * FROM users ORDER BY created_at DESC');
    
    // Return successful response with users data
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    // Log error for debugging
    console.error('Database error:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request) {
  try {
    // Parse JSON data from request body
    const { name, email, age } = await request.json();
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // SQL query to insert new user
    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    
    // Execute query with parameters (? prevents SQL injection)
    const [result] = await pool.execute(query, [name, email, age]);
    
    // Get the newly created user
    const [newUser] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );
    
    // Return successful response with new user data
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    
    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}