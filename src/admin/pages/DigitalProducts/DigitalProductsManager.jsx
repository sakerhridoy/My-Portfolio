import React, { useState, useEffect } from "react";
import api from "../../api";
import { Trash2, Pencil, Loader2, FileText, CheckCircle2 } from "lucide-react";
import MediaUploadField from "../../components/MediaUploadField";

const DigitalProductsManager = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [savedBkash, setSavedBkash] = useState("");
  const [bkashInput, setBkashInput] = useState("");
  const [isEditingBkash, setIsEditingBkash] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [savingBkash, setSavingBkash] = useState(false);
  const [formData, setFormData] = useState({ 
    title: "", description: "", price: "", discountPrice: "", 
    coverImage: { url: '', publicId: '' },
    pdfUrl: '', pdfFileName: ''
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [res, o] = await Promise.all([api.digitalProducts.list(), api.digitalProducts.listOrders()]);
      setProducts(Array.isArray(res.data) ? res.data : []);
      setOrders(Array.isArray(o) ? o : (o?.data || []));
      setSavedBkash(res.bkashNumber || "");
      setBkashInput(res.bkashNumber || "");
      setIsEditingBkash(!res.bkashNumber);
    } catch (err) { console.error(err); }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) await api.digitalProducts.update(editingProduct.id, formData);
      else await api.digitalProducts.create(formData);
      setModalOpen(false);
      fetchData();
    } catch { alert("Error saving product"); }
  };

  const handleSaveBkash = async () => {
    setSavingBkash(true);
    setSaveStatus(null);
    try {
        const savedNumber = await api.digitalProducts.updateBkash(bkashInput);
        setSavedBkash(savedNumber || bkashInput);
        setIsEditingBkash(false);
        setSaveStatus({ success: true, msg: "Saved!" });
    } catch { setSaveStatus({ success: false, msg: "Failed to save" }); }
    finally { setSavingBkash(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Digital Products</h1>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <label className="block text-sm text-gray-400 mb-2">bKash Receiver Number</label>
        {!isEditingBkash ? (
            <div className="flex items-center gap-4">
                <span className="text-lg font-mono font-semibold text-cyan-400">{savedBkash}</span>
                <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-semibold">Active</span>
                <button onClick={() => setIsEditingBkash(true)} className="text-sm text-blue-400 hover:text-blue-300">Edit</button>
            </div>
        ) : (
            <div className="flex gap-2">
                <input value={bkashInput} onChange={(e) => setBkashInput(e.target.value)} className="w-full p-2 bg-slate-700 rounded text-white" />
                <button onClick={handleSaveBkash} className="bg-cyan-600 px-4 py-2 rounded text-white">{savingBkash ? <Loader2 className="animate-spin" size={16}/> : "Save"}</button>
                {savedBkash && <button onClick={() => { setBkashInput(savedBkash); setIsEditingBkash(false); }} className="px-4 py-2 text-gray-400">Cancel</button>}
            </div>
        )}
        {saveStatus && <p className={`mt-2 text-sm ${saveStatus.success ? "text-green-400" : "text-red-400"}`}>{saveStatus.msg}</p>}
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button onClick={() => setActiveTab("products")} className={activeTab === "products" ? "text-cyan-400 border-b-2" : "text-gray-400"}>Products</button>
        <button onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "text-cyan-400 border-b-2" : "text-gray-400"}>Orders</button>
      </div>

      {activeTab === "products" ? (
        <div className="space-y-4">
          <button onClick={() => { setEditingProduct(null); setFormData({ title: "", description: "", price: "", discountPrice: "", coverImage: { url: '', publicId: '' }, pdfUrl: '', pdfFileName: '' }); setModalOpen(true); }} className="bg-cyan-600 text-white w-full py-3 rounded">+ Add New Product</button>
          <div className="grid md:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-slate-800 p-4 rounded border border-slate-700 text-white">
                {p.coverImage?.url && <img src={p.coverImage.url} className="h-32 w-full object-cover mb-2" />}
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm">Price: {p.price === 0 ? "FREE" : `৳${p.price}`}</p>
                {p.pdfUrl && <p className="text-xs text-green-400 mt-1 flex items-center gap-1"><FileText size={12}/> {p.pdfFileName || 'Attached PDF'}</p>}
                <div className="flex gap-2 mt-4">
                    <button onClick={() => { setEditingProduct(p); setFormData(p); setModalOpen(true); }} className="text-blue-400"><Pencil size={18}/></button>
                    <button onClick={async () => { await api.digitalProducts.remove(p.id); fetchData(); }} className="text-red-400"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 rounded p-4 text-white overflow-x-auto">
            <table className="w-full text-left">
                <thead><tr><th className="p-2">Code</th><th className="p-2">Product</th><th className="p-2">Buyer</th><th className="p-2">Status</th></tr></thead>
                <tbody>{orders.map(o => <tr key={o.id} className="border-t border-slate-700"><td className="p-2">{o.orderCode}</td><td className="p-2">{o.productTitle}</td><td className="p-2">{o.buyerEmail}</td><td className="p-2">{o.status}</td></tr>)}</tbody>
            </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveProduct} className="bg-slate-800 p-8 rounded max-w-lg w-full text-white max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl mb-4">{editingProduct ? "Edit" : "Add"} Product</h2>
            <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 mb-2 bg-slate-700 rounded" />
            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 mb-2 bg-slate-700 rounded" />
            <input required type="number" placeholder="Price (0 for Free)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 mb-2 bg-slate-700 rounded" />
            <input type="number" placeholder="Discount Price" value={formData.discountPrice || ""} onChange={e => setFormData({...formData, discountPrice: e.target.value})} className="w-full p-2 mb-2 bg-slate-700 rounded" />
            <MediaUploadField label="Cover Image" value={formData.coverImage} onChange={next => setFormData({...formData, coverImage: next})} />
            <div className="mt-4">
                <label className="block text-sm text-gray-400">PDF File</label>
                <MediaUploadField kind="file" label="Upload PDF" value={{url: formData.pdfUrl}} onChange={next => setFormData({...formData, pdfUrl: next.url, pdfFileName: next.url.split('/').pop()})} />
                {formData.pdfUrl && <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><CheckCircle2 size={12}/> {formData.pdfFileName || 'PDF Attached'}</p>}
            </div>
            <button type="submit" className="bg-cyan-600 w-full py-2 mt-4 rounded">Save Product</button>
            <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-600 w-full py-2 mt-2 rounded">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default DigitalProductsManager;
