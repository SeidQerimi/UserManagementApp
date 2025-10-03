import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, Building2, MapPin } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppDispatch';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.users);

  const user = users.find((u) => u.id.toString() === id);

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

  return (
    <div className="max-w-3xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </Button>

      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">{user.name}</h1>
            {user.username && (
              <p className="text-secondary-600 text-lg">@{user.username}</p>
            )}
          </div>
          <Button onClick={() => navigate(`/users/${user.id}/edit`)}>Edit User</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm text-secondary-600">Email</p>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {user.email}
                  </a>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-secondary-600">Phone</p>
                    <a href={`tel:${user.phone}`} className="text-secondary-900">
                      {user.phone}
                    </a>
                  </div>
                </div>
              )}

              {user.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-secondary-600">Website</p>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Company</h2>
            <div className="space-y-3">
              {user.company?.name && (
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-secondary-600">Company Name</p>
                    <p className="text-secondary-900 font-medium">{user.company.name}</p>
                  </div>
                </div>
              )}

              {user.company?.catchPhrase && (
                <div>
                  <p className="text-sm text-secondary-600">Catch Phrase</p>
                  <p className="text-secondary-900 italic">{user.company.catchPhrase}</p>
                </div>
              )}

              {user.company?.bs && (
                <div>
                  <p className="text-sm text-secondary-600">Business</p>
                  <p className="text-secondary-900">{user.company.bs}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {user.address && (
          <div className="mt-6 pt-6 border-t border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Address</h2>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-secondary-900">
                  {user.address.street && `${user.address.street}`}
                  {user.address.suite && `, ${user.address.suite}`}
                </p>
                <p className="text-secondary-900">
                  {user.address.city && `${user.address.city}`}
                  {user.address.zipcode && `, ${user.address.zipcode}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
