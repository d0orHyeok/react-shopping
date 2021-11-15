import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

function HistoryPage() {
  const user = useSelector(state => state.user);

  const [HistoryData, setHistoryData] = useState([]);

  useEffect(() => {
    if (user.userData && user.userData.history) {
      let data = [];
      user.userData.history.forEach((item, index) => {
        let date = new Date(item.dateOfPurchase);
        data.push({
          key: index,
          paymentID: item.paymentId,
          productTitle: item.name,
          price: item.price,
          quantity: item.quantity,
          dateOfPurchase: date.toLocaleString(),
          date: date,
        });
      });

      setHistoryData(data);
    }
  }, [user.userData]);

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentID',
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
    },
    {
      title: 'Product',
      dataIndex: 'productTitle',
      sorter: (a, b) => a.productTitle.localeCompare(b.productTitle),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Date Of Purchase',
      dataIndex: 'dateOfPurchase',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ['descend'],
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'cneter' }}>
        <h1>History</h1>
      </div>
      <br />
      <Table columns={columns} dataSource={HistoryData} onChange={onChange} />
    </div>
  );
}

export default HistoryPage;
