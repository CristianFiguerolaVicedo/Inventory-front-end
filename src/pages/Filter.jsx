import { useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUserHook";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { Check, Clock, Search, X } from "lucide-react";
import ProductInfoCard from "../components/ProductInfoCard";

const Filter = () => {
  useUser();

  const [creationDate, setCreationDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        creationDate,
        keyword,
        sortField,
        sortOrder,
      });

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast.error(
        error.message || "Failed to fetch products. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#505746]">Filter</h2>
        </div>

        <div className="p-4 mb-4 bg-[#e5e1df] rounded-xl shadow-sm border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-[#717866]">
              Select the filters you want.
            </h5>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label
                htmlFor="creationDate"
                className="block text-sm font-medium mb-1 text-[#717866]"
              >
                Creation Date
              </label>
              <input
                type="date"
                className="w-full border border-[#505746] text-[#717866] rounded px-3 py-2"
                value={creationDate}
                id="creationDate"
                onChange={(e) => setCreationDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="sortField"
                className="block text-sm font-medium mb-1 text-[#717866]"
              >
                Sort Field
              </label>
              <select
                value={sortField}
                id="sortField"
                className="w-full border border-[#505746] text-[#717866] rounded px-3 py-2"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="updatedAt">Date</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortOrder"
                className="block text-sm font-medium mb-1 text-[#717866]"
              >
                Sort Order
              </label>
              <select
                value={sortOrder}
                id="sortOrder"
                className="w-full border border-[#505746] text-[#717866] rounded px-3 py-2"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium mb-1 text-[#717866]"
                >
                  Search
                </label>
                <input
                  value={keyword}
                  id="keyword"
                  placeholder="Search..."
                  type="text"
                  className="w-full border rounded border-[#505746] px-3 py-2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="ml-2 mb-1 p-2 bg-[#717866] hover:bg-[#505746] text-white rounded flex items-center justify-center cursor-pointer"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="p-4 bg-[#e5e1df] rounded xl shadow-sm border border-gray-200">
          <h5 className="text-lg font-semibold text-[#717866]">Products</h5>
          {products.length === 0 && !loading ? (
            <p className="text-[#949488]">
              Select the filter and click apply to show the results
            </p>
          ) : (
            ""
          )}
          {loading ? <p className="text-gray-500">Loading products</p> : ""}
          {products.length > 0 ? (
            <table className="w-full border-collapse bg-white rounded-lg shadow table-fixed">
              <thead className="bg-[#505746] text-[#e5e1df] text-sm">
                <tr>
                  <th className="p-2 text-left w-1/6">Name</th>
                  <th className="p-2 text-left w-1/12">Packaging</th>
                  <th className="p-2 text-left w-1/12">Stock</th>
                  <th className="p-2 text-left w-1/12">Prod. Price</th>
                  <th className="p-2 text-left w-1/12">P.V.P</th>
                  <th className="p-2 text-left w-1/6">Notes</th>
                  <th className="p-2 text-left w-1/6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-[#505746] bg-[#e5e1df] text-[#717688]"
                  >
                    <td className="p-2 truncate" title={product.name}>
                      {product.name}
                    </td>
                    <td className="p-2">{product.packaging}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">{product.productionPrice}</td>
                    <td className="p-2">{product.pvp}</td>
                    <td className="p-2 truncate" title={product.notes}>
                      {product.notes || "No notes"}
                    </td>
                    <td className="p-2">
                      {product.status === "IN_STOCK" && (
                        <span className="flex items-center gap-1 text-green-500">
                          In Stock <Check className="text-green-500" />
                        </span>
                      )}
                      {product.status === "SOLD_OUT" && (
                        <span className="flex items-center gap-1 text-red-500">
                          Sold Out <X className="text-red-500" />
                        </span>
                      )}
                      {product.status === "COMING_SOON" && (
                        <span className="flex items-center gap-1 text-orange-500">
                          Coming Soon <Clock className="text-orange-500" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-[#b7b2ac] mt-2">
              No products filtered. Try aplying a filter.
            </p>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
