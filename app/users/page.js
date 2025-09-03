// app/users/page.js
import Link from 'next/link';

// Function to fetch users from API
async function getUsers() {
  try {
    // Make request to our API endpoint
    // Note: In production, use full URL like 'https://yourdomain.com/api/users'
    const response = await fetch('http://localhost:3000/api/users', {
      cache: 'no-store',  // Always fetch fresh data, don't use cache
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    // Parse and return JSON data
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];  // Return empty array if error occurs
  }
}

// Function to handle user deletion
async function deleteUser(userId) {
  'use server';  // This is a server action
  
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Main Users List Page Component
export default async function UsersPage() {
  // Fetch users data on server side
  const users = await getUsers();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        
        {/* Link to create new user */}
        <Link 
          href="/users/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add New User
        </Link>
      </div>

      {/* Users Display */}
      {users.length === 0 ? (
        // Show message when no users exist
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No users found.</p>
          <Link 
            href="/users/create"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Create your first user
          </Link>
        </div>
      ) : (
        // Display users in a responsive grid
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            // User Card Component
            <div key={user.id} className="bg-white rounded-lg shadow-md p-6 border">
              {/* User Information */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {user.name}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Age:</span> {user.age || 'Not specified'}
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-medium">Created:</span> {' '}
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {/* Edit Button */}
                <Link
                  href={`/users/edit/${user.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </Link>
                
                {/* Delete Button
                <form action={deleteUser.bind(null, user.id)}>
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition duration-200"
                    onClick={(e) => {
                      // Confirm before deleting
                      if (!confirm('Are you sure you want to delete this user?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </button>
                </form> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}