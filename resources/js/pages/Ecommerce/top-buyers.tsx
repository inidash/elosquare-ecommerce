import HeroSection from "@/components/ecommerce/HeroSection";
import EcomLayout from "@/layouts/ecom-layout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function TopBuyers({ users, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [perPage, setPerPage] = useState(filters.perPage || 20);

    const handleFilter = () => {
        router.get('/top-buyers', { search, perPage }, { preserveState: true });
    };

    return (
        <EcomLayout>
            <HeroSection title='Buyers' href='/top-buyers' />
            <div className="p-6 w-full mx-auto">

                <h1 className="text-2xl font-bold mb-6">Top Buying Users</h1>

                {/* Filters */}
                <div className="flex items-center gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded w-64"
                    />

                    {/* <select
                        value={perPage}
                        onChange={(e) => setPerPage(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                    </select> */}

                    <button
                        onClick={handleFilter}
                        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors hover:bg-blue-400 duration-200"
                    >
                        Search
                    </button>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Names</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Products Bought</th>
                                <th className="p-3">Points</th>
                                {/* <th className="p-3">Total Amount Spent</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user, index) => (
                                <tr key={user.id} className="border-t">
                                    <td className="p-3 text-gray-600">{index + 1 + (users.current_page - 1) * users.per_page}</td>
                                    <td className="p-3 font-semibold text-gray-700">{user.name}</td>
                                    <td className="p-3 text-gray-700">{user.address}</td>
                                    <td className="p-3 font-bold text-blue-600">{user.transactions_count}</td>
                                    <td className="p-3 font-bold text-purple-600">{user.points}</td>
                                    {/* <td className="p-3 font-bold text-green-600">
                                        ₦{Number(user.total_amount_spent).toLocaleString()}
                                    </td> */}
                                    {/* <td className="p-3">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    {/* <div>
                        Showing {users.from} to {users.to} of {users.total}
                    </div> */}
                    <div>
                        Showing {users.to} of {users.total}
                    </div>

                    <div className="flex gap-2">
                        {users.links.map((link, idx) => (
                            <button
                                key={idx}
                                disabled={!link.url}
                                onClick={() => router.get(link.url)}
                                className={`px-3 py-1 border rounded text-gray-700 cursor-pointer text-sm hover:bg-gray-200 transition-colors duration-200 
                                    ${link.active ? "bg-blue-600 text-white" : "bg-white"}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </EcomLayout>
    );
}
