import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiHome, FiSearch, FiDollarSign, FiUsers } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect Flat
              </h1>
              <p className="text-xl mb-8">
                Connect with brokers, owners, and tenants to find the ideal flat for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/flats"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-lg"
                >
                  Browse Flats
                </Link>
                <Link
                  href="/register"
                  className="bg-transparent hover:bg-blue-700 border border-white px-6 py-3 rounded-md font-medium text-lg"
                >
                  List Your Flat
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/building.jpg"
                alt="Apartment building"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose MyFlat?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide a comprehensive platform for all your flat rental needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiHome className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Extensive Listings
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through a wide range of flats with detailed information and images.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiSearch className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Advanced Filters
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find exactly what you're looking for with our powerful search and filter options.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Affordable Plans
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose from our range of subscription plans tailored for brokers, owners, and tenants.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FiUsers className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Direct Connections
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect directly with flat owners, brokers, or tenants without intermediaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Flat?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who have found their ideal living space through MyFlat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-lg"
            >
              Sign Up Now
            </Link>
            <Link
              href="/pricing"
              className="bg-transparent hover:bg-blue-700 border border-white px-6 py-3 rounded-md font-medium text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
