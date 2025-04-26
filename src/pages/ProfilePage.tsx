
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProfilePage = () => {
  return (
    <AppLayout>
      <div className="crm-container max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Profil uživatele</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Osobní údaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profilový obrázek" />
                  <AvatarFallback>JN</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline">Změnit fotku</Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="text-sm text-gray-500 mb-1 block">Jméno</label>
                    <Input id="firstName" defaultValue="Jan" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="text-sm text-gray-500 mb-1 block">Příjmení</label>
                    <Input id="lastName" defaultValue="Novák" className="w-full" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-gray-500 mb-1 block">Email</label>
                  <Input id="email" type="email" defaultValue="jan.novak@example.com" className="w-full" />
                </div>
                <div>
                  <label htmlFor="position" className="text-sm text-gray-500 mb-1 block">Pozice</label>
                  <Input id="position" defaultValue="Sales Manager" className="w-full" />
                </div>
                <div className="pt-2">
                  <Button>Uložit změny</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Změna hesla</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="text-sm text-gray-500 mb-1 block">Aktuální heslo</label>
                <Input id="currentPassword" type="password" className="w-full" />
              </div>
              <div>
                <label htmlFor="newPassword" className="text-sm text-gray-500 mb-1 block">Nové heslo</label>
                <Input id="newPassword" type="password" className="w-full" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm text-gray-500 mb-1 block">Potvrzení nového hesla</label>
                <Input id="confirmPassword" type="password" className="w-full" />
              </div>
              <div className="pt-2">
                <Button>Změnit heslo</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
