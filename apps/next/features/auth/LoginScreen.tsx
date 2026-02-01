"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginScreen() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  const handleLogin = () => {
    window.location.href = `${backendUrl}/auth/login`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            ログイン
          </CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            ログインボタンを押すと、認証のために Keycloak に移動します。
          </p>
        </CardContent>
        <CardFooter className="mt-2">
          <Button type="button" className="w-full" onClick={handleLogin}>
            ログイン
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
