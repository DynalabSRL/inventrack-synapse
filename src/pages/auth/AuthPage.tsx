
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  email: z.string().email().endsWith("@dynalab.com.ar"),
  password: z.string().min(8)
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Nombre completo debe tener al menos 2 caracteres"),
  email: z.string().email().endsWith("@dynalab.com.ar", "El email debe ser del dominio @dynalab.com.ar"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
});

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, session } = useAuth();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await signIn(values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await signUp(values.email, values.password, values.fullName);
      navigate("/dashboard");
    } catch (error) {
      console.error("Register error:", error);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 p-10 flex flex-col">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZsL7MNNiBzrXCbsk6CdtsulY8xBUGGsfHKPcpa2Geq4_oZD2q"
          alt="Dynalab Logo"
          className="h-12 mb-12 self-start"
        />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Bienvenido</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Acceso</TabsTrigger>
                  <TabsTrigger value="register">Registro</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="login"
                  className="data-[state=active]:animate-content-show"
                >
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="correo@dynalab.com.ar"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                      >
                        INGRESAR
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent
                  value="register"
                  className="data-[state=active]:animate-content-show"
                >
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Juan Perez"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="correo@dynalab.com.ar"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                      >
                        CREAR CUENTA
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-1/2 relative bg-cover bg-center" style={{
        backgroundImage: `url('https://png.pngtree.com/background/20230630/original/pngtree-electrical-substation-industry-electric-connect-photo-picture-image_4102513.jpg')`
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white">
          <h1 className="text-3xl font-bold mb-4">Sistema de Gestion - Dynalab SRL</h1>
          <p className="text-base mb-2">2025 ® Dynalab SRL. Todos los derechos reservados.</p>
          <p className="text-sm">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
