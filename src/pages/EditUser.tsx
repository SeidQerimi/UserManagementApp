import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { updateUser } from '../store/usersSlice';
import { User } from '../types/user';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useToast } from '../components/Toast';

type EditUserFormData = {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  companyName?: string;
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
};

export const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const users = useAppSelector((state) => state.users.users);

  const user = users.find((u) => u.id.toString() === id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      website: user?.website || '',
      companyName: user?.company?.name || '',
      street: user?.address?.street || '',
      suite: user?.address?.suite || '',
      city: user?.address?.city || '',
      zipcode: user?.address?.zipcode || '',
    },
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-error-600 text-lg font-medium">User not found</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (data: EditUserFormData) => {
    const updatedUser: User = {
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone,
      website: data.website,
      company: data.companyName ? { ...user.company, name: data.companyName } : user.company,
      address:
        data.street || data.city
          ? {
              ...user.address,
              street: data.street,
              suite: data.suite,
              city: data.city,
              zipcode: data.zipcode,
            }
          : user.address,
    };

    dispatch(updateUser(updatedUser));
    showToast(`${updatedUser.name} has been updated successfully`, 'success');
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate(`/users/${user.id}`)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to User Details
      </Button>

      <Card>
        <h1 className="text-2xl font-bold text-secondary-900 mb-6">Edit User</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-secondary-900">Basic Information</h2>

            <Input
              label="Name *"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
              placeholder="John Doe"
            />

            <Input
              label="Email *"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
              placeholder="john@example.com"
            />

            <Input
              label="Phone"
              {...register('phone')}
              placeholder="+1-234-567-8900"
            />

            <Input
              label="Website"
              {...register('website')}
              placeholder="example.com"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Company</h2>

            <Input
              label="Company Name"
              {...register('companyName')}
              placeholder="Acme Inc."
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Address</h2>

            <Input
              label="Street"
              {...register('street')}
              placeholder="123 Main St"
            />

            <Input
              label="Suite/Apt"
              {...register('suite')}
              placeholder="Apt. 123"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="City"
                {...register('city')}
                placeholder="New York"
              />

              <Input
                label="Zip Code"
                {...register('zipcode')}
                placeholder="10001"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update User'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
