import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addUser } from '../store/usersSlice';
import { User } from '../types/user';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useToast } from '../components/Toast';

type AddUserFormData = {
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

export const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>();

  const onSubmit = (data: AddUserFormData) => {
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      website: data.website,
      company: data.companyName ? { name: data.companyName } : undefined,
      address:
        data.street || data.city
          ? {
              street: data.street,
              suite: data.suite,
              city: data.city,
              zipcode: data.zipcode,
            }
          : undefined,
      source: 'local',
    };

    dispatch(addUser(newUser));
    showToast(`${newUser.name} has been added successfully`, 'success');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </Button>

      <Card>
        <h1 className="text-2xl font-bold text-secondary-900 mb-6">Add New User</h1>

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
              {isSubmitting ? 'Adding...' : 'Add User'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
