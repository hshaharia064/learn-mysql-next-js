// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Users Management
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Manage your users with full CRUD operations
      </p>
      
      <div className="space-x-4">
        <Link 
          href="/users"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 inline-block"
        >
          View All Users
        </Link>
        <Link 
          href="/users/create"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200 inline-block"
        >
          Add New User
        </Link>
      </div>
    </div>
  );
}