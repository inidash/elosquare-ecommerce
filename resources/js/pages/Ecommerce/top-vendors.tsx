import HeroSection from "@/components/ecommerce/HeroSection";
import EcomLayout from "@/layouts/ecom-layout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function TopVendors({ vendors, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [perPage, setPerPage] = useState(filters.perPage || 20);
    console.log(vendors)
    const handleFilter = () => {
        router.get('/top-vendors', { search, perPage }, { preserveState: true });
    };

    return (
        <EcomLayout>
            <HeroSection title='Vendors' href='/top-vendors' />
            <div className="p-6 max-w-6xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">Top Selling Vendors</h1>

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
                        className="bg-blue-600 cursor-pointer transition-colors hover:bg-blue-400 duration-200 text-white px-4 py-2 rounded"
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
                                <th className="p-3">Products Sold</th>
                                <th className="p-3">Points</th>
                                {/* <th className="p-3">Total Amount Spent</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.data.map((vendor, index) => (
                                <tr key={vendor.id} className="border-t">
                                    <td className="p-3 text-gray-600">{index + 1 + (vendor.current_page - 1) * vendor.per_page}</td>
                                    <td className="p-3 font-semibold text-gray-700">{vendor.business_name}</td>
                                    <td className="p-3 text-gray-700">{vendor.vendor_state}</td>
                                    <td className="p-3 font-bold text-blue-600">{vendor.transactions_count}</td>
                                    <td className="p-3 font-bold text-purple-600">{vendor.points}</td>
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
                        Showing {vendors.from} to {vendors.to} of {vendors.total}
                    </div> */}
                    <div>
                        Showing {vendors.to} of {vendors.total}
                    </div>

                    <div className="flex gap-2">
                        {vendors.links.map((link, idx) => (
                            <button
                                key={idx}
                                disabled={!link.url}
                                onClick={() => router.get(link.url)}
                                className={`px-3 py-1 border rounded text-gray-700 text-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200 
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

