
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="crm-container">
        <h1 className="text-2xl font-semibold mb-6">Nastavení</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">Obecné</TabsTrigger>
            <TabsTrigger value="notifications">Notifikace</TabsTrigger>
            <TabsTrigger value="appearance">Vzhled</TabsTrigger>
            <TabsTrigger value="security">Zabezpečení</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Obecná nastavení</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Jazykové nastavení</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Jazyk aplikace</p>
                          <p className="text-sm text-gray-500">Zvolte preferovaný jazyk rozhraní</p>
                        </div>
                        <Select defaultValue="cs">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Vyberte jazyk" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cs">Čeština</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="sk">Slovenčina</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Formát data</p>
                          <p className="text-sm text-gray-500">Preferovaný formát zobrazení data</p>
                        </div>
                        <Select defaultValue="dmy">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Formát data" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dmy">DD.MM.YYYY</SelectItem>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Export dat</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Exportovat všechna data ve formátu CSV</p>
                        <Button variant="outline">Exportovat data</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Nastavení notifikací</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Emailové notifikace</p>
                      <p className="text-sm text-gray-500">Dostávat oznámení na email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Připomínky schůzek</p>
                      <p className="text-sm text-gray-500">Upozornit 30 minut před schůzkou</p>
                    </div>
                    <Switch id="meeting-reminders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Denní souhrn</p>
                      <p className="text-sm text-gray-500">Zasílat denní souhrn aktivit</p>
                    </div>
                    <Switch id="daily-digest" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Nastavení vzhledu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tmavý režim</p>
                      <p className="text-sm text-gray-500">Přepnout na tmavý režim</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Kompaktní zobrazení</p>
                      <p className="text-sm text-gray-500">Zmenšit mezery mezi prvky</p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Velikost písma</p>
                    <Select defaultValue="medium">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Vyberte velikost písma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Malé</SelectItem>
                        <SelectItem value="medium">Střední</SelectItem>
                        <SelectItem value="large">Velké</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Nastavení zabezpečení</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Dvoufaktorové ověření</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">2FA</p>
                        <p className="text-sm text-gray-500">Zvýšená ochrana účtu</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Historie přihlášení</h3>
                    <Button variant="outline">Zobrazit historii přihlášení</Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Zařízení</h3>
                    <p className="text-sm text-gray-500 mb-2">Spravovat připojená zařízení</p>
                    <Button variant="outline">Spravovat zařízení</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
