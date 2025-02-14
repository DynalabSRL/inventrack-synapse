
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </Button>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border-4 border-dashed border-gray-200 p-4 min-h-96">
              <h2 className="text-xl font-semibold mb-4">Bienvenido al Dashboard</h2>
              <p className="text-gray-600">
                Este es tu panel de control. Aquí podrás gestionar todas las funcionalidades del sistema.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
