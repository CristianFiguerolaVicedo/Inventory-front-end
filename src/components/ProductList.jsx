import {
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  LoaderCircle,
  Trash,
  X,
} from "lucide-react";
import { useState } from "react";

const ProductList = ({ products, onDelete, onDownload, categories }) => {
  const [loading, setLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleDownload = async () => {
    setLoading(true);

    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <div className="bg-[#e5e1df] rounded-xl shadow-sm border border-gray-200 shadow-xl p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-[#717866] font-semibold">Products</h5>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="flex items-center gap-1 bg-[#949488]/60 rounded-md text-white p-2 hover:bg-[#717866]"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download size={15} />
              Download
            </>
          )}
        </button>
      </div>

      {categories.map((cat) => {
        const catProducts = products.filter((p) => p.categoryId === cat.id);
        const isExpanded = expandedCategories[cat.id] ?? false;

        return (
          <div key={cat.id} className="mt-6">
            <div
              onClick={() => toggleCategory(cat.id)}
              className="flex flex-row items-center justify-between cursor-pointer select-none p-2"
            >
              
                <h3 className="text-[#505746] text-xl font-semibold mb-0">
                    {cat.name}
                </h3>
                {isExpanded ? (
                  <ChevronDown size={18} className="text-[#505746] text-xl font-semibold mb-0"/>
                ) : (
                  <ChevronRight size={18} className="text-[#505746] text-xl font-semibold mb-0"/>
                )}
              
            </div>

            {isExpanded && (
              <>
                {catProducts.length > 0 ? (
                  <table className="w-full border-collapse bg-white rounded-lg shadow table-fixed">
                    <thead className="bg-[#b7b2ac] text-[#505746] text-sm">
                      <tr>
                        <th className="p-2 text-left w-1/6">Name</th>
                        <th className="p-2 text-left w-1/12">Packaging</th>
                        <th className="p-2 text-left w-1/12">Stock</th>
                        <th className="p-2 text-left w-1/12">Prod. Price</th>
                        <th className="p-2 text-left w-1/12">P.V.P</th>
                        <th className="p-2 text-left w-1/6">Notes</th>
                        <th className="p-2 text-left w-1/6">Status</th>
                        <th className="p-2 text-left w-1/12">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {catProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="border-t border-[#505746] bg-[#949488] text-[#e5e1df]"
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
                              <span className="flex items-center gap-1 text-[#e5e1df]">
                                In Stock <Check className="text-green-500" />
                              </span>
                            )}
                            {product.status === "SOLD_OUT" && (
                              <span className="flex items-center gap-1 text-[#e5e1df]">
                                Sold Out <X className="text-red-500" />
                              </span>
                            )}
                            {product.status === "COMING_SOON" && (
                              <span className="flex items-center gap-1 text-[#e5e1df]">
                                Coming Soon{" "}
                                <Clock className="text-orange-500" />
                              </span>
                            )}
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => onDelete(product.id)}
                              className="text-[#e5e1df] hover:text-red-500 opacity-100 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">
                    No products in this category.
                  </p>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
