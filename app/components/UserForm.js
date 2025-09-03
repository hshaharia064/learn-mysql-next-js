// app/components/UserForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Reusable form component for creating and editing users
export default function UserForm({ user = null, isEditing = false }) {
  // Router for navigation after form submission
  const router = useRouter();
  
  // Form state - initialize with existing user data or empty values
  const [formData, setFormData] = useState({
    name: user?.name || '',      // Use existing name or empty string
    email: user?.email || '',    // Use existing email or empty string
    age: user?.age || ''         // Use existing age or empty string
  });
  
  // Loading state for form submission
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state for displaying errors
  const [error, setError] = useState('');

  // Handle input field changes
  const handleChange = (e) => {
    // Extract name and value from the input element
    const { name, value } = e.target;
    
    // Update form data state
    setFormData(prev => ({
      ...prev,           // Keep existing form data
      [name]: value      // Update the specific field that changed
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    // Set loading state
    setIsLoading(true);

    try {
      // Determine API endpoint and HTTP method based on editing mode
      const url = isEditing ? `/api/users/${user.id}` : '/api/users';
      const method = isEditing ? 'PUT' : 'POST';
      
      // Make API request
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',  // Tell server we're sending JSON
        },
        body: JSON.stringify(formData),        // Convert form data to JSON string
      });

      // Parse response JSON
      const data = await response.json();

      // Check if request was successful
      if (response.ok) {
        // Navigate back to users list on success
        router.push('/users');
        
        // Refresh the page to show updated data
        router.refresh();
      } else {
        // Set error message from server response
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Form submission error:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      // Always remove loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditing ? 'Edit User' : 'Create New User'}
      </h2>
      
      {/* Display error message if exists */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter full name"
          />
        </div>

        {/* Email Input Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>

        {/* Age Input Field */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="150"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter age"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : (isEditing ? 'Update User' : 'Create User')}
        </button>
      </form>
    </div>
  );
}