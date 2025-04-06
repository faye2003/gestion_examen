import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
  designation: string;
  description: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
          designation: '',
          description: '',
      });
     
      const submit: FormEventHandler = (e) => {
          e.preventDefault();
          post(route('home'), {
              onFinish: () => reset('designation', 'description'),
          });
      };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
              <div className="grid gap-6">
                  <div className="grid gap-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                          id="designation"
                          type="text"
                          required
                          autoFocus
                          tabIndex={1}
                          autoComplete="designation"
                          value={data.designation}
                          onChange={(e) => setData('designation', e.target.value)}
                          disabled={processing}
                          placeholder="Designaiton"
                      />
                  </div>
  
                  <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                          id="description"
                          type="text"
                          required
                          tabIndex={2}
                          autoComplete="description"
                          value={data.description}
                          onChange={(e) => setData('description', e.target.value)}
                          disabled={processing}
                          placeholder="Description"
                      />
                  </div>
                  <Button type="submit" className="mt-2 w-full cursor-pointer" tabIndex={5} disabled={processing}>
                      {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                      Create account
                  </Button>
              </div>
          </form>
        </AuthLayout>
    );
}
