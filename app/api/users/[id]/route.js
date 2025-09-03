// app/api/users/[id]/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/users/[id] - Fetch single user by ID
export async function GET(request, { params }) {
  try {
    // Extract user ID from URL parameters
    const { id } = params;
    
    // SQL query to find user by ID
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    
    // Check if user exists
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update user by ID
export async function PUT(request, { params }) {
  try {
    // Extract user ID from URL parameters
    const { id } = params;
    
    // Parse update data from request body
    const { name, email, age } = await request.json();
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // SQL query to update user
    const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    
    // Execute update query
    const [result] = await pool.execute(query, [name, email, age, id]);
    
    // Check if user was found and updated
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Fetch and return updated user
    const [updatedUser] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    return NextResponse.json(updatedUser[0], { status: 200 });
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
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user by ID
export async function DELETE(request, { params }) {
  try {
    // Extract user ID from URL parameters
    const { id } = params;
    
    // SQL query to delete user
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    
    // Check if user was found and deleted
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return success message
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}