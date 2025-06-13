import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/api';
import { userSchema, simpleUserSchema, safeValidateUser, safeValidateSimpleUser } from '../schemas/user.schema';

// Mock data สำหรับ users (แบบง่าย)
const mockUsers = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com', role: 'Admin' },
  { id: 2, name: 'สมหญิง รักเรียน', email: 'somying@example.com', role: 'User' },
  { id: 3, name: 'วิชัย ขยันทำงาน', email: 'wichai@example.com', role: 'Manager' },
  { id: 4, name: 'มาลี สวยงาม', email: 'malee@example.com', role: 'User' },
  { id: 5, name: 'ประยุทธ์ เก่งมาก', email: 'prayuth@example.com', role: 'Developer' },
];

// ข้อมูลจำลองที่ถูกต้อง (ตาม JSONPlaceholder format)
const mockValidUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496"
    }
  },
  phone: "1-770-736-8031 x56442",
  website: "https://hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets"
  }
};

// ข้อมูลจำลองที่ผิด (email ไม่ถูกต้อง)
const mockInvalidUser = { ...mockValidUser, email: "not-an-email" };

// ข้อมูลจำลองแบบง่ายที่ถูกต้อง
const mockValidSimpleUser = {
  id: 1,
  name: "สมชาย ใจดี",
  email: "somchai@example.com",
  role: "Admin"
};

// ข้อมูลจำลองแบบง่ายที่ผิด (id เป็น string)
const mockInvalidSimpleUser = { ...mockValidSimpleUser, id: "1" };

