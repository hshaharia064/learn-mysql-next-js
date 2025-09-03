// app/users/create/page.js
// import UserForm from '@/components/UserForm';
import UserForm from '@/app/components/UserForm';
import Link from 'next/link';

// Create User Page Component
export default function CreateUserPage() {
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

      {/* Page Content */}
      <UserForm />
    </div>
  );
}