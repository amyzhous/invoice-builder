import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Printer } from 'lucide-react';

export default function InvoiceBuilder() {
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [billedTo, setBilledTo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [from, setFrom] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: ''
  });
  const [items, setItems] = useState([
    { account: '', description: '', link: '', emoji: '🔗', time: '', rate: 55, amount: 0 }
  ]);
  const [taxRate, setTaxRate] = useState(0);

  const calculateAmount = (time, rate) => {
    const t = parseFloat(time) || 0;
    const r = parseFloat(rate) || 0;
    return (t * r).toFixed(2);
  };

  const addItem = () => {
    setItems([...items, { account: '', description: '', link: '', emoji: '🔗', time: '', rate: 55, amount: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    if (field === 'time' || field === 'rate') {
      newItems[index].amount = calculateAmount(newItems[index].time, newItems[index].rate);
    }
    
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg print:shadow-none">
        {/* Header */}
        <div className="p-8 border-b print:border-black">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold">Invoice</h1>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
            >
              <Printer size={18} />
              Print Invoice
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-8 grid grid-cols-3 gap-8 border-b print:border-black">
          {/* Invoice Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
          </div>

          {/* Billed To */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Billed to</label>
            <input
              type="text"
              placeholder="Company Name"
              value={billedTo.name}
              onChange={(e) => setBilledTo({...billedTo, name: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="text"
              placeholder="Address"
              value={billedTo.address}
              onChange={(e) => setBilledTo({...billedTo, address: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="text"
              placeholder="City, Province"
              value={billedTo.city}
              onChange={(e) => setBilledTo({...billedTo, city: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={billedTo.postalCode}
              onChange={(e) => setBilledTo({...billedTo, postalCode: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
          </div>

          {/* From */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
            <input
              type="text"
              placeholder="Your Name"
              value={from.name}
              onChange={(e) => setFrom({...from, name: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="text"
              placeholder="Address"
              value={from.address}
              onChange={(e) => setFrom({...from, address: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="text"
              placeholder="City, Province"
              value={from.city}
              onChange={(e) => setFrom({...from, city: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={from.postalCode}
              onChange={(e) => setFrom({...from, postalCode: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={from.phone}
              onChange={(e) => setFrom({...from, phone: e.target.value})}
              className="w-full px-3 py-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
            <input
              type="email"
              placeholder="Email"
              value={from.email}
              onChange={(e) => setFrom({...from, email: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="p-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">ACCOUNT</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">ITEM DESCRIPTION</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">TIME (HR)</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">RATE</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">AMOUNT</th>
                <th className="w-10 print:hidden"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-2 align-top">
                    <input
                      type="text"
                      value={item.account}
                      onChange={(e) => updateItem(index, 'account', e.target.value)}
                      placeholder="Account"
                      className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                    />
                  </td>
                  <td className="py-3 px-2 align-top">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full px-2 py-1 mb-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.emoji}
                        onChange={(e) => updateItem(index, 'emoji', e.target.value)}
                        placeholder="🔗"
                        className="w-10 px-2 py-1 border rounded text-center focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                        maxLength={2}
                      />
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) => updateItem(index, 'link', e.target.value)}
                        placeholder="Link URL (optional)"
                        className="flex-1 px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-2 align-top">
                    <input
                      type="number"
                      step="0.01"
                      value={item.time}
                      onChange={(e) => updateItem(index, 'time', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-2 py-1 border rounded text-right focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                    />
                  </td>
                  <td className="py-3 px-2 align-top">
                    <input
                      type="number"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-2 py-1 border rounded text-right focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                    />
                  </td>
                  <td className="py-3 px-2 align-top text-right font-semibold">
                    ${item.amount}
                  </td>
                  <td className="py-3 px-2 align-top print:hidden">
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 print:hidden"
          >
            <Plus size={18} />
            Add Line Item
          </button>

          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-80">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Tax</span>
                  <input
                    type="number"
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-16 px-2 py-1 border rounded text-right focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
                  />
                  <span>%</span>
                </div>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-800">
                <span className="text-lg font-bold text-pink-600">Amount due</span>
                <span className="text-lg font-bold text-pink-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-200 text-sm text-gray-600">
          <input
            type="text"
            placeholder="Payment instructions (e.g., 'Payments can be made through e-transfer to...')"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 print:border-0 print:p-0"
          />
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          
          body { 
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .print\\:hidden { 
            display: none !important; 
          }
          
          .print\\:border-0 { 
            border: 0 !important; 
          }
          
          .print\\:p-0 { 
            padding: 0 !important; 
          }
          
          .print\\:shadow-none { 
            box-shadow: none !important; 
          }
          
          .print\\:border-black {
            border-color: #000 !important;
          }
          
          input {
            background: transparent;
            border: none !important;
            padding: 0 !important;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: none;
            font-family: inherit;
            font-size: inherit;
            color: #000;
          }
          
          input::placeholder {
            color: transparent;
          }
          
          button {
            display: none !important;
          }
          
          .bg-gray-50 {
            background: white !important;
          }
          
          .max-w-5xl {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}