const UsersPage: React.FC = () => {
  // 🚀 Day 3: ใช้ useQuery เพื่อดึงข้อมูลจาก API
  const {
    data: apiUsers,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ['users'], // Key สำหรับ query นี้
    queryFn: getUsers,   // ฟังก์ชันสำหรับดึงข้อมูล
  });

  // Debug logging
  console.log('🔍 UsersPage Debug:', {
    isLoading,
    isError,
    error: error?.message,
    dataLength: apiUsers?.length,
    isFetching
  });

  // ทดลอง Zod Validation เมื่อ component โหลด (Day 2)
  useEffect(() => {
    console.log('🚀 === Day 2: DTO และการตรวจสอบข้อมูลด้วย Zod ===');

    // === ทดลอง 1: Full User Schema (JSONPlaceholder format) ===
    console.log('\n📋 ทดลองที่ 1: Full User Schema');

    // ทดลอง parse ข้อมูลที่ถูกต้อง
    try {
      const parsedUser = userSchema.parse(mockValidUser);
      console.log("✅ Full User Validation successful:", parsedUser);
    } catch (error) {
      console.error("❌ Full User Validation failed:", error);
    }

    // ทดลอง parse ข้อมูลที่ผิด
    try {
      userSchema.parse(mockInvalidUser);
    } catch (error) {
      console.error("❌ Full User Validation failed as expected (invalid email):", error);
    }

    // === ทดลอง 2: Simple User Schema ===
    console.log('\n📋 ทดลองที่ 2: Simple User Schema');

    // ทดลอง safeParse กับข้อมูลที่ถูกต้อง
    const validResult = safeValidateSimpleUser(mockValidSimpleUser);
    if (validResult.success) {
      console.log("✅ Simple User Validation successful:", validResult.data);
    } else {
      console.error("❌ Simple User Validation failed:", validResult.error);
    }

    // ทดลอง safeParse กับข้อมูลที่ผิด
    const invalidResult = safeValidateSimpleUser(mockInvalidSimpleUser);
    if (invalidResult.success) {
      console.log("✅ Simple User Validation successful:", invalidResult.data);
    } else {
      console.error("❌ Simple User Validation failed as expected (id should be number):", invalidResult.error.issues);
    }

    // === ทดลอง 3: Validate Mock Users ===
    console.log('\n📋 ทดลองที่ 3: Validate Mock Users');
    mockUsers.forEach((user, index) => {
      const result = safeValidateSimpleUser(user);
      if (result.success) {
        console.log(`✅ User ${index + 1} (${user.name}) validation successful`);
      } else {
        console.error(`❌ User ${index + 1} (${user.name}) validation failed:`, result.error.issues);
      }
    });

    console.log('\n🎉 เปิด DevTools (F12) เพื่อดูผลลัพธ์การ validate!');
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div>
        <h1>👥 รายชื่อผู้ใช้ (Users Page) - Day 3</h1>
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
          <span>🌐 กำลังโหลดข้อมูลจาก API...</span>
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
  if (isError) {
    return (
      <div>
        <h1>👥 รายชื่อผู้ใช้ (Users Page) - Day 3</h1>
        <div style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          borderRadius: '8px',
          border: '1px solid #f5c6cb',
          color: '#721c24'
        }}>
          <h3>❌ เกิดข้อผิดพลาด</h3>
          <p><strong>Error:</strong> {error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>👥 รายชื่อผู้ใช้ (Users Page) - Day 3</h1>
      <p>รายการผู้ใช้จาก JSONPlaceholder API + React Query + Zod Validation</p>

      {/* Day 3 Info */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#d4edda',
        borderRadius: '8px',
        border: '1px solid #c3e6cb'
      }}>
        <h3>⚡️ Day 3: React Query (useQuery)</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span>สถานะ:</span>
          {isFetching && <span style={{ color: '#007bff' }}>🔄 กำลังดึงข้อมูล...</span>}
          {!isFetching && <span style={{ color: '#28a745' }}>✅ ข้อมูลพร้อมใช้งาน</span>}
        </div>
        <p><strong>เปิด DevTools (F12)</strong> เพื่อดู:</p>
        <ul>
          <li>✅ API calls และ response validation</li>
          <li>✅ React Query caching behavior</li>
          <li>✅ Loading และ Error states</li>
          <li>✅ Server State vs Client State</li>
        </ul>
      </div>

      {/* Day 2 Info */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #2196f3'
      }}>
        <h3>🔍 Day 2: DTO และ Zod Validation</h3>
        <p><strong>เปิด DevTools (F12)</strong> และดูที่ Console เพื่อดูผลลัพธ์การ validate ข้อมูล!</p>
        <ul>
          <li>✅ ทดลอง Full User Schema (JSONPlaceholder format)</li>
          <li>✅ ทดลอง Simple User Schema</li>
          <li>✅ ทดลอง .parse() vs .safeParse()</li>
          <li>✅ ดู Error messages ที่ละเอียด</li>
        </ul>
      </div>

      {/* API Users Section */}
      <div style={{ marginTop: '20px' }}>
        <h2>🌐 ข้อมูลจาก API (JSONPlaceholder)</h2>
        <p>จำนวนผู้ใช้: {apiUsers?.length || 0} คน</p>
        <div style={{ display: 'grid', gap: '15px' }}>
          {apiUsers?.map(user => (
            <div
              key={user.id}
              style={{
                padding: '15px',
                border: '1px solid #28a745',
                borderRadius: '8px',
                backgroundColor: '#f8fff9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{user.name}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>@{user.username}</p>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>{user.email}</p>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                    📍 {user.address.city}, {user.address.street}
                  </p>
                  {user.company && (
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                      🏢 {user.company.name}
                    </p>
                  )}
                </div>
                <Link
                  to={`/users/${user.id}`}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Users Section (Day 2) */}
      <div style={{ marginTop: '30px' }}>
        <h2>🧪 ข้อมูลจำลอง (Day 2 - Zod Testing)</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {mockUsers.map(user => (
            <div 
              key={user.id} 
              style={{ 
                padding: '15px', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{user.name}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>{user.email}</p>
                  <span 
                    style={{ 
                      padding: '2px 8px', 
                      backgroundColor: '#007bff', 
                      color: 'white', 
                      borderRadius: '4px', 
                      fontSize: '12px' 
                    }}
                  >
                    {user.role}
                  </span>
                </div>
                <Link 
                  to={`/users/${user.id}`}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
