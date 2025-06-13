import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock data สำหรับ users (เหมือนกับใน UsersPage)
const mockUsers = [
  { 
    id: 1, 
    name: 'สมชาย ใจดี', 
    email: 'somchai@example.com', 
    role: 'Admin',
    phone: '081-234-5678',
    department: 'IT Department',
    joinDate: '2020-01-15'
  },
  { 
    id: 2, 
    name: 'สมหญิง รักเรียน', 
    email: 'somying@example.com', 
    role: 'User',
    phone: '082-345-6789',
    department: 'Marketing',
    joinDate: '2021-03-20'
  },
  { 
    id: 3, 
    name: 'วิชัย ขยันทำงาน', 
    email: 'wichai@example.com', 
    role: 'Manager',
    phone: '083-456-7890',
    department: 'Sales',
    joinDate: '2019-07-10'
  },
  { 
    id: 4, 
    name: 'มาลี สวยงาม', 
    email: 'malee@example.com', 
    role: 'User',
    phone: '084-567-8901',
    department: 'HR',
    joinDate: '2022-02-28'
  },
  { 
    id: 5, 
    name: 'ประยุทธ์ เก่งมาก', 
    email: 'prayuth@example.com', 
    role: 'Developer',
    phone: '085-678-9012',
    department: 'IT Department',
    joinDate: '2021-11-05'
  },
];

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  
  // หา user จาก mock data
  const user = mockUsers.find(u => u.id === parseInt(userId || '0'));

  if (!user) {
    return (
      <div>
        <h1>❌ ไม่พบผู้ใช้</h1>
        <p>ไม่พบผู้ใช้ที่มี ID: {userId}</p>
        <Link to="/users" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← กลับไปหน้ารายชื่อผู้ใช้
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/users" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← กลับไปหน้ารายชื่อผู้ใช้
        </Link>
      </div>
      
      <h1>👤 รายละเอียดผู้ใช้</h1>
      
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        maxWidth: '500px'
      }}>
        <h2 style={{ marginTop: '0', color: '#333' }}>{user.name}</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>📧 อีเมล:</strong> {user.email}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>📱 เบอร์โทร:</strong> {user.phone}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>🏢 แผนก:</strong> {user.department}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>📅 วันที่เข้าร่วม:</strong> {user.joinDate}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>👔 ตำแหน่ง:</strong> 
          <span 
            style={{ 
              marginLeft: '10px',
              padding: '4px 12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              borderRadius: '4px', 
              fontSize: '14px' 
            }}
          >
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
