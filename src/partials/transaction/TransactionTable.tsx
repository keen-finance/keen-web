import React, { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem';

function TransactionTable({
  selectedItems
}) {

  const invoices = [
    {
      id: '0',
      invoice: '#123567',
      total: '$129.00',
      status: 'Overdue',
      customer: 'Dominik Lamakani',
      issueddate: '22/07/2021',
      paiddate: '-',
      type: 'Subscription',
    },
    {
      id: '1',
      invoice: '#779912',
      total: '$59.00',
      status: 'Paid',
      customer: 'Mark Cameron',
      issueddate: '19/07/2021',
      paiddate: '20/07/2021',
      type: 'Subscription',
    },
    {
      id: '2',
      invoice: '#889924',
      total: '$89.00',
      status: 'Paid',
      customer: 'Sergio Gonnelli',
      issueddate: '17/07/2021',
      paiddate: '19/07/2021',
      type: 'One-time',
    },
    {
      id: '3',
      invoice: '#897726',
      total: '$129.00',
      status: 'Due',
      customer: 'Manuel Garbaya',
      issueddate: '04/07/2021',
      paiddate: '-',
      type: 'Subscription',
    },
    {
      id: '4',
      invoice: '#123567',
      total: '$129.00',
      status: 'Due',
      customer: 'Cool Robot',
      issueddate: '04/07/2021',
      paiddate: '-',
      type: 'Subscription',
    },
    {
      id: '5',
      invoice: '#896644',
      total: '$129.00',
      status: 'Paid',
      customer: 'Mark Cameron',
      issueddate: '04/07/2021',
      paiddate: '09/07/2021',
      type: 'One-time',
    },
    {
      id: '6',
      invoice: '#136988',
      total: '$69.00',
      status: 'Paid',
      customer: 'Glenn Thomas',
      issueddate: '01/07/2021',
      paiddate: '01/07/2021',
      type: 'One-time',
    },
    {
      id: '7',
      invoice: '#442206',
      total: '$129.00',
      status: 'Overdue',
      customer: 'Dominik Lamakani',
      issueddate: '22/06/2021',
      paiddate: '-',
      type: 'Subscription',
    },
    {
      id: '8',
      invoice: '#764321',
      total: '$89.00',
      status: 'Paid',
      customer: 'Brian Halligan',
      issueddate: '21/06/2021',
      paiddate: '29/06/2021',
      type: 'One-time',
    },
    {
      id: '9',
      invoice: '#908764',
      total: '$129.00',
      status: 'Due',
      customer: 'Carolyn McNeail',
      issueddate: '17/06/2021',
      paiddate: '-',
      type: 'Subscription',
    }
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(invoices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-gray-800 shadow-lg rounded-2xl relative ">
      
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full ">
            {/* Table header */}
            <thead className="text-xs text-cyan-600 font-semibold uppercase border-b border-slate-700">
              <tr>
                
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">操作</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">总价值</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">代币金额</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">代币金额</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">账户</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">时间</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-700">
              {
                list.map(invoice => {
                  return (
                    <TransactionItem
                      key={invoice.id}
                      id={invoice.id}
                      invoice={invoice.invoice}
                      total={invoice.total}
                      status={invoice.status}
                      customer={invoice.customer}
                      issueddate={invoice.issueddate}
                      paiddate={invoice.paiddate}
                      type={invoice.type}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(invoice.id)}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
