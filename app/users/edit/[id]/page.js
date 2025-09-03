// app/users/edit/[id]/page.js
// import UserForm from '@/components/UserForm';
import UserForm from '@/app/components/UserForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Function to fetch single user data
async function getUser(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;  // User not found
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Edit User Page Component
export default async function EditUserPage({ params }) {
  // Extract user ID from URL parameters
  const { id } = params;
  
  // Fetch user data
  const user = await getUser(id);

  // Show 404 page if user not found
  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Link 
          href="/users" 
          className="text-blue-500 hover:underline"
        >
          ← Back to Users
        </Link>
      </div>

      {/* Page Content - Pass user data and editing flag to form */}
      <UserForm user={user} isEditing={true} />
    </div>
  );
}