import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="IT Asset Inventory Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 dark:text-white">
                <header className="mb-6 w-full max-w-7xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">📦</span>
                            </div>
                            <span className="font-bold text-lg">AssetTracker</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-7xl flex-col items-center text-center">
                        {/* Hero Section */}
                        <div className="mb-16 max-w-4xl">
                            <div className="mb-6">
                                <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm font-medium dark:bg-blue-900 dark:text-blue-300">
                                    <span>🚀</span>
                                    <span>Professional IT Asset Management</span>
                                </div>
                            </div>
                            <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
                                🚀 <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Smart IT Asset</span><br />
                                Management System
                            </h1>
                            <p className="mb-8 text-xl text-gray-600 leading-relaxed dark:text-gray-300">
                                Streamline your IT operations with powerful asset tracking, role-based access control, and comprehensive 
                                inventory management. Perfect for organizations of any size looking to optimize their technology resources.
                            </p>
                            {!auth.user && (
                                <div className="flex justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all hover:scale-105 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl">
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">💻</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">📦 Comprehensive Asset Tracking</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Track laptops, desktops, servers, and peripherals with detailed specifications, serial numbers, and condition monitoring.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">🔑</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">🛡️ Role-Based Security</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Advanced RBAC system with admin and user roles. Admins manage everything, users update their assigned assets only.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">🎯 Smart User Assignment</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Assign assets to users across departments, track handover dates, and manage transfers with complete audit trails.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                                <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📍</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">🏢 Multi-Site Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Monitor assets across multiple office locations, sites, and departments with powerful filtering and search.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                                <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">🔧</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">⚡ Real-Time Status Updates</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Users can update device conditions and status in real-time. Track Good/Damaged states and Used/Standby/Loan status.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">📈 Advanced Analytics</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Generate detailed reports, track asset utilization, monitor conditions, and export data for further analysis.
                                </p>
                            </div>
                        </div>

                        {/* RBAC Feature Highlight */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 shadow-lg max-w-4xl w-full text-white mb-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-4">🛡️ Advanced Role-Based Access Control</h3>
                                <p className="text-blue-100 mb-6 text-lg">
                                    Secure, granular permissions ensure the right people have the right access
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                                        <h4 className="font-bold text-lg mb-2">🔑 Admin Users</h4>
                                        <ul className="text-blue-100 text-sm space-y-1">
                                            <li>• Full CRUD access to all assets</li>
                                            <li>• Create and manage user accounts</li>
                                            <li>• Assign roles and permissions</li>
                                            <li>• View system-wide analytics</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                                        <h4 className="font-bold text-lg mb-2">👤 Regular Users</h4>
                                        <ul className="text-blue-100 text-sm space-y-1">
                                            <li>• View all assets in system</li>
                                            <li>• Update condition & status of assigned assets</li>
                                            <li>• Read-only access to other fields</li>
                                            <li>• Filtered dashboard view</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Preview */}
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-4xl w-full dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="text-2xl font-bold mb-6 text-center">📊 Comprehensive Dashboard Analytics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                                    <div className="text-gray-600 dark:text-gray-300">💻 Total Assets</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600 mb-2">892</div>
                                    <div className="text-gray-600 dark:text-gray-300">🔄 In Active Use</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-600 mb-2">245</div>
                                    <div className="text-gray-600 dark:text-gray-300">⏸️ On Standby</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
                                    <div className="text-gray-600 dark:text-gray-300">🏢 Office Sites</div>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Real-time insights into your IT infrastructure with advanced filtering and reporting capabilities
                                </p>
                            </div>
                        </div>

                        <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
                            <p>🚀 Built with ❤️ using Laravel & React • Professional IT Asset Management Solution</p>
                            <p className="text-sm mt-2">Featuring advanced RBAC, real-time updates, and comprehensive tracking</p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}