// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Users Management App',
  description: 'A simple CRUD app for managing users',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Header */}
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">
              <a href="/">Users Management System</a>
            </h1>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2025 Users Management App</p>
        </footer>
      </body>
    </html>
  );
}