
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-crm-background">
      <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-crm-border max-w-md w-full">
        <h1 className="text-4xl font-bold text-crm-primary mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-6">Stránka nebyla nalezena</p>
        <p className="text-gray-500 mb-6">
          Požadovaná stránka neexistuje nebo byla přesunuta.
        </p>
        <Button asChild>
          <Link to="/dashboard">Zpět na dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
