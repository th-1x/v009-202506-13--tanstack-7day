import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUsers, useCreateUser } from '../hooks/useUsers';
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
  // 🚀 Day 4: State สำหรับฟอร์ม
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // 🚀 Day 7: ใช้ Custom Hook แทน useQuery โดยตรง
  const {
    data: apiUsers,
    isError,
    error,
    isFetching
  } = useGetUsers();

  // 🚀 Day 7: ใช้ Custom Hook แทน useMutation โดยตรง
  const createUserMutation = useCreateUser();

  // เพิ่ม callback สำหรับเคลียร์ฟอร์มหลังสำเร็จ
  React.useEffect(() => {
    if (createUserMutation.isSuccess) {
      setName('');
      setEmail('');
      setUsername('');
    }
  }, [createUserMutation.isSuccess]);

  // Debug logging (simplified)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 UsersPage Status:', {
      users: apiUsers?.length || 0,
      isFetching,
      mutationPending: createUserMutation.isPending,
      hasError: isError
    });
  }

  // ทดลอง Zod Validation เมื่อ component โหลด (Day 2) - แบบสั้นๆ
  useEffect(() => {
    // เรียกใช้เพียงครั้งเดียวเพื่อลดการ log ซ้ำ
    const hasRunValidation = sessionStorage.getItem('zodValidationRun');
    if (hasRunValidation) return;

    console.log('🚀 Day 2-6 Workshop: Zod + React Query + Router Loaders + Actions');
    console.log('📋 Validating sample data...');

    // ทดลอง validation แบบสั้นๆ
    const validResult = safeValidateSimpleUser(mockValidSimpleUser);
    const invalidResult = safeValidateSimpleUser(mockInvalidSimpleUser);

    console.log('✅ Valid user check:', validResult.success ? 'PASS' : 'FAIL');
    console.log('❌ Invalid user check:', !invalidResult.success ? 'PASS (expected)' : 'FAIL');
    console.log('🎉 All validation tests completed!');

    // Mark as run to prevent duplicate logs
    sessionStorage.setItem('zodValidationRun', 'true');
  }, []);

  // 🚀 Day 4: Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !username.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // ข้อมูลจำลองอื่นๆ ให้ครบตาม schema
    createUserMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      address: {
        street: 'N/A',
        suite: 'N/A',
        city: 'Bangkok',
        zipcode: '10110',
        geo: {
          lat: '13.7563',
          lng: '100.5018'
        }
      },
      phone: '02-xxx-xxxx',
      website: 'example.com',
      company: {
        name: 'Example Company',
        catchPhrase: 'Innovation at its best',
        bs: 'synergistic solutions'
      }
    });
  };

  // 🚀 Day 5: ไม่ต้องมี initial loading state แล้ว!
  // Loader จัดการให้แล้ว - component จะ render เมื่อข้อมูลพร้อม

  // แต่ยังคง error state ไว้สำหรับ re-fetch ที่อาจล้มเหลว
  if (isError) {
    return (
      <div>
        <h1>👥 รายชื่อผู้ใช้ (Users Page) - Day 5</h1>
        <div style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          borderRadius: '8px',
          border: '1px solid #f5c6cb',
          color: '#721c24'
        }}>
          <h3>❌ เกิดข้อผิดพลาดในการ re-fetch</h3>
          <p><strong>Error:</strong> {error?.message}</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            หมายเหตุ: Initial loading จัดการโดย Router Loader แล้ว
          </p>
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
      <h1>👥 รายชื่อผู้ใช้ (Users Page) - Day 5</h1>
      <p>รายการผู้ใช้จาก JSONPlaceholder API + React Query + Mutations + Router Loaders</p>

      {/* Day 5 Info */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e8f5e8',
        borderRadius: '8px',
        border: '1px solid #c3e6cb'
      }}>
        <h3>🔗 Day 5: React Router Loaders + React Query</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span>🚀 Render-as-You-Fetch Pattern:</span>
          <span style={{ color: '#28a745' }}>✅ ข้อมูลโหลดก่อน component render!</span>
        </div>
        <p><strong>เปิด DevTools (F12)</strong> เพื่อดู:</p>
        <ul>
          <li>✅ Router Loader logs: "🔗 Router Loader: Loading users..."</li>
          <li>✅ ensureQueryData behavior: cache hit vs fetch</li>
          <li>✅ ไม่มี loading spinner ใน component แล้ว!</li>
          <li>✅ Navigation ที่เร็วขึ้นเพราะ pre-loading</li>
        </ul>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          💡 ลองไปมาระหว่างหน้า Home และ Users - สังเกตว่าไม่มี loading state แล้ว!
        </p>
      </div>

      {/* Day 4 Info */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '8px',
        border: '1px solid #ffeaa7'
      }}>
        <h3>💾 Day 4: Mutations (useMutation)</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span>สถานะ Mutation:</span>
          {createUserMutation.isPending && <span style={{ color: '#007bff' }}>🔄 กำลังสร้างผู้ใช้...</span>}
          {createUserMutation.isSuccess && <span style={{ color: '#28a745' }}>✅ สร้างผู้ใช้สำเร็จ!</span>}
          {createUserMutation.isError && <span style={{ color: '#dc3545' }}>❌ เกิดข้อผิดพลาด</span>}
          {createUserMutation.isIdle && <span style={{ color: '#6c757d' }}>⏸️ พร้อมใช้งาน</span>}
        </div>
        <p><strong>เปิด DevTools (F12)</strong> เพื่อดู:</p>
        <ul>
          <li>✅ POST requests และ response handling</li>
          <li>✅ Cache invalidation และ automatic refetch</li>
          <li>✅ Mutation states: idle, pending, success, error</li>
          <li>✅ Form handling และ optimistic updates</li>
        </ul>
      </div>

      {/* Day 6: Link to New Form */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <h3>📝 Day 6: Advanced Form with Actions</h3>
        <p>ลองใช้ฟอร์มขั้นสูงด้วย React Router Actions และ Zod Validation!</p>
        <Link
          to="/users/new"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          📝 สร้างผู้ใช้ใหม่ (Advanced Form)
        </Link>
      </div>

      {/* Day 4: Create User Form */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>➕ สร้างผู้ใช้ใหม่ (Day 4 - Inline Form)</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ชื่อ:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น John Doe"
              disabled={createUserMutation.isPending}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="เช่น johndoe"
              disabled={createUserMutation.isPending}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>อีเมล:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="เช่น john@example.com"
              disabled={createUserMutation.isPending}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={createUserMutation.isPending || !name.trim() || !email.trim() || !username.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: createUserMutation.isPending ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: createUserMutation.isPending ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {createUserMutation.isPending ? '🔄 กำลังสร้าง...' : '➕ สร้างผู้ใช้'}
          </button>

          {createUserMutation.isError && (
            <div style={{
              padding: '10px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '4px',
              border: '1px solid #f5c6cb'
            }}>
              ❌ เกิดข้อผิดพลาด: {createUserMutation.error?.message}
            </div>
          )}

          {createUserMutation.isSuccess && (
            <div style={{
              padding: '10px',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '4px',
              border: '1px solid #c3e6cb'
            }}>
              ✅ สร้างผู้ใช้สำเร็จ! รายการจะอัปเดตอัตโนมัติ
            </div>
          )}
        </form>
      </div>

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
        <p>ข้อมูลทั้งหมดผ่านการ validate ด้วย Zod schemas แล้ว</p>
        <ul>
          <li>✅ Full User Schema (JSONPlaceholder format)</li>
          <li>✅ Simple User Schema (Mock data)</li>
          <li>✅ Runtime validation และ TypeScript types</li>
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
