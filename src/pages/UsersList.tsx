import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchUsers, sortUsers, deleteUser } from '../store/usersSlice';
import { User, SortField, SortOrder } from '../types/user';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { useToast } from '../components/Toast';
import { Modal } from '../components/Modal';
import { motion } from 'framer-motion';

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({
    field: 'name',
    order: 'asc',
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleSort = (field: SortField) => {
    const newOrder = sortConfig.field === field && sortConfig.order === 'asc' ? 'desc' : 'asc';
    setSortConfig({ field, order: newOrder });
    dispatch(sortUsers({ field, order: newOrder }));
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id));
      showToast(`${userToDelete.name} has been deleted`, 'success');
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-error-600 text-lg font-medium">Error loading users</p>
          <p className="text-secondary-600 mt-2">{error}</p>
          <Button className="mt-4" onClick={() => dispatch(fetchUsers())}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search users"
            />
          </div>

          <Button onClick={() => navigate('/add')} className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add User
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleSort('name')}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort by Name {sortConfig.field === 'name' && `(${sortConfig.order})`}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleSort('company')}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort by Company {sortConfig.field === 'company' && `(${sortConfig.order})`}
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-secondary-600 text-lg">
            {searchQuery ? 'No users found matching your search' : 'No users available'}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredUsers.map((user) => (
            <Card key={user.id} hover>
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{user.name}</h3>
                <p className="text-secondary-600 text-sm mb-1">{user.email}</p>
                <p className="text-secondary-500 text-sm mb-4">
                  {user.company?.name || 'No company'}
                </p>

                <div className="flex gap-2 mt-auto pt-4">
                  <Button size="sm" onClick={() => navigate(`/users/${user.id}`)}>
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/users/${user.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Delete"
        size="sm"
      >
        <div>
          <p className="text-secondary-700 mb-6">
            Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action
            cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
