import React, { useEffect, useState } from 'react';

const ViewAllMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch all members from the API
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    setLoading(true);
    setError(null);
    
    fetch('http://localhost:8080/api/members')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch members');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched members:', data);
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching members:', err);
        setError('Failed to load members. Please try again.');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    fetch(`http://localhost:8080/api/members/${id}`, { 
      method: 'DELETE' 
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete member');
        }
        return res.json();
      })
      .then(response => {
        console.log('Delete response:', response);
        // Remove the deleted member from state
        setMembers(prev => prev.filter(member => member.id !== id));
        alert('Member deleted successfully!');
      })
      .catch(err => {
        console.error('Error deleting member:', err);
        alert('Failed to delete member. Please try again.');
      });
  };

  const handleUpdate = (member) => {
    setEditingMember({
      id: member.id,
      fullName: member.fullName || '',
      email: member.email || '',
      role: member.role || 'USER'
    });
    setShowEditModal(true);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/members/${editingMember.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: editingMember.fullName,
        email: editingMember.email,
        role: editingMember.role
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update member');
        }
        return res.json();
      })
      .then(response => {
        console.log('Update response:', response);
        // Refresh the members list
        fetchMembers();
        setShowEditModal(false);
        setEditingMember(null);
        alert(response.message || 'Member updated successfully!');
      })
      .catch(err => {
        console.error('Error updating member:', err);
        alert('Failed to update member. Please try again.');
      });
  };

  const getRoleDisplay = (role) => {
    if (!role) return 'User';
    switch (role.toUpperCase()) {
      case 'ADMIN':
        return 'Admin';
      case 'STAFF':
        return 'Staff Member';
      case 'USER':
        return 'User';
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={fetchMembers}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">View All Members</h1>
        <button
          onClick={fetchMembers}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">User Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No members found
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr key={member.id} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{member.fullName || 'N/A'}</td>
                  <td className="border px-4 py-2">{member.email || 'N/A'}</td>
                  <td className="border px-4 py-2">{getRoleDisplay(member.role)}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleUpdate(member)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Update Member</h2>
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingMember.fullName}
                  onChange={(e) => setEditingMember({...editingMember, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="USER">User</option>
                  <option value="STAFF">Staff Member</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingMember(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllMembers;