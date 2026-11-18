import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../site/SiteContext';

const ProductDetails = () => {
  const { id, username } = useParams();
  const { slug } = useSite();
  const activeSlug = username || slug || 'saker';
  const [product, setProduct] = useState(null);
  const [bkashNumber, setBkashNumber] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', senderBkash: '', trxId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/digital-products/public/${id}?slug=${activeSlug}`)
      .then(res => res.json())
      .then(res => {
        const item = res?.product || res?.data?.product || res?.data || res;
        setProduct(item);
        setBkashNumber(res.bkashNumber || '');
      })
      .finally(() => setLoading(false));
  }, [id, activeSlug]);

  if (loading) return <div className="p-20 text-center text-white">Loading...</div>;
  if (!product) return <div className="p-20 text-center text-white">Product not found.</div>;

  const targetId = product._id || product.id || id;

  const handleDownload = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/digital-products/free-download/${targetId}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: targetId, ownerSlug: activeSlug, buyerName: formData.name, buyerEmail: formData.email, contactNumber: formData.contact })
        }).then(r => r.json());
        if (res.pdfUrl) {
            window.open(res.pdfUrl, '_blank', 'noopener,noreferrer');
            setSuccess("Download started!");
        } else throw new Error("No PDF available");
    } catch (err) { setError("Failed to process download"); }
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/digital-products/order/${targetId}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: targetId, ownerSlug: activeSlug, buyerName: formData.name, buyerEmail: formData.email, senderBkashNumber: formData.senderBkash, bkashTrxId: formData.trxId })
        });
        setSuccess("Order submitted!");
    } catch(err) { setError("Failed to submit order"); }
  };

  const effPrice = product.discountPrice > 0 && product.discountPrice < product.price ? product.discountPrice : product.price;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 pt-24">
      <Link to={`/${username || ''}`} className="text-cyan-400">← Back to Portfolio</Link>
      <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-10 bg-slate-800 p-8 rounded-xl border border-slate-700">
        <img src={product.coverImage?.url || product.coverImage} className="rounded-xl w-full" alt={product.title} />
        <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-400 mb-6">{product.description}</p>
            <p className="text-2xl font-bold mb-6">{effPrice === 0 ? "FREE" : `৳${effPrice}`}</p>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-400 text-sm mb-4">{success}</p>}
            <form onSubmit={effPrice === 0 ? handleDownload : handlePay} className="space-y-4">
                {effPrice > 0 && <div className="bg-slate-700 p-3 rounded text-sm mb-4">bKash Number: <span className="font-bold">{bkashNumber}</span></div>}
                <input required placeholder="Name" className="w-full p-2 bg-slate-800/90 text-white border border-white/15 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Email" className="w-full p-2 bg-slate-800/90 text-white border border-white/15 rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
                {effPrice === 0 ? <input required placeholder="Contact Number" className="w-full p-2 bg-slate-800/90 text-white border border-white/15 rounded" onChange={e => setFormData({...formData, contact: e.target.value})} /> :
                <><input required placeholder="Sender bKash Number" className="w-full p-2 bg-slate-800/90 text-white border border-white/15 rounded" onChange={e => setFormData({...formData, senderBkash: e.target.value})} />
                  <input required placeholder="TrxID" className="w-full p-2 bg-slate-800/90 text-white border border-white/15 rounded" onChange={e => setFormData({...formData, trxId: e.target.value})} /></>}
                <button type="submit" className="w-full bg-cyan-600 py-3 rounded font-bold">Submit</button>
            </form>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
