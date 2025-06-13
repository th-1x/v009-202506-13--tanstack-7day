import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserPosts } from '../services/api';

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
  const userIdNumber = parseInt(userId || '0');

  // 🚀 Day 3: ใช้ useQuery เพื่อดึงข้อมูลผู้ใช้จาก API
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userErrorMessage
  } = useQuery({
    queryKey: ['user', userIdNumber],
    queryFn: () => getUser(userIdNumber),
    enabled: !!userIdNumber && userIdNumber > 0, // เรียก API เมื่อมี userId ที่ถูกต้อง
  });

  // ดึงข้อมูล posts ของผู้ใช้ (เพิ่มเติม)
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError
  } = useQuery({
    queryKey: ['user-posts', userIdNumber],
    queryFn: () => getUserPosts(userIdNumber),
    enabled: !!user, // เรียก API เมื่อได้ข้อมูล user แล้ว
  });

  // Loading state
  if (userLoading) {
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/users" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← กลับไปหน้ารายชื่อผู้ใช้
          </Link>
        </div>
        <h1>👤 รายละเอียดผู้ใช้ - Day 3</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span>🌐 กำลังโหลดข้อมูลผู้ใช้...</span>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (userError) {
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/users" style={{ color: '#007bff', textDecoration: 'none' }}>
            ← กลับไปหน้ารายชื่อผู้ใช้
          </Link>
        </div>
        <h1>❌ ไม่พบผู้ใช้</h1>
        <div style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          borderRadius: '8px',
          border: '1px solid #f5c6cb',
          color: '#721c24'
        }}>
          <p><strong>Error:</strong> {userErrorMessage?.message}</p>
          <p>ไม่พบผู้ใช้ที่มี ID: {userId}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/users" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← กลับไปหน้ารายชื่อผู้ใช้
        </Link>
      </div>

      <h1>👤 รายละเอียดผู้ใช้ - Day 3</h1>

      {/* Day 3 Info */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#d4edda',
        borderRadius: '8px',
        border: '1px solid #c3e6cb'
      }}>
        <h3>⚡️ Day 3: React Query Individual User</h3>
        <p>ข้อมูลนี้ดึงจาก API โดยใช้ useQuery พร้อม dynamic query key</p>
        <p><strong>Query Key:</strong> ['user', {userIdNumber}]</p>
      </div>

      <div style={{
        padding: '20px',
        border: '1px solid #28a745',
        borderRadius: '8px',
        backgroundColor: '#f8fff9',
        maxWidth: '600px'
      }}>
        <h2 style={{ marginTop: '0', color: '#333' }}>{user.name}</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>@{user.username}</p>

        <div style={{ marginBottom: '15px' }}>
          <strong>📧 อีเมล:</strong> {user.email}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>📱 เบอร์โทร:</strong> {user.phone}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>🌐 เว็บไซต์:</strong>
          {user.website && (
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: '10px', color: '#007bff' }}
            >
              {user.website}
            </a>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>📍 ที่อยู่:</strong>
          <div style={{ marginLeft: '20px', marginTop: '5px' }}>
            <div>{user.address.street}, {user.address.suite}</div>
            <div>{user.address.city} {user.address.zipcode}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
            </div>
          </div>
        </div>

        {user.company && (
          <div style={{ marginBottom: '15px' }}>
            <strong>🏢 บริษัท:</strong>
            <div style={{ marginLeft: '20px', marginTop: '5px' }}>
              <div style={{ fontWeight: 'bold' }}>{user.company.name}</div>
              <div style={{ fontStyle: 'italic' }}>"{user.company.catchPhrase}"</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{user.company.bs}</div>
            </div>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div style={{ marginTop: '30px' }}>
        <h2>📝 โพสต์ของผู้ใช้</h2>
        {postsLoading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '15px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid #f3f3f3',
              borderTop: '2px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <span>กำลังโหลดโพสต์...</span>
          </div>
        )}

        {postsError && (
          <div style={{
            padding: '15px',
            backgroundColor: '#f8d7da',
            borderRadius: '8px',
            color: '#721c24'
          }}>
            ❌ ไม่สามารถโหลดโพสต์ได้
          </div>
        )}

        {posts && posts.length > 0 && (
          <div style={{ display: 'grid', gap: '15px' }}>
            {posts.slice(0, 3).map(post => (
              <div
                key={post.id}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
                  {post.title}
                </h4>
                <p style={{ margin: 0, color: '#666', lineHeight: '1.5' }}>
                  {post.body}
                </p>
              </div>
            ))}
            {posts.length > 3 && (
              <p style={{ textAlign: 'center', color: '#666' }}>
                และอีก {posts.length - 3} โพสต์...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;